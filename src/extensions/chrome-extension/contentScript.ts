// src/extensions/chrome-extension/contentScript.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendContent') {
    const content = document.body.innerText;
    // Clooon0のAPIエンドポイントに送信
    fetch(
      'https://0-dfpsdybb4-mkyukis-projects.vercel.app/api/receive-content',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ status: 'success', data });
      })
      .catch((error) => {
        sendResponse({ status: 'error', error });
      });
    return true; // 非同期レスポンスのためtrueを返す
  }
});
