# True Feedback — Secret-message

A small Next.js app to receive anonymous messages and manage user accounts with email verification. The project uses Next.js (App Router), NextAuth (credentials + JWT), MongoDB via Mongoose, Resend for transactional email, and Zod for runtime validation.

Features
- Email verification flow with one-time code (Resend) — see [`sendVerificationEmail`](src/helpers/sendVerificationemail.ts) ([src/helpers/sendVerificationemail.ts](src/helpers/sendVerificationemail.ts)) and the email template [`VerificationEmail`](email/VerificationEmail.tsx) ([email/VerificationEmail.tsx](email/VerificationEmail.tsx)).
- Sign up / Sign in with credentials and JWT sessions — NextAuth configuration [`authOptions`](src/app/api/auth/[...nextauth]/options.ts) ([src/app/api/auth/[...nextauth]/options.ts](src/app/api/auth/[...nextauth]/options.ts)).
- Store users and messages in MongoDB via Mongoose model [`UserModal`](src/models/User.ts) and [`Message` type](src/models/User.ts) ([src/models/User.ts](src/models/User.ts)).
- Accept/reject anonymous messages per user (toggle stored on user doc).
- API endpoints for send/get/delete messages, verification, username checks, and message acceptance control (see API routes below).
- Modern UI with shadcn-style components and Tailwind.

Quick links
- Database connection: [`dbconnect`](src/lib/dbConnect.ts) — [src/lib/dbConnect.ts](src/lib/dbConnect.ts)
- Mail helper: [`sendVerificationEmail`](src/helpers/sendVerificationemail.ts) — [src/helpers/sendVerificationemail.ts](src/helpers/sendVerificationemail.ts)
- Resend SDK instance: [`resend`](src/lib/resend.ts) — [src/lib/resend.ts](src/lib/resend.ts)
- Auth config: [`authOptions`](src/app/api/auth/[...nextauth]/options.ts) — [src/app/api/auth/[...nextauth]/options.ts](src/app/api/auth/[...nextauth]/options.ts)
- User model & types: [`UserModal`, `Message`](src/models/User.ts) — [src/models/User.ts](src/models/User.ts)
- API routes:
  - Sign up: [src/app/api/sign-up/route.ts](src/app/api/sign-up/route.ts)
  - Verify code: [src/app/api/verify-code/route.ts](src/app/api/verify-code/route.ts)
  - Send message: [src/app/api/send-message/route.ts](src/app/api/send-message/route.ts)
  - Get messages: [src/app/api/get-messages/route.ts](src/app/api/get-messages/route.ts)
  - Delete message: [src/app/api/delete-message/[messageid]/route.ts](src/app/api/delete-message/[messageid]/route.ts)
  - Accept messages (GET/POST): [src/app/api/accept-message/route.ts](src/app/api/accept-message/route.ts)
  - Username availability: [src/app/api/check-username-unique/route.ts](src/app/api/check-username-unique/route.ts)
  - Suggest messages (AI streaming): [src/app/api/suggest-messages/route.ts](src/app/api/suggest-messages/route.ts)

Validation schemas (Zod)
- [`signUpSchema`](src/schema/signUpSchema.ts) — [src/schema/signUpSchema.ts](src/schema/signUpSchema.ts)
- [`signInSchema`](src/schema/signInSchema.ts) — [src/schema/signInSchema.ts](src/schema/signInSchema.ts)
- [`verifySchema`](src/schema/verifySchema.ts) — [src/schema/verifySchema.ts](src/schema/verifySchema.ts)
- [`messageSchema`](src/schema/messageSchema.ts) — [src/schema/messageSchema.ts](src/schema/messageSchema.ts)
- [`acceptSchema`](src/schema/acceptMessageSchema.ts) — [src/schema/acceptMessageSchema.ts](src/schema/acceptMessageSchema.ts)

