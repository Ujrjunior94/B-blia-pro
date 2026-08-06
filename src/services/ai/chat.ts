export interface ChatMessage {
  id?: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  biblicalReferences?: string[];
  interpretationsNotice?: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  context?: string;
}

export async function sendAiChatMessage(req: ChatRequest): Promise<ChatMessage> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro na comunicação com o assistente teológico.');
  }

  const data = await response.json();
  return {
    id: `msg_${Date.now()}`,
    sender: 'ai',
    text: data.reply || data.text,
    timestamp: new Date().toISOString(),
    biblicalReferences: data.biblicalReferences,
  };
}
