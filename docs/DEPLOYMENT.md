# Steilar Deployment

## Local setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill Firebase, OpenAI, and Stripe keys.
4. Run locally: `npm run dev`
5. Build check: `npm run build`

## Firebase

1. Create a Firebase project.
2. Enable Auth providers: Apple, Google, Email/password.
3. Enable Firestore, Storage, Cloud Messaging, and Functions.
4. Deploy rules:

```bash
firebase deploy --only firestore:rules,storage
```

5. Deploy functions:

```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

## Stripe

1. Create weekly, monthly, and pro subscription prices.
2. Add the price IDs to `.env.local` and Vercel.
3. Add webhook endpoint: `/api/stripe/webhook`
4. Subscribe to `checkout.session.completed`, `customer.subscription.updated`, and `invoice.payment_failed`.

## Manual generation testing

For a high-touch demo before live AI generation is enabled:

1. User submits a prompt in `/generate`.
2. The gallery opens with a seven-minute countdown and pending generation id in the URL.
3. Admin opens `/admin`, pastes that id, and attaches the final hosted image URL.
4. The user's gallery polls `/api/generations/{id}` and reveals the image when the status becomes `complete`.

## Vercel

1. Import this repository.
2. Add all environment variables from `.env.example`.
3. Deploy with default Next.js settings.
4. Set `NEXT_PUBLIC_APP_URL` to the production URL.

## iOS PWA

1. Open production URL in iPhone Safari.
2. Share -> Add to Home Screen.
3. App launches standalone with safe-area layout, manifest, icon, service worker, and offline fallback.

## Android APK via Capacitor

1. Build web output for static wrapper if you choose export hosting, or point Capacitor at the deployed URL.
2. Run:

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

3. Build signed APK/AAB in Android Studio.
