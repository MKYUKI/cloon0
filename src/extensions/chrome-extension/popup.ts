// src/extensions/chrome-extension/popup.js
document.getElementById('sendContent').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "sendContent" }, (response) => {
        if (response.status === 'success') {
          alert('コンテンツが送信されました！');
        } else {
          alert('エラーが発生しました。');
        }
      });
    });
  });
  