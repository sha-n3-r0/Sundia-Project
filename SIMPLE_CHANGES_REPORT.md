# Simple Changes Report — Admin Area + Hardening

Date: **2026-03-06**

## What was added / changed

### Admin account support (server-side)

- **Added `is_admin` flag to users**
  - Migration: `database/migrations/2026_03_06_000003_add_is_admin_to_users_table.php`
  - User cast: `app/Models/User.php` now casts `is_admin` to boolean.

- **Added admin-only middleware**
  - Middleware: `app/Http/Middleware/EnsureUserIsAdmin.php`
  - Middleware alias: `bootstrap/app.php` registers alias **`admin`**

- **Added admin route group**
  - Route: `GET /admin` (name: `admin.dashboard`)
  - Protected by: `auth` + `admin`
  - File: `routes/web.php`

### Admin UI (Inertia / React)

- **New page**
  - `resources/js/Pages/Admin/Dashboard.jsx`

- **Admin link in authenticated navigation**
  - Shows only when `auth.user.is_admin === true`
  - File: `resources/js/Layouts/AuthenticatedLayout.jsx`

### Security hardening applied

- **Disabled public registration routes**
  - Removed `GET /register` and `POST /register`
  - File: `routes/auth.php`
  - (The UI file `resources/js/Pages/Auth/Register.jsx` still exists, but it’s no longer reachable by route.)

- **Removed public version disclosure**
  - Home route no longer sends Laravel/PHP versions as props
  - File: `routes/web.php`
  - Updated Welcome props signature
  - File: `resources/js/Pages/Welcome.jsx`

- **Added baseline security headers**
  - Middleware: `app/Http/Middleware/SecurityHeaders.php`
  - Enabled for all web requests via `bootstrap/app.php`
  - Adds: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`

## Where you can see it

1. **Run the migration**

```bash
php artisan migrate
```

2. **Make a user an admin**

Option A (recommended quick way): use tinker

```bash
php artisan tinker
>>> $u = \App\Models\User::where('email','YOUR_EMAIL_HERE')->first();
>>> $u->is_admin = true;
>>> $u->save();
```

Option B: set it directly in your database in the `users` table (`is_admin = 1`).

3. **Login normally**

- Go to `GET /login` and sign in.

4. **Open the admin page**

- Visit `GET /admin`
- Or click **Admin** in the top navigation (only visible for admins).

## Notes

- If you want to re-enable public registration later, add the register routes back into `routes/auth.php`.
- If you want to add more admin management pages, put them under `resources/js/Pages/Admin/` and add corresponding routes inside the `prefix('admin')` group in `routes/web.php`.

