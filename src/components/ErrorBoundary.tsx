import { Component, ErrorInfo, ReactNode } from 'react';
import { logError, getErrorLogs, ErrorLogEntry } from '../services/errorLogger';
import { AlertTriangle, RefreshCw, Terminal, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showLogs: boolean;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showLogs: false,
      copied: false,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    logError(
      'ui',
      `Erro de renderização na interface: ${error.message}`,
      error,
      { componentStack: errorInfo.componentStack },
      'critical'
    );
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleCopyLogs = () => {
    const logs = getErrorLogs();
    navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  public render() {
    if (this.state.hasError) {
      const logs = getErrorLogs();

      return (
        <div className="min-h-screen bg-[#0B132B] text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-lg w-full bg-[#1C2541] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold text-amber-300">
                  Aconteceu um imprevisto na exibição
                </h1>
                <p className="text-xs text-slate-400 font-sans">
                  O aplicativo capturou a exceção com segurança para evitar perda de dados.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B132B]/80 border border-slate-700/60 font-mono text-xs text-amber-200/90 overflow-x-auto max-h-36">
              <p className="font-bold text-red-400 mb-1">{this.state.error?.name}: {this.state.error?.message}</p>
              {this.state.errorInfo?.componentStack && (
                <p className="text-[10px] text-slate-400 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack.slice(0, 300)}...
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleReload}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar Aplicativo
              </button>

              <button
                onClick={() => this.setState((prev) => ({ showLogs: !prev.showLogs }))}
                className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-sans font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                {this.state.showLogs ? 'Ocultar Logs' : 'Ver Diagnóstico'}
              </button>
            </div>

            {this.state.showLogs && (
              <div className="pt-4 border-t border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400">
                    Histórico de Diagnóstico ({logs.length})
                  </span>
                  <button
                    onClick={this.handleCopyLogs}
                    className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    {this.state.copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {this.state.copied ? 'Copiado!' : 'Copiar Diagnóstico'}
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {logs.slice(-5).reverse().map((log: ErrorLogEntry) => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-[#0B132B] border border-slate-800 text-[11px] font-mono space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 uppercase font-bold">
                          {log.category}
                        </span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-slate-200">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


