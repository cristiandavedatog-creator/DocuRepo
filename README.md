# Document Repository System

This project is a Next.js App Router TypeScript application that stores uploaded documents in Google Drive and metadata in PostgreSQL via Prisma.

Key features:
- Credentials authentication (NextAuth)
- Google Drive storage via Service Account
- Prisma ORM + PostgreSQL (Neon)
- Upload, preview, download, search, activity logs
- Tailwind CSS UI

Environment variables: copy `.env.example` to `.env` and fill values.

Local dev:

```bash
npm install
npx prisma generate
npx prisma migrate deploy # or migrate dev during development
npm run dev
```

Deploy to Vercel: push to GitHub and connect to Vercel, set environment variables in the Vercel dashboard.

Vercel + Render deployment checklist
1. Create a GitHub repository and push this project (main branch).
2. Provision a PostgreSQL database on Render (or Neon/Supabase). Copy the connection URL.
3. In the GitHub repo settings > Secrets, add `DATABASE_URL` with the Render Postgres URL.
4. (Optional) Add `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_FOLDER_ID` as GitHub secrets.
5. The included GitHub Actions workflow `.github/workflows/prisma-migrate.yml` will run `npx prisma migrate deploy` on push to `main` using the `DATABASE_URL` secret.
6. In Vercel, import the GitHub repo and set the following Environment Variables in the Vercel project settings (Production):
	- `DATABASE_URL` (same as Render DB)
	- `NEXTAUTH_SECRET` (random 32+ char string)
	- `GOOGLE_CLIENT_EMAIL`
	- `GOOGLE_PRIVATE_KEY` (ensure newlines are preserved; use `\n` encoded value if needed)
	- `GOOGLE_DRIVE_FOLDER_ID` (the Drive folder ID)
	- `NEXTAUTH_URL` = `https://<your-vercel-app>.vercel.app`
7. Configure Vercel build command: `npm run build` (default) and output directory left blank (Next.js App Router).
8. After Vercel deploy succeeds, trigger the GitHub Actions workflow (push to `main`) or let it run automatically to apply Prisma migrations.
9. Seed the database (if desired): run `npm run seed` against the production DB (use `DATABASE_URL` environment variable).

Notes
- The project now uses PostgreSQL as the Prisma datasource. Local development can still use a local Postgres instance or a connection to a dev Neon/Supabase database.
- To apply migrations locally, set `DATABASE_URL` in your `.env` and run:

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

- To run migrations in CI/CD, the workflow added runs `npx prisma migrate deploy` on `main`.
