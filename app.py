from flask import Flask, render_template, request

app = Flask(__name__)
app.config["SECRET_KEY"] = "kfndjkghdfkjn3nrkjnerijoifn9j49r9rj349otno4i"


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
