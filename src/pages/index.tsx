import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])

  const sendMessage = async () => {
    const userMessage = input.trim()
    if(!userMessage) return
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message: userMessage })
    })

    const data = await res.json()
    if(data.answer) {
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }])
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error occurred' }])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`my-2 whitespace-pre-wrap ${msg.role === 'user' ? 'text-blue-700' : 'text-green-700'}`}>
              <strong>{msg.role === 'user' ? 'You: ' : 'Assistant: '}</strong>{msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4 bg-gray-100 flex">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
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
