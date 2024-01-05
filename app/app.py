from flask import Flask, request, jsonify, render_template
from python_server import get_chatbot_response 
app = Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['userInput']
    bot_response = get_chatbot_response(user_message)
    response_data = {
        "chatbotResponse": bot_response   
    }
    
    return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True)
