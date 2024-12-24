// src/extensions/chrome-extension/background.ts
/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension Installed');
});
