import React, { useState } from 'react';

type Msg = { role:'user'|'assistant', content:string };

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async() => {
    if(!input.trim()) return;
    const userMsg = { role:'user' as const, content:input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:newMsgs})
      });
      if(!res.ok) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      if(data && data.role==='assistant') {
        setMessages(prev => [...prev, data]);
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col h-[80vh] border border-gray-300 dark:border-gray-600 rounded shadow p-4">
      <div className="flex-grow overflow-y-auto mb-4 space-y-2 bg-white dark:bg-gray-900 relative">
        {/* 擬似的な量子的青線背景 (簡易CSS) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* シンプルなパターン線を量子的・幾何学的にイメージ */}
            <path d="M0,50 C150,200 350,0 500,100 L600,50" stroke="url(#grad)" strokeWidth="2" fill="none"/>
            <path d="M0,150 C100,0 300,200 500,50 L600,150" stroke="url(#grad)" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="relative z-10 p-2 space-y-2">
          {messages.map((m,i)=>(
            <div key={i} className={`p-2 rounded ${m.role==='user' ? 'bg-blue-100 text-black' : 'bg-gray-200 text-black'}`}>
              <strong>{m.role==='user'? 'You:' : 'GPT:'}</strong> {m.content}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <input
          className="flex-grow border border-gray-300 p-2 rounded-l dark:bg-gray-800 dark:text-white"
          placeholder="メッセージを入力..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter')sendMessage();}}
        />
        <button onClick={sendMessage} className="px-4 bg-blue-600 text-white rounded-r">
          送信
        </button>
      </div>
    </div>
  )
}

export default ChatUI;
