// src/components/ChatBox.tsx
import { useState } from 'react';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.result);
      } else {
        setResponse(data.error || 'エラーが発生しました');
      }
    } catch (error) {
      setResponse('予期せぬエラーが発生しました');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力してください..."
          className="input-field"
          required
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? '送信中...' : '送信'}
        </button>
      </form>
      {response && (
        <div className="response">
          <h3>GPTの返答:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
