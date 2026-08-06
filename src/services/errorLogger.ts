import { auth } from './firebase/config';

export type ErrorCategory = 'firebase' | 'sync' | 'network' | 'ui' | 'unhandled' | 'auth';
export type ErrorLevel = 'info' | 'warning' | 'error' | 'critical';

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  category: ErrorCategory;
  level: ErrorLevel;
  message: string;
  stack?: string;
  context?: Record<string, any>;
  url?: string;
  userId?: string | null;
  online: boolean;
}

const STORAGE_KEY = 'jornada_error_logs_v1';
const MAX_LOGS = 100;

type Listener = (logs: ErrorLogEntry[]) => void;
const listeners: Set<Listener> = new Set();

/**
 * Loads logs from localStorage
 */
export function getErrorLogs(): ErrorLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse error logs from localStorage', err);
    return [];
  }
}

/**
 * Saves logs to localStorage and notifies subscribers
 */
function saveLogs(logs: ErrorLogEntry[]): void {
  try {
    const trimmed = logs.slice(-MAX_LOGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    listeners.forEach((fn) => fn(trimmed));
  } catch (err) {
    console.error('Failed to persist error logs', err);
  }
}

/**
 * Subscribes to error log updates
 */
export function subscribeErrorLogs(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Main structured logger method
 */
export function logError(
  category: ErrorCategory,
  message: string,
  errorObj?: unknown,
  context?: Record<string, any>,
  level: ErrorLevel = 'error'
): ErrorLogEntry {
  let stack: string | undefined = undefined;
  if (errorObj instanceof Error) {
    stack = errorObj.stack;
    if (!message || message === 'Error') {
      message = errorObj.message;
    }
  } else if (typeof errorObj === 'string') {
    stack = errorObj;
  } else if (errorObj && typeof errorObj === 'object') {
    try {
      stack = JSON.stringify(errorObj);
    } catch {
      stack = String(errorObj);
    }
  }

  const newEntry: ErrorLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    category,
    level,
    message: message || 'Unknown error occurred',
    stack,
    context,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userId: auth?.currentUser?.uid || context?.userId || null,
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  };

  // Log to browser console as well with structured format
  const consolePrefix = `[Bíblia-Pro ${category.toUpperCase()}]`;
  if (level === 'critical' || level === 'error') {
    console.error(consolePrefix, message, { entry: newEntry });
  } else if (level === 'warning') {
    console.warn(consolePrefix, message, { entry: newEntry });
  } else {
    console.info(consolePrefix, message, { entry: newEntry });
  }

  const currentLogs = getErrorLogs();
  const updated = [...currentLogs, newEntry];
  saveLogs(updated);

  return newEntry;
}

/**
 * Clears all stored error logs
 */
export function clearErrorLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    listeners.forEach((fn) => fn([]));
  } catch (err) {
    console.error('Failed to clear error logs', err);
  }
}

/**
 * Exports error logs as formatted JSON string
 */
export function exportErrorLogsAsJson(): string {
  const logs = getErrorLogs();
  return JSON.stringify(
    {
      app: 'Bíblia-Pro / Jornada da Bíblia',
      exportedAt: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      totalLogs: logs.length,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      logs,
    },
    null,
    2
  );
}

/**
 * Initializes global uncaught error and unhandled promise rejection handlers
 */
let isInitialized = false;

export function initGlobalErrorHandlers(): void {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (
      msg.includes('ResizeObserver') ||
      msg.includes('Script error.') ||
      msg.includes('Loading chunk')
    ) {
      return;
    }

    logError(
      'unhandled',
      event.message || 'Uncaught Exception',
      event.error,
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      'critical'
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    
    // Ignore benign dev errors, cancelled requests, audio play interrupts, and speech synthesis errors
    if (
      message.includes('websocket') || 
      message.includes('HMR') || 
      message.includes('canceled') || 
      message.includes('cancelled') ||
      message.includes('interrupted') ||
      message.includes('user gesture') ||
      message.includes('ResizeObserver')
    ) {
      return;
    }

    logError(
      'unhandled',
      `Unhandled Promise Rejection: ${message}`,
      reason,
      {
        reasonType: typeof reason,
      },
      'error'
    );
  });

  // Track network online/offline transitions
  window.addEventListener('online', () => {
    logError('network', 'Conexão de rede reestabelecida (Online)', undefined, undefined, 'info');
  });

  window.addEventListener('offline', () => {
    logError('network', 'Dispositivo desconectado da rede (Offline)', undefined, undefined, 'warning');
  });
}
