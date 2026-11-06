from flask import Flask, request

from engine import cipher

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/cipher", methods=["POST"])
def process_cipher():
    data = request.get_json()
    mode = data["mode"]
    shift = data["shift"]
    message = data["message"]

    if mode == "decrypt":
        shift = -shift

    result = cipher(message, shift)
    return {"result": result}

if __name__ == "__main__":
    app.run(debug=False)