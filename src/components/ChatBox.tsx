// src/components/ChatBox.tsx
import { useState } from 'react';

const ChatBox = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.result);
      } else {
        setError(data.error || 'エラーが発生しました');
      }
    } catch (err) {
      console.error('Error fetching chat response:', err);
      setError('エラーが発生しました');
    }
  };

  return (
    <div className="chatbox-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="チャットメッセージを入力..."
          required
        />
        <button type="submit">送信</button>
      </form>
      {response && <div className="response">{response}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ChatBox;
