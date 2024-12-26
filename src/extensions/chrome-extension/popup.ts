// src/extensions/chrome-extension/popup.ts
const sendContentButton = document.getElementById('sendContent');

if (sendContentButton) {
  sendContentButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'sendContent' },
          (response) => {
            if (response?.status === 'success') {
              alert('コンテンツが送信されました！');
            } else {
              alert('エラーが発生しました。');
            }
          }
        );
      } else {
        alert('タブの取得に失敗しました。');
      }
    });
  });
} else {
  console.error("sendContentボタンが見つかりません。");
}
