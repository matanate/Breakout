## Breakout Game Flask App

# Overview

This is a simple implementation of the classic Breakout game using Flask for the backend and JavaScript for the frontend. The game features a paddle, a bouncing ball, and blocks to be cleared. The player's goal is to keep the ball bouncing, hitting and clearing the blocks, while avoiding letting the ball fall off the screen.

# Dependencies

Make sure you have Python and Flask installed on your system before running this application.

```bash
pip install -r requirements.txt
```

# Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/breakout-flask-app.git
cd breakout-flask-app
```

2. Set an environment variable called "FLASK_SECRET_KEY" and set it to your choice.

```bash
export FLASK_SECRET_KEY="YOUR_FLASK_SECRET_KEY"
```

3. Run the Flask application:

```bash
python app.py
```

3. Open your web browser and navigate to http://127.0.0.1:5000/ to play the Breakout game.

# How to Play

- Move the paddle by moving the mouse within the paddle's container.
- The ball will bounce off the paddle and blocks.
- Clear blocks to score points.
- If the ball falls off the screen, you lose a life.
- Lose all lives, and the game ends.
- The game features different colored blocks with varying point values.

# Game Features

- Dynamic paddle and ball movement.
- Collision detection with blocks.
- Different colored blocks with different point values.
- Paddle size reduction when the ball hits the top wall.
- Special effects for hitting specific color blocks.
- Game over when all lives are lost.
- Score tracking.

## Deployment (Live Demo)

Check out the live demo:
[Live Demo]((https://breakout-g6ru.onrender.com))

# Acknowledgments

- The Breakout game logic is implemented using HTML, CSS, and JavaScript.
- Flask is used to handle server-side logic and communicate between frontend and backend.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
