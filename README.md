# Steilar

Steilar is a production-grade AI fashion generation platform scaffold built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Firebase, Stripe, and Capacitor.

It includes:

- iOS-first PWA experience with manifest, icons, service worker, offline route, safe-area handling, and install-ready layout
- Luxury mobile UI for landing, onboarding, login, home, prompt assistant, generation, gallery, subscriptions, tailoring request, notifications, profile, settings, and admin
- Firebase Auth, Firestore, Storage, Cloud Messaging-ready client/server layers
- OpenAI prompt enhancement and image-generation route with demo fallback
- Stripe Checkout subscription/payment route and webhook ledger
- Cloud Functions for tailoring complexity review and quote notification creation
- Partner-test generation mode: user prompt submission creates a 7-minute reveal screen while an admin manually attaches the final image
- Firestore schema, indexes, security rules, storage rules, Vercel/Firebase/Capacitor deployment docs

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Partner-test flow

1. Ask the user to create from `/generate`.
2. The app saves the prompt and sends them to `/results?pending=gen_...`.
3. They see a polished 7-minute countdown while the gallery polls for completion.
4. Open `/admin`, paste the generation id and image URL, then attach it.
5. The user's screen reveals the image and they can tap `Tailor this`.

## Production

See `docs/DEPLOYMENT.md` and `docs/FIRESTORE_SCHEMA.md`.
