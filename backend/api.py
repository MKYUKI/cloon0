# backend/api.py
from flask import Flask, request, jsonify
import os
from lib.utils import sanitize_input
from sendMail import send_mail

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process():
    data = request.json
    prompt = sanitize_input(data.get('prompt', ''))
    api = sanitize_input(data.get('api', 'openai'))
    
    # API処理のロジックをここに追加
    # 例: OpenAI APIの呼び出し
    if api == 'openai':
        # OpenAI APIの呼び出し
        response = "OpenAI response based on prompt."
    else:
        response = "Default response."
    
    return jsonify({'result': response})

if __name__ == '__main__':
    app.run(debug=True)
