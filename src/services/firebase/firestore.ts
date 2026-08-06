import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc,
  serverTimestamp,
  getDocFromServer,
  DocumentData,
  SetOptions
} from 'firebase/firestore';
import { db, auth } from './config';
import { logError } from '../errorLogger';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): void {
  const errMessage = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };

  logError(
    'firebase',
    `Operação do Firestore [${operationType}] em ${path || 'desconhecido'}: ${errMessage}`,
    error,
    errInfo,
    'warning'
  );

  console.warn('Firestore Operation Info: ', JSON.stringify(errInfo));
}

export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    logError('firebase', 'Teste de conexão com Firestore executado com sucesso.', undefined, undefined, 'info');
  } catch (error) {
    const isOffline = error instanceof Error && error.message.includes('the client is offline');
    logError(
      'firebase',
      isOffline
        ? 'Verificação de conexão Firebase: cliente offline ou configuração pendente.'
        : `Erro ao testar conexão com Firebase Firestore: ${error instanceof Error ? error.message : String(error)}`,
      error,
      { isOffline },
      isOffline ? 'warning' : 'error'
    );
    if (isOffline) {
      console.error("Firebase connection check: client offline or configuration pending.");
    }
  }
}

export { 
  db,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp
};
