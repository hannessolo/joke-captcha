from flask import Flask, request
from generator import start, generate

app = Flask(__name__)

@app.route("/generate", methods=["GET"])
def generate_route():
    print("hello")
    prompt = request.args.get('prompt')
    print(f"prompt: {prompt}")
    return generate(prompt)

@app.route("/")
def greet():
    print("hello")
    return "Hello"
