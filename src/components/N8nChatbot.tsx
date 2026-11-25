import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { CHATBOT_CONFIG } from '../data/portfolio';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
  timestamp: string;
  retryText?: string;
}

interface N8nChatbotProps {
  onOpenContact: () => void;
}

function getSafeWebhookUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
    if (
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
    ) {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

function extractN8nReply(payload: unknown): string | null {
  if (typeof payload === 'string') {
    const trimmed = payload.trim();
    return trimmed || null;
  }

  if (Array.isArray(payload) && payload.length > 0) {
    return extractN8nReply(payload[0]);
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const candidateKeys = [
      'output',
      'reply',
      'response',
      'message',
      'text',
      'answer',
      'content',
    ];

    for (const key of candidateKeys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }

    if (record.data) {
      return extractN8nReply(record.data);
    }
  }

  return null;
}

function getSessionId(): string {
  const storageKey = 'yf_n8n_chat_session';
  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const generated =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    window.sessionStorage.setItem(storageKey, generated);
    return generated;
  } catch {
    return `session_${Date.now()}`;
  }
}

function formatTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function N8nChatbot({ onOpenContact }: N8nChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const listEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const webhookUrl = getSafeWebhookUrl(CHATBOT_CONFIG.webhookUrl);
  const isConfigured = Boolean(webhookUrl);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen, messages, isLoading]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: formatTime(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');

    if (!webhookUrl) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'error',
          content:
            'n8n webhook URL is not configured yet. Add VITE_N8N_WEBHOOK_URL to your environment variables or CHATBOT_CONFIG.webhookUrl in src/data/portfolio.ts.',
          timestamp: formatTime(),
        },
      ]);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain;q=0.9',
        },
        signal: controller.signal,
        body: JSON.stringify({
          chatInput: trimmed,
          message: trimmed,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
          source: 'portfolio-web-chat',
          history: nextHistory
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .slice(-10)
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let replyText: string | null = null;

      if (contentType.includes('application/json')) {
        const jsonData: unknown = await response.json();
        replyText = extractN8nReply(jsonData);
      } else {
        const rawTextBody = await response.text();
        try {
          const parsedJson: unknown = JSON.parse(rawTextBody);
          replyText = extractN8nReply(parsedJson);
        } catch {
          replyText = extractN8nReply(rawTextBody);
        }
      }

      if (!replyText) {
        throw new Error('Empty response received from n8n webhook.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: formatTime(),
        },
      ]);
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === 'AbortError';
      const detail = isTimeout
        ? 'The n8n webhook request timed out after 25 seconds.'
        : err instanceof Error
          ? err.message
          : 'Unable to reach the n8n webhook endpoint.';

      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'error',
          content: `${detail} Please check that your n8n workflow is active and allows CORS from this origin.`,
          timestamp: formatTime(),
          retryText: trimmed,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleReset = () => {
    setMessages([]);
    try {
      window.sessionStorage.removeItem('yf_n8n_chat_session');
    } catch {
      // Ignore storage restrictions
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="Portfolio Assistant Chat"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] h-[min(520px,72vh)] bg-[#F5F4EF] border border-[#DAD9D2] shadow-lg flex flex-col text-[#171717]"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#191A18] text-[#F5F4EF] border-b border-[#2E302C] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#B7F36B] shrink-0" aria-hidden="true" />
                <h2 className="font-display text-sm font-semibold tracking-tight truncate">
                  {CHATBOT_CONFIG.title}
                </h2>
              </div>
              <p className="font-mono text-[11px] text-[#A6A69E] truncate mt-0.5">
                {CHATBOT_CONFIG.subtitle} · {isConfigured ? 'Endpoint Ready' : 'Not Configured'}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="inline-flex items-center justify-center w-9 h-9 text-[#A6A69E] hover:text-[#F5F4EF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7F36B]"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat panel"
                className="inline-flex items-center justify-center w-9 h-9 text-[#A6A69E] hover:text-[#F5F4EF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7F36B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="bg-[#ECEBE4] border border-[#DAD9D2] p-3.5 text-sm text-[#171717] leading-relaxed">
                  {CHATBOT_CONFIG.welcomeMessage}
                </div>

                {!isConfigured && (
                  <div className="border border-[#DAD9D2] bg-[#F5F4EF] p-3.5 space-y-2.5">
                    <p className="font-mono text-[11px] text-[#777771]">
                      Webhook Setup Required
                    </p>
                    <p className="text-xs text-[#171717] leading-relaxed">
                      Set <code className="font-mono bg-[#ECEBE4] px-1 py-0.5">VITE_N8N_WEBHOOK_URL</code> in your environment variables to connect live n8n replies.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenContact();
                      }}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#171717] editorial-underline"
                    >
                      <span>Open Contact Form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="font-mono text-[11px] text-[#777771]">
                    Suggested Questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {CHATBOT_CONFIG.starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="text-left text-xs text-[#171717] bg-[#ECEBE4] hover:bg-[#DAD9D2]/60 border border-[#DAD9D2] px-3 py-2.5 transition-colors flex items-center justify-between gap-2"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#777771] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === 'user'
                          ? 'bg-[#171717] text-[#F5F4EF]'
                          : msg.role === 'error'
                            ? 'bg-[#ECEBE4] border border-[#171717] text-[#171717]'
                            : 'bg-[#ECEBE4] border border-[#DAD9D2] text-[#171717]'
                      }`}
                    >
                      {msg.content}
                      {msg.role === 'error' && msg.retryText && (
                        <div className="mt-2 pt-2 border-t border-[#DAD9D2]">
                          <button
                            type="button"
                            onClick={() => void sendMessage(msg.retryText!)}
                            className="font-mono text-xs text-[#171717] underline underline-offset-4 hover:text-[#777771]"
                          >
                            Retry message
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-[#777771] mt-1 tabular-nums">
                      {msg.role === 'user'
                        ? 'You'
                        : msg.role === 'error'
                          ? 'System'
                          : 'Assistant'}{' '}
                      · {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-[#ECEBE4] border border-[#DAD9D2] px-3.5 py-2.5 font-mono text-xs text-[#777771]">
                      Waiting for n8n response...
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={listEndRef} />
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#F5F4EF] border-t border-[#DAD9D2] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Chat message"
              disabled={isLoading}
              className="flex-1 min-w-0 h-11 bg-[#ECEBE4] border border-[#DAD9D2] px-3 text-sm text-[#171717] placeholder:text-[#777771] focus:outline-none focus:border-[#171717] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="h-11 px-4 bg-[#171717] text-[#F5F4EF] hover:bg-[#B7F36B] hover:text-[#171717] disabled:opacity-40 disabled:hover:bg-[#171717] disabled:hover:text-[#F5F4EF] transition-colors inline-flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close assistant chat' : 'Open assistant chat'}
        className="h-11 px-4 bg-[#171717] text-[#F5F4EF] hover:bg-[#B7F36B] hover:text-[#171717] border border-[#171717] transition-colors duration-150 inline-flex items-center gap-2.5 font-mono text-xs whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close Chat</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4" />
            <span>Ask Assistant</span>
          </>
        )}
      </button>
    </div>
  );
}
