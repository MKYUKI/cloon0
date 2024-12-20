import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    })

    const data = await res.json()
    if (data.answer) {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'エラーが発生しました。' }])
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.role === 'user' ? 'text-blue-700' : 'text-green-700'}`}>
              <strong>{msg.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4 bg-gray-100 flex">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}
