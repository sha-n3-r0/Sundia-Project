<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // For now, allow any authenticated user to access admin routes.
        // If the user is not authenticated, return a 403 response.
        if (! $user) {
            abort(403);
        }

        return $next($request);
    }
}

