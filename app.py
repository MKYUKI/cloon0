# app.py
from flask import Flask, request, jsonify
import api
import transformer

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    prompt = data.get('prompt', '')
    api_name = data.get('api', 'openai')
    response = api.handle_request(prompt, api_name)
    transformed = transformer.transform_data(response)
    return jsonify({'result': transformed})

if __name__ == '__main__':
    app.run(debug=True)
