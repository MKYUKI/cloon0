import os
import openai
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# 環境変数を読み込む
load_dotenv()

# Flaskアプリケーションを初期化
app = Flask(__name__)
CORS(app)  # CORSの設定を有効化（必要に応じて）

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OpenAI APIキーが設定されていません。")

# エンドポイント: チャットAPI
@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        # リクエストボディからユーザー入力を取得
        data = request.json
        user_message = data.get("message")
        
        if not user_message:
            return jsonify({"error": "メッセージが必要です"}), 400
        
        # OpenAI APIを呼び出す
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ],
        )

        # AIからの応答を取得
        reply = response["choices"][0]["message"]["content"]

        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# アプリケーションを起動
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
