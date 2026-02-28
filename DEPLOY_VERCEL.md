# Deploying Sundia Project to Vercel

This project is configured to run on [Vercel](https://vercel.com) using the PHP serverless runtime.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Setup

### 1. Connect the repository

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your Git repository.
3. Leave **Framework Preset** as "Other" (or "None").
4. **Root Directory**: leave as `.` (project root).
5. **Build Command** and **Install Command**: the `vercel.json` in the repo already sets:
   - Install: `composer install --no-dev --optimize-autoloader && npm ci`
   - Build: same (runs before deploy); `npm run build` is part of it and outputs to `public/build`.

### 2. Environment variables

In the Vercel project: **Settings → Environment Variables**, add:

| Variable       | Description                    | Example / notes                          |
|----------------|--------------------------------|------------------------------------------|
| `APP_KEY`      | Laravel app key (required)     | Run `php artisan key:generate --show`   |
| `APP_URL`      | Production URL                 | `https://your-project.vercel.app`       |
| `APP_ENV`      | Optional override              | `production`                             |
| `APP_DEBUG`    | Optional override              | `false`                                  |

Do **not** commit `.env` or put secrets in `vercel.json`; use only the Vercel UI (or CLI) for sensitive values.

### 3. Deploy

- Push to the connected branch (e.g. `main`); Vercel will build and deploy automatically.
- Or run locally: `npx vercel` (after `npm i -g vercel` if needed).

## Notes

- **Session & cache**: The config uses `SESSION_DRIVER=cookie` and `CACHE_STORE=array` so the app runs without a database or Redis on Vercel. If you add a DB later, set `DB_*` (or `REDIS_*`) in Environment Variables.
- **Static assets**: Vite builds to `public/build`. The `vercel.json` routes send `/build/*` and other static files to the right place; the rest go to `api/index.php` (Laravel).
- **PHP version**: The `vercel-php` runtime uses a recent PHP version. If you need a specific version, check [Vercel PHP runtime](https://github.com/vercel/vercel/tree/main/packages/php) docs.

## Troubleshooting

- **500 or blank page**: Check Vercel **Functions** logs for PHP errors; ensure `APP_KEY` is set.
- **Assets 404**: Confirm the build step runs (`npm run build`) and that `public/build` exists in the deployment (e.g. not ignored in `.vercelignore`).
- **Routes not found**: Ensure all routes are defined in `routes/web.php` and that `api/index.php` is present and forwards to `public/index.php`.