Frontend components & utilities
- Main navbar: [`Navbar`](src/components/Navbar.tsx) — [src/components/Navbar.tsx](src/components/Navbar.tsx)
- Message UI card: [`MessageCard`](src/components/MessageCard.tsx) — [src/components/MessageCard.tsx](src/components/MessageCard.tsx)
- UI primitives (button, input, form, etc.): [src/components/ui](src/components/ui)
  - Button: [`Button`](src/components/ui/button.tsx) — [src/components/ui/button.tsx](src/components/ui/button.tsx)
  - Card: [`Card`](src/components/ui/card.tsx) — [src/components/ui/card.tsx](src/components/ui/card.tsx)
  - Form helpers: [src/components/ui/form.tsx](src/components/ui/form.tsx)
- Client-side context provider for NextAuth: [`AuthProvider`](src/context/AuthProvider.tsx) — [src/context/AuthProvider.tsx](src/context/AuthProvider.tsx)
- Utility helpers: [`cn`](src/lib/utils.ts) — [src/lib/utils.ts](src/lib/utils.ts)

Project structure (important files)
- App router root: [src/app/layout.tsx](src/app/layout.tsx) and area-specific layouts [src/app/(app)/layout.tsx](src/app/(app)/layout.tsx)
- Public assets: [public/](public)
- Environment configuration: [.env] — do not commit secrets (see .gitignore)

Getting started (dev)
1. Install:
```sh
npm install
```
2. Environment variables (create a .env file). Typical variables this project expects:
- MONGODB_URI — MongoDB connection string
- RESEND_API_KEY — Resend API key
- NEXT_AUTH_SECRET — NextAuth secret

3. Start dev server:
```sh
npm run dev
```

Build & deploy
- Build: npm run build
- Start: npm start
- Deploy on Vercel or any Node host that supports Next.js App Router. Ensure environment variables are configured in the host.

Database notes
- The app uses MongoDB via Mongoose. Connection logic is in [`dbconnect`](src/lib/dbConnect.ts). See [src/lib/dbConnect.ts](src/lib/dbConnect.ts).

Authentication
- Credentials provider + bcrypt password check and JWT sessions in [`authOptions`](src/app/api/auth/[...nextauth]/options.ts). See [src/app/api/auth/[...nextauth]/options.ts](src/app/api/auth/[...nextauth]/options.ts).

Email verification
- Verification flow sends a 5-digit code via Resend using [`sendVerificationEmail`](src/helpers/sendVerificationemail.ts) and the template [`VerificationEmail`](email/VerificationEmail.tsx). See [src/helpers/sendVerificationemail.ts](src/helpers/sendVerificationemail.ts) and [email/VerificationEmail.tsx](email/VerificationEmail.tsx).

APIs
- All REST endpoints live under [src/app/api](src/app/api). Review the files listed above for request/response shapes. Shared response type: [`ApiResponse`](src/types/ApiResponse.ts) — [src/types/ApiResponse.ts](src/types/ApiResponse.ts).

Frontend notes
- UI uses Tailwind + shadcn approach. Global styles are in [src/app/globals.css](src/app/globals.css).
- Pages and layouts use the App Router. See [src/app/(app)/page.tsx](src/app/(app)/page.tsx) and [src/app/(app)/dashboard/page.tsx](src/app/(app)/dashboard/page.tsx).

Common tasks
- Add a new API route: create under [src/app/api].
- Add new model: place in [src/models] and export default Mongoose model.
- Add UI component: place in [src/components] or [src/components/ui].

Troubleshooting
- "Cannot connect to MongoDB": verify MONGODB_URI and that the database is reachable.
- Email not sent: verify RESEND_API_KEY and Resend account.
- NextAuth errors: ensure NEXT_AUTH_SECRET is set.

Contributing
- Fork, create a feature branch, open a PR.
- Keep code style consistent with existing components (Tailwind + shadcn patterns).

License
- This repository is licensed under the MIT License. See [LICENSE](LICENSE).

Contact
- Open issues or PRs in the repo for bugs/feature requests.
