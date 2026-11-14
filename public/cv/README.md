# CV / Resume

Place your resume PDF in this folder, e.g. `public/cv/Maxmudjon-Raximjonov-CV.pdf`.

Then set its path in `src/data/profile.ts`:

```ts
cv: {
  url: '/cv/Maxmudjon-Raximjonov-CV.pdf',
  fileName: 'Maxmudjon-Raximjonov-CV.pdf',
},
```

While `cv.url` is `null`, every "Download CV" button shows a "Coming soon" state.
