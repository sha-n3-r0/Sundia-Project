<?php

namespace App\Http\Middleware;

use App\Models\HomepageVideo;
use App\Models\SiampageVideo;
use App\Models\Sundia;
use App\Models\TopoffroadpageVideo;
use App\Models\TpsmipageVideo;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Schema;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sundia = Sundia::first();
        $homepageVideo = HomepageVideo::query()
            ->active()
            ->latest('id')
            ->first();
        $siampageVideo = Schema::hasTable('siampage_videos')
            ? SiampageVideo::query()
                ->active()
                ->latest('id')
                ->first()
            : null;
        $tpsmipageVideo = Schema::hasTable('tpsmipage_videos')
            ? TpsmipageVideo::query()
                ->active()
                ->latest('id')
                ->first()
            : null;
        $topoffroadpageVideo = Schema::hasTable('topoffroadpage_videos')
            ? TopoffroadpageVideo::query()
                ->active()
                ->latest('id')
                ->first()
            : null;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'success_logo' => fn () => $request->session()->get('success_logo'),
                'success_stats' => fn () => $request->session()->get('success_stats'),
                'success_video' => fn () => $request->session()->get('success_video'),
                'success_siam_video' => fn () => $request->session()->get('success_siam_video'),
                'success_tpsmi_video' => fn () => $request->session()->get('success_tpsmi_video'),
                'success_tpsmi_stats' => fn () => $request->session()->get('success_tpsmi_stats'),
                'success_topoffroad_video' => fn () => $request->session()->get('success_topoffroad_video'),
                'success_topoffroad_stats' => fn () => $request->session()->get('success_topoffroad_stats'),
                'success_mission_vision' => fn () => $request->session()->get('success_mission_vision'),
                'success_subsidiary' => fn () => $request->session()->get('success_subsidiary'),
                'success_team_member' => fn () => $request->session()->get('success_team_member'),
                'success_trusted_company' => fn () => $request->session()->get('success_trusted_company'),
                'success_contact_info' => fn () => $request->session()->get('success_contact_info'),
                'success_upcoming_event' => fn () => $request->session()->get('success_upcoming_event'),
                'success_siam_product_category' => fn () => $request->session()->get('success_siam_product_category'),
                'success_siam_category_product' => fn () => $request->session()->get('success_siam_category_product'),
                'success_tpsmi_product' => fn () => $request->session()->get('success_tpsmi_product'),
                'success_topoffroad_product' => fn () => $request->session()->get('success_topoffroad_product'),
                'success_careers' => fn () => $request->session()->get('success_careers'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'sundia' => $sundia
                ? [
                    'logo_path' => $sundia->logo_path,
                    'content' => $sundia->content,
                ]
                : null,
            'homepageVideo' => $homepageVideo
                ? [
                    'id' => $homepageVideo->id,
                    'title' => $homepageVideo->title,
                    'video_url' => $homepageVideo->video_url,
                    'video_path' => $homepageVideo->video_path,
                    'thumbnail_path' => $homepageVideo->thumbnail_path,
                    'overlay_enabled' => (bool) $homepageVideo->overlay_enabled,
                    'overlay_image_path' => $homepageVideo->overlay_image_path,
                    'is_active' => (bool) $homepageVideo->is_active,
                ]
                : null,
            'siamPageVideo' => $siampageVideo
                ? [
                    'id' => $siampageVideo->id,
                    'title' => $siampageVideo->title,
                    'video_url' => $siampageVideo->video_url,
                    'video_path' => $siampageVideo->video_path,
                    'thumbnail_path' => $siampageVideo->thumbnail_path,
                    'overlay_enabled' => (bool) $siampageVideo->overlay_enabled,
                    'overlay_image_path' => $siampageVideo->overlay_image_path,
                    'is_active' => (bool) $siampageVideo->is_active,
                ]
                : null,
            'tpsmiPageVideo' => $tpsmipageVideo
                ? [
                    'id' => $tpsmipageVideo->id,
                    'title' => $tpsmipageVideo->title,
                    'video_url' => $tpsmipageVideo->video_url,
                    'video_path' => $tpsmipageVideo->video_path,
                    'thumbnail_path' => $tpsmipageVideo->thumbnail_path,
                    'overlay_enabled' => (bool) $tpsmipageVideo->overlay_enabled,
                    'overlay_image_path' => $tpsmipageVideo->overlay_image_path,
                    'is_active' => (bool) $tpsmipageVideo->is_active,
                ]
                : null,
            'topoffroadPageVideo' => $topoffroadpageVideo
                ? [
                    'id' => $topoffroadpageVideo->id,
                    'title' => $topoffroadpageVideo->title,
                    'video_url' => $topoffroadpageVideo->video_url,
                    'video_path' => $topoffroadpageVideo->video_path,
                    'thumbnail_path' => $topoffroadpageVideo->thumbnail_path,
                    'overlay_enabled' => (bool) $topoffroadpageVideo->overlay_enabled,
                    'overlay_image_path' => $topoffroadpageVideo->overlay_image_path,
                    'is_active' => (bool) $topoffroadpageVideo->is_active,
                ]
                : null,
        ];
    }
}
