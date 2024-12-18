# backend/api.py
from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

def handle_openai(prompt):
    api_key = os.getenv('OPENAI_API_KEY')
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        'model': 'text-davinci-003',
        'prompt': prompt,
        'max_tokens': 150
    }
    response = requests.post('https://api.openai.com/v1/completions', headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['text'].strip()
    else:
        return 'OpenAI APIでエラーが発生しました。'

def handle_google(prompt):
    api_key = os.getenv('GOOGLE_API_KEY')
    search_engine_id = os.getenv('GOOGLE_SEARCH_ENGINE_ID')
    url = f'https://www.googleapis.com/customsearch/v1?key={api_key}&cx={search_engine_id}&q={prompt}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'items' in data:
            return '\n'.join([f"{item['title']}: {item['link']}" for item in data['items']])
        else:
            return 'Google検索結果が見つかりませんでした。'
    else:
        return 'Google APIでエラーが発生しました。'

@app.route('/api/process', methods=['POST'])
def process():
    data = request.get_json()
    prompt = data.get('prompt', '')
    api_name = data.get('api', 'openai')
    
    if not prompt:
        return jsonify({'result': 'プロンプトが提供されていません。'}), 400

    try:
        if api_name == 'openai':
            result = handle_openai(prompt)
        elif api_name == 'google':
            result = handle_google(prompt)
        else:
            result = '対応するAPIが見つかりませんでした。'
        return jsonify({'result': result}), 200
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'result': '内部サーバーエラーが発生しました。'}), 500

if __name__ == '__main__':
    app.run(debug=True)
