# OmniFace 3D

A face-scan toy I vibe-coded in about four hours. It turns phone selfies into a 3D face you can spin around, and prints a pile of "scores" about your face.

**Free. No subscription. No account. Nothing leaves your phone.**

## What it does

- Opens your front camera and puts a **green dot on your nose**.
- Shows a ring on screen. Move the green dot into the ring and the app **takes the photo by itself**.
- Takes 5 full-resolution photos: front, left 35°, left side, right 35°, right side.
- Builds a **3D face mesh** and paints it with those photos.
- **Head control:** turn your head and the 3D face turns with you.
- Prints face "measurements" (jaw angle, eye tilt, thirds, golden ratio, etc.).
- "Save photos" downloads the full-resolution shots.

## How it actually works (it's not magic)

1. **Face points.** Google's free [MediaPipe Face Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker) runs in the browser and finds 468 points on your face. This is free, open tooling.
2. **Head turn.** The app reads how far your head is turned from the model's pose matrix.
3. **Auto-capture.** When the nose dot sits in the ring and the head angle is right, hold still for about 0.2 seconds and it snaps a photo.
4. **3D face.** The 468 points are joined into triangles with a fixed pattern. For each triangle, the app picks the photo that saw that patch of skin best and paints it on.
5. **The "scores".** A few lines of math: distances between points, divided by other distances, compared to an "ideal" number somebody made up. That's it.

## Honest limits

- The scores are **made-up formulas, not science**. Treat them like a personality quiz.
- It only sees your face skin. **No hair, no ears, no back of the head.** Hair changes how a face looks a lot, and this knows nothing about it.
- Depth from one phone camera is a guess. Selfie lenses also stretch faces, and lighting and head tilt change the numbers. Scan twice and you'll get different results.
- Do **not** use this to make decisions about surgery, self-worth, or anything serious.

## A small rant, for free

Plenty of "looksmaxxing" apps charge a monthly subscription to tell you a number about your face. I haven't seen their code, so I can't say what's inside any of them. But I built this in an afternoon with a free library and a calculator, and once I saw how little is going on under the hood, paying a subscription for a face score looked like a bad deal.

A number on a screen doesn't make anyone better looking. Sleep, a decent haircut, good skin habits, a smile and some confidence do a lot more, and they're free too.

Have fun with it. Don't pay anyone to rate your face.

## Run it

- Open `index.html` in a browser, **with internet on the first run** (it downloads the face model).
- On a phone the camera needs a secure page (https). The easy way is **GitHub Pages**: repo Settings → Pages → deploy from the main branch, then open the link on your phone.

## Built with

React, Three.js and MediaPipe, bundled into a single HTML file. Written with a lot of AI help ("vibe coded"). The files in this repo are the compiled output, so the code looks huge and unreadable. Almost all of it is the libraries, not hand-written code.
