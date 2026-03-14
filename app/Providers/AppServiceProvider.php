<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if ($this->app->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        // Ensure storage directories exist so logging and views don't throw 500
        $storage = storage_path();
        $dirs = ['logs', 'framework/views', 'framework/sessions', 'framework/cache/data', 'app/public', 'app/private'];
        foreach ($dirs as $dir) {
            $path = $storage . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $dir);
            if (!is_dir($path)) {
                @mkdir($path, 0755, true);
            }
        }
    }
}
