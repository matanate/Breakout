from flask import Flask, render_template, request
import os

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ["FLASK_SECRET_KEY"]


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/result", methods=["POST"])
def result():
    # Handle the POST request
    score = request.form.get("score")
    return render_template("result.html", score=score)


if __name__ == "__main__":
    app.run(debug=True)
