# backend/sendMail.py
import os
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

def send_mail(data):
    sg = sendgrid.SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
    from_email = Email("no-reply@cloon0.com")  # 送信元メールアドレス
    to_email = To("your-email@example.com")     # 受信先メールアドレス
    subject = f"新しいお問い合わせ: {data['name']}"
    content = Content("text/plain", f"名前: {data['name']}\nメール: {data['email']}\nメッセージ:\n{data['message']}")
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    return response.status_code

if __name__ == "__main__":
    # デモ用: ローカルでテスト可能
    sample_data = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "message": "これはテストメッセージです。"
    }
    print(send_mail(sample_data))
