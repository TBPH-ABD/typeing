# TypeSprint

A simple typing-speed practice web app that supports both Arabic and English.

## Overview

TypeSprint is a browser-based typing trainer that runs with no libraries or build tools. Type the displayed text within 60 seconds and track your speed and accuracy in real time.

## Features

- Two languages: Arabic (RTL) and English.
- Live words-per-minute (WPM) counter.
- Accuracy percentage and mistake counter.
- 60-second timer with a progress bar.
- Light and dark mode that remembers your choice.
- Live character highlighting: correct in green, wrong underlined in red.
- Accessibility: color contrast, keyboard navigation, and ARIA labels.
- Responsive design for both mobile and desktop.

## Getting Started

The app needs no installation. Start a simple local server:

```bash
cd typeing
python3 -m http.server 8000
```

Then open it in your browser:

```text
http://localhost:8000
```

You can also open `index.html` directly, but a local server loads the fonts more reliably.

## Project Structure

```text
typeing/
├── index.html   # Page structure
├── styles.css   # Styling and color system (light/dark)
├── script.js    # Test logic and statistics
└── README.md
```

## Technologies

- HTML5 and CSS3 (CSS variables, Grid, Flexbox)
- Vanilla JavaScript, no dependencies
- Google Fonts: Noto Sans Arabic, Inter, JetBrains Mono

## License

An educational project, free for personal use.
