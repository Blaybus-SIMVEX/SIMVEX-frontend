'use client';

import { useApi } from '@/lib/useApi';
import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface ChatResponse {
  answer: string;
  id: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const { POST, isLoading, error } = useApi<ChatResponse>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요!\nSIMVEX AI 어시스턴트입니다.\n무엇을 도와드릴까요?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await POST('/api/ai/chat', {
        object3DId: 1, // TODO: Context-aware ID if needed
        question: input,
        conversationHistory: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
      
      if (response) {
         setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.answer,
          },
        ]);
      }
    } catch (e) {
      console.error('Failed to send message', e);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Header */}
      <div className="p-5 flex items-center justify-between bg-white border-b border-gray-100 z-10">
        <h3 className="font-bold text-lg text-black tracking-tight">
          AI 어시스턴트
        </h3>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              'flex w-full gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start items-end'
            )}
          >
            {/* AI Avatar (Only for assistant) - Aligned to bottom */}
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden mb-1 self-end">
                <span className="text-lg">🐻</span>
              </div>
            )}

            <div
              className={clsx(
                'max-w-[85%] px-5 py-3 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-gray-100 text-gray-900 rounded-3xl rounded-tr-sm'
                  : 'bg-white text-gray-900 border border-gray-200 rounded-3xl rounded-tl-sm'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-end gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mb-1">
                <span className="text-lg">🐻</span>
             </div>
             <div className="bg-white px-5 py-3 rounded-3xl rounded-tl-sm border border-gray-200 shadow-sm text-sm text-gray-400">
                입력 중...
             </div>
          </div>
        )}
        {error && (
             <div className="text-center text-xs text-red-500 mt-2">
                에러가 발생했습니다: {error}
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="궁금한 내용을 AI에게 물어보세요"
            className="w-full pl-5 pr-12 py-3.5 bg-white border border-gray-200 rounded-[20px] focus:outline-none focus:border-gray-400 focus:ring-0 transition-all text-sm placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
