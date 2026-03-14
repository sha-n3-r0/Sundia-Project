<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

/*
| Resolve base path: use APP_BASE_PATH from .env if set (e.g. when web server
| points to a different drive/path). Fixes "no existing directory at ... storage/logs".
*/
$basePath = dirname(__DIR__);
$envPath = $basePath . DIRECTORY_SEPARATOR . '.env';
if (is_file($envPath)) {
    $lines = @file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line !== '' && strpos($line, '#') !== 0 && str_starts_with($line, 'APP_BASE_PATH=')) {
            $value = trim(substr($line, 15), " \t\"'");
            if ($value !== '' && is_dir($value)) {
                $basePath = $value;
            }
            break;
        }
    }
}

return Application::configure(basePath: $basePath)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\SecurityHeaders::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
