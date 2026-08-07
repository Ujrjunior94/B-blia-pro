import React, { useState, useEffect } from 'react';
import {
  getErrorLogs,
  clearErrorLogs,
  exportErrorLogsAsJson,
  ErrorLogEntry,
  subscribeErrorLogs,
  ErrorCategory
} from '../services/errorLogger';
import { testFirestoreConnection } from '../services/firebase/firestore';
import {
  Activity,
  Trash2,
  Copy,
  Check,
  Download,
  Wifi,
  WifiOff,
  X,
  AlertTriangle,
  Info,
  ShieldAlert,
  RotateCw,
  Search
} from 'lucide-react';

interface ErrorLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErrorLogsModal: React.FC<ErrorLogsModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<ErrorLogEntry[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ErrorLogEntry | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLogs(getErrorLogs());
    const unsubscribe = subscribeErrorLogs((updatedLogs) => setLogs(updatedLogs));
    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestFirebase = async () => {
    setTestingConnection(true);
    await testFirestoreConnection();
    setLogs(getErrorLogs());
    setTestingConnection(false);
  };

  const handleCopyLogs = () => {
    const jsonStr = exportErrorLogsAsJson();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLogs = () => {
    const jsonStr = exportErrorLogsAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biblia-pro-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (showConfirmClear) {
      clearErrorLogs();
      setSelectedLog(null);
      setShowConfirmClear(false);
    } else {
      setShowConfirmClear(true);
    }
  };

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'firebase', label: 'Firebase' },
    { id: 'sync', label: 'Sincronização' },
    { id: 'network', label: 'Rede' },
    { id: 'ui', label: 'Interface' },
    { id: 'unhandled', label: 'Exceções' },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchCat = filterCategory === 'all' || log.category === filterCategory;
    const matchSearch =
      !searchTerm ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.stack && log.stack.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const getLevelBadge = (level: ErrorLogEntry['level']) => {
    switch (level) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase">Crítico</span>;
      case 'error':
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase">Erro</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold uppercase">Aviso</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase">Info</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1C2541] border border-slate-700/80 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#0B132B] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
                Central de Diagnóstico & Logs do Firebase
              </h2>
              <p className="text-xs text-slate-400">
                Monitoramento de integridade e sincronização em tempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Controls */}
        <div className="p-4 bg-[#1C2541] border-b border-slate-700/60 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Connection Status & Trigger */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                navigator.onLine 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {navigator.onLine ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                {navigator.onLine ? 'Conectado à Internet' : 'Sem Conexão (Offline)'}
              </span>

              <button
                onClick={handleTestFirebase}
                disabled={testingConnection}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                {testingConnection ? 'Testando...' : 'Testar Firestore'}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLogs}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                title="Copiar relatório para a área de transferência"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar Logs'}
              </button>

              <button
                onClick={handleDownloadLogs}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors cursor-pointer"
                title="Baixar arquivo JSON"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearLogs}
                onMouseLeave={() => setShowConfirmClear(false)}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  showConfirmClear
                    ? 'bg-red-600 text-white border-red-650 px-3'
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                }`}
                title={showConfirmClear ? "Clique novamente para confirmar" : "Limpar todos os logs"}
              >
                <Trash2 className="w-4 h-4" />
                {showConfirmClear && <span className="font-sans font-bold">Confirmar?</span>}
              </button>
            </div>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar em logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl bg-[#0B132B] border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-sans font-semibold text-sm">Nenhum evento registrado</p>
              <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                Todos os sistemas de sincronização e Firestore estão funcionando normalmente.
              </p>
            </div>
          ) : (
            filteredLogs.slice().reverse().map((log) => {
              const isSelected = selectedLog?.id === log.id;

              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(isSelected ? null : log)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B132B] border-amber-500/60 ring-1 ring-amber-500/40'
                      : 'bg-[#0B132B]/60 border-slate-800 hover:border-slate-700 hover:bg-[#0B132B]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getLevelBadge(log.level)}
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase font-bold">
                        {log.category}
                      </span>
                      {log.userId && (
                        <span className="text-[10px] text-slate-400">
                          UID: {log.userId.slice(0, 6)}...
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-slate-200 font-sans font-medium text-xs leading-relaxed">
                    {log.message}
                  </p>

                  {/* Expanded Detail View */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-300 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-slate-900/50 p-2 rounded-xl">
                        <div><strong className="text-slate-300">Horário:</strong> {new Date(log.timestamp).toLocaleString()}</div>
                        <div><strong className="text-slate-300">Online:</strong> {log.online ? 'Sim' : 'Não'}</div>
                        <div><strong className="text-slate-300">ID Evento:</strong> {log.id}</div>
                        <div><strong className="text-slate-300">URL:</strong> {log.url || 'N/A'}</div>
                      </div>

                      {log.context && (
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 overflow-x-auto">
                          <p className="text-[10px] font-bold text-amber-400 mb-1">Contexto adicional:</p>
                          <pre className="text-[10px] text-emerald-300">{JSON.stringify(log.context, null, 2)}</pre>
                        </div>
                      )}

                      {log.stack && (
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 overflow-x-auto">
                          <p className="text-[10px] font-bold text-red-400 mb-1">Stack Trace:</p>
                          <pre className="text-[10px] text-slate-400 whitespace-pre-wrap">{log.stack}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0B132B] border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Total de logs acumulados: {logs.length}</span>
          <span className="font-sans">Jornada da Bíblia Pro Diagnósticos</span>
        </div>
      </div>
    </div>
  );
};
