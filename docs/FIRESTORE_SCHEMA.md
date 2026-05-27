# Steilar Firestore Schema

## `users/{userId}`

- `id`: Firebase Auth uid
- `email`, `displayName`, `photoURL`
- `tier`: `free | weekly | monthly | pro`
- `freeGenerationsUsed`: number
- `credits`: number
- `stripeCustomerId`: string
- `styleProfile`: onboarding preferences
- `createdAt`, `updatedAt`

## `generations/{generationId}`

- `userId`
- `prompt`
- `enhancedPrompt`
- `sourceImageUrl`
- `resultImageUrls`
- `status`: `draft | processing | complete | failed`
- `usageCostCredits`
- `isFavorite`
- `createdAt`

## `tailorRequests/{requestId}`

- `userId`
- `generationId`
- `selectedImageUrl`
- `measurements`
- `fabricPreferences`
- `address`
- `urgency`
- `notes`
- `complexityScore`
- `quoteAmount`, `quoteCurrency`
- `status`: `submitted | ai_review | manual_review | quoted | accepted | paid | in_production | quality_check | shipped | delivered`
- `createdAt`, `quotedAt`, `paidAt`

## `notifications/{notificationId}`

- `userId`
- `type`
- `title`
- `body`
- `read`
- `createdAt`

## `subscriptions/{subscriptionId}`

- `userId`
- `stripeCustomerId`
- `stripeSubscriptionId`
- `tier`
- `status`
- `currentPeriodEnd`

## `stripeEvents/{eventId}`

Webhook ledger for idempotent billing processing.
