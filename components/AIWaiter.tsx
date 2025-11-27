import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { askAIWaiter } from '../services/geminiService';

interface AIWaiterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIWaiter: React.FC<AIWaiterProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Bonjour! Je suis votre assistant virtuel. Que désirez-vous manger aujourd\'hui ? (Ex: "Je veux quelque chose de piquant" ou "Moins de 200 MRU")' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const aiResponse = await askAIWaiter(userText);
    
    setLoading(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white sm:rounded-t-3xl sm:top-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-violet-600 text-white sm:rounded-t-3xl">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-300 animate-pulse" />
          <h2 className="font-bold">Assistant Gourmet</h2>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
               <Bot size={16} className="animate-bounce text-indigo-500" />
               <span className="text-xs text-gray-400">En train d'écrire...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white pb-safe">
        <div className="flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question..."
                className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !query.trim()}
                className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-200"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};
