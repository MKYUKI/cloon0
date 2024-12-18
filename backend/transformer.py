# backend/transformer.py
def transform_data(data):
    # データ変換のロジックをここに追加
    # 例: テキストの正規化、要約、翻訳など
    transformed = data.lower()
    return transformed

if __name__ == "__main__":
    # デモ用: ローカルでテスト可能
    sample_data = "This is a SAMPLE TEXT to TRANSFORM."
    print(transform_data(sample_data))
