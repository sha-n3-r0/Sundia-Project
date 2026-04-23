<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\HomepageVideoController;
use App\Http\Controllers\Admin\SiampageVideoController;
use App\Http\Controllers\Admin\MissionVisionController;
use App\Http\Controllers\Admin\SubsidiaryController;
use App\Http\Controllers\Admin\TeamMemberController as AdminTeamMemberController;
use App\Http\Controllers\Admin\TrustedCompanyController;
use App\Http\Controllers\Admin\CareerCultureCardController;
use App\Http\Controllers\Admin\CareerJobController;
use App\Http\Controllers\Admin\ServiceCardController;
use App\Http\Controllers\Admin\BackgroundPictureController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\ContactInfoController as PublicContactInfoController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\TrustedCompanyController as PublicTrustedCompanyController;
use App\Http\Controllers\SiamProductCategoryController;
use App\Http\Controllers\SiamCategoryProductController;
use App\Http\Controllers\TopoffroadProductsController;
use App\Http\Controllers\TpsmiProductsController;
use App\Http\Controllers\VacuumformedplasticController;
use App\Http\Controllers\SiamController;
use App\Http\Controllers\TopoffroadController;
use App\Http\Controllers\TpsmiController;
use App\Http\Controllers\SundiaController;
use App\Http\Controllers\UpcomingEventController;
use App\Models\MissionVision;
use App\Models\ContactInfo;
use App\Models\Siam;
use App\Models\Subsidiary;
use App\Models\Sundia;
use App\Models\SiamProductCategory;
use App\Models\Topoffroad;
use App\Models\TopoffroadProducts;
use App\Models\Tpsmi;
use App\Models\TpsmiProducts;
use App\Models\Vacuumformedplastic;
use App\Models\CareerCultureCard;
use App\Models\CareerJob;
use App\Models\TeamMember;
use App\Models\TrustedCompany;
use App\Models\UpcomingEvent;
use App\Models\ServiceCard;
use App\Models\BackgroundPicture;
use App\Support\BackgroundPictureData;
use App\Support\PublicUrl;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    $sundia = Sundia::first();
    $sundiaProps = $sundia
        ? [
            'id' => $sundia->id,
            'logo_path' => PublicUrl::web($sundia->logo_path),
            'content' => $sundia->content,
        ]
        : null;
    $missionVision = MissionVision::query()->first();
    $subsidiaries = Subsidiary::query()
        ->active()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (Subsidiary $s) => [
            'id' => $s->id,
            'name' => $s->name,
            'description' => $s->description,
            'logo_path' => PublicUrl::web($s->logo_path),
            'background_path' => PublicUrl::web($s->background_path),
            'display_style' => $s->display_style,
            'display_order' => (int) $s->display_order,
        ]);

    $teamMembers = TeamMember::query()
        ->active()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (TeamMember $m) => [
            'id' => $m->id,
            'name' => $m->name,
            'title' => $m->title,
            'company' => $m->company,
            'profile_image_path' => PublicUrl::web($m->profile_image_path),
            'company_logo' => $m->company_logo,
        ]);

    $trustedCompanies = Schema::hasTable('trusted_companies')
        ? TrustedCompany::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (TrustedCompany $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'logo_path' => PublicUrl::web($c->logo_path),
            ])
        : collect();

    $contactInfos = Schema::hasTable('contact_infos')
        ? ContactInfo::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (ContactInfo $i) => [
                'id' => $i->id,
                'type' => $i->type,
                'title' => $i->title,
                'value' => $i->value,
                'icon' => $i->icon,
                'display_order' => (int) $i->display_order,
            ])
        : collect();

    $upcomingEvents = Schema::hasTable('upcoming_events')
        ? UpcomingEvent::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (UpcomingEvent $e) => [
                'id' => $e->id,
                'title' => $e->title,
                'location' => $e->location,
                'month_label' => $e->month_label,
                'day_label' => $e->day_label,
            ])
        : collect();

    $backgroundPicture = Schema::hasTable('background_pictures')
        ? BackgroundPictureData::payloadForPage(BackgroundPicture::where('page_name', 'Home')->first(), 'Home')
        : BackgroundPictureData::payloadForPage(null, 'Home');

    return Inertia::render('Welcome', [
        'appName' => config('app.name', 'Laravel'),
        'sundia' => $sundiaProps,
        'upcomingEvents' => $upcomingEvents,
        'missionVision' => $missionVision ? [
            'mission_text' => $missionVision->mission_text,
            'vision_text' => $missionVision->vision_text,
        ] : null,
        'subsidiaries' => $subsidiaries,
        'teamMembers' => $teamMembers,
        'trustedCompanies' => $trustedCompanies,
        'contactInfos' => $contactInfos,
        'backgroundPicture' => $backgroundPicture,
    ]);
})->name('home');

Route::get('/siam', function () {
    $siam = Schema::hasTable('siams') ? Siam::first() : null;
    $siamProductCategories = Schema::hasTable('siam_product_categories')
        ? SiamProductCategory::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->with(['activeProducts' => fn ($q) => $q->orderBy('display_order')->orderBy('id')])
            ->get()
            ->map(fn (SiamProductCategory $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'card_description' => $c->card_description,
                'card_image_path' => PublicUrl::web($c->card_image_path),
                'modal_short_description' => $c->modal_short_description,
                'display_order' => (int) $c->display_order,
                'is_active' => (bool) $c->is_active,
                'products' => $c->activeProducts->map(fn ($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'image_path' => PublicUrl::web($p->image_path),
                    'display_order' => (int) $p->display_order,
                    'is_active' => (bool) $p->is_active,
                ])->values(),
            ])
        : collect();

    $serviceCards = Schema::hasTable('service_cards')
        ? ServiceCard::active()->ordered()->get()->map(fn ($card) => [
            'id' => $card->id,
            'title' => $card->title,
            'description' => $card->description,
            'image_path' => $card->image_path
                ? PublicUrl::web(
                    preg_match('#^/?storage/#', str_replace('\\', '/', $card->image_path))
                        ? str_replace('\\', '/', $card->image_path)
                        : 'storage/' . ltrim(str_replace('\\', '/', $card->image_path), '/')
                )
                : null,
            'alt_text' => $card->alt_text,
            'sort_order' => (int) $card->sort_order,
            'is_active' => (bool) $card->is_active,
        ])
        : collect();

    $backgroundPicture = Schema::hasTable('background_pictures')
        ? BackgroundPictureData::payloadForPage(BackgroundPicture::where('page_name', 'Siam')->first(), 'Siam')
        : BackgroundPictureData::payloadForPage(null, 'Siam');

    return Inertia::render('Siam', [
        'siam' => $siam,
        'siamProductCategories' => $siamProductCategories,
        'serviceCards' => $serviceCards,
        'backgroundPicture' => $backgroundPicture,
    ]);
})->name('siam');

Route::get('/tpsmi', function () {
    $tpsmi = Schema::hasTable('tpsmis') ? Tpsmi::first() : null;
    $tpsmiProducts = Schema::hasTable('tpsmi_products')
        ? TpsmiProducts::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (TpsmiProducts $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();
    $vacuumformedplastics = Schema::hasTable('vacuumformedplastics')
        ? Vacuumformedplastic::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Vacuumformedplastic $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();

    $backgroundPicture = Schema::hasTable('background_pictures')
        ? BackgroundPictureData::payloadForPage(BackgroundPicture::where('page_name', 'Tpsmi')->first(), 'Tpsmi')
        : BackgroundPictureData::payloadForPage(null, 'Tpsmi');

    return Inertia::render('Tpsmi', [
        'tpsmi' => $tpsmi,
        'tpsmiProducts' => $tpsmiProducts,
        'vacuumformedplastics' => $vacuumformedplastics,
        'backgroundPicture' => $backgroundPicture,
    ]);
})->name('tpsmi');

Route::get('/top-offroad', function () {
    $topoffroad = Schema::hasTable('topoffroads') ? Topoffroad::first() : null;
    $topoffroadProducts = Schema::hasTable('topoffroad_products')
        ? TopoffroadProducts::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (TopoffroadProducts $p) => [
                'id' => $p->id,
                'category' => $p->category ?? 'car-accessories',
                'title' => $p->title,
                'description' => $p->description,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();

    $backgroundPicture = Schema::hasTable('background_pictures')
        ? BackgroundPictureData::payloadForPage(BackgroundPicture::where('page_name', 'Top offroad')->first(), 'Top offroad')
        : BackgroundPictureData::payloadForPage(null, 'Top offroad');

    return Inertia::render('TopOffroad', [
        'topoffroad' => $topoffroad,
        'topoffroadProducts' => $topoffroadProducts,
        'backgroundPicture' => $backgroundPicture,
    ]);
})->name('top-offroad');

Route::get('/careers', [CareersController::class, 'index'])->name('careers');

Route::get('/about', function () {
    $sundia = Sundia::first();
    $sundiaProps = $sundia
        ? [
            'id' => $sundia->id,
            'logo_path' => PublicUrl::web($sundia->logo_path),
            'content' => $sundia->content,
        ]
        : null;

    return Inertia::render('About', [
        'sundia' => $sundiaProps,
    ]);
})->name('about');

Route::get('/products', function () {
    $sundia = Sundia::first();
    $sundiaProps = $sundia
        ? [
            'id' => $sundia->id,
            'logo_path' => PublicUrl::web($sundia->logo_path),
            'content' => $sundia->content,
        ]
        : null;

    return Inertia::render('Products', [
        'sundia' => $sundiaProps,
    ]);
})->name('products');

Route::get('/contact', function () {
    $sundia = Sundia::first();
    $sundiaProps = $sundia
        ? [
            'id' => $sundia->id,
            'logo_path' => PublicUrl::web($sundia->logo_path),
            'content' => $sundia->content,
        ]
        : null;

    return Inertia::render('Contact', [
        'sundia' => $sundiaProps,
    ]);
})->name('contact');

Route::get('/team', function () {
    $teamMembers = \App\Models\TeamMember::query()
        ->active()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (\App\Models\TeamMember $m) => [
            'id' => $m->id,
            'name' => $m->name,
            'title' => $m->title,
            'company' => $m->company,
            'profile_image_path' => \App\Support\PublicUrl::web($m->profile_image_path),
            'company_logo' => $m->company_logo,
        ]);

    return \Inertia\Inertia::render('Team', [
        'teamMembers' => $teamMembers,
    ]);
})->name('team');

Route::get('/dashboard', function () {
    $sundia = Sundia::first();
    $sundiaProps = $sundia
        ? [
            'id' => $sundia->id,
            'logo_path' => PublicUrl::web($sundia->logo_path),
            'content' => $sundia->content,
        ]
        : null;
    $siam = Schema::hasTable('siams') ? Siam::first() : null;
    $tpsmi = Schema::hasTable('tpsmis') ? Tpsmi::first() : null;
    $topoffroad = Schema::hasTable('topoffroads') ? Topoffroad::first() : null;
    $missionVision = MissionVision::query()->first();
    $subsidiaries = Subsidiary::query()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (Subsidiary $s) => [
            'id' => $s->id,
            'name' => $s->name,
            'description' => $s->description,
            'logo_path' => PublicUrl::web($s->logo_path),
            'background_path' => PublicUrl::web($s->background_path),
            'display_style' => $s->display_style,
            'display_order' => (int) $s->display_order,
            'is_active' => (bool) $s->is_active,
        ]);

    $teamMembers = TeamMember::query()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (TeamMember $m) => [
            'id' => $m->id,
            'name' => $m->name,
            'title' => $m->title,
            'company' => $m->company,
            'profile_image_path' => PublicUrl::web($m->profile_image_path),
            'company_logo' => $m->company_logo,
            'display_order' => (int) $m->display_order,
            'is_active' => (bool) $m->is_active,
        ]);

    $trustedCompanies = TrustedCompany::query()
        ->orderBy('display_order')
        ->orderBy('id')
        ->get()
        ->map(fn (TrustedCompany $c) => [
            'id' => $c->id,
            'name' => $c->name,
            'logo_path' => PublicUrl::web($c->logo_path),
            'display_order' => (int) $c->display_order,
            'is_active' => (bool) $c->is_active,
        ]);

    $contactInfos = Schema::hasTable('contact_infos')
        ? ContactInfo::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (ContactInfo $i) => [
                'id' => $i->id,
                'type' => $i->type,
                'title' => $i->title,
                'value' => $i->value,
                'icon' => $i->icon,
                'display_order' => (int) $i->display_order,
                'is_active' => (bool) $i->is_active,
            ])
        : collect();

    $siamProductCategories = Schema::hasTable('siam_product_categories')
        ? SiamProductCategory::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->with(['products' => fn ($q) => $q->orderBy('display_order')->orderBy('id')])
            ->get()
            ->map(fn (SiamProductCategory $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'card_description' => $c->card_description,
                'card_image_path' => PublicUrl::web($c->card_image_path),
                'modal_short_description' => $c->modal_short_description,
                'display_order' => (int) $c->display_order,
                'is_active' => (bool) $c->is_active,
                'products' => $c->products->map(fn ($p) => [
                    'id' => $p->id,
                    'siam_product_category_id' => $c->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'image_path' => PublicUrl::web($p->image_path),
                    'display_order' => (int) $p->display_order,
                    'is_active' => (bool) $p->is_active,
                ])->values(),
            ])
        : collect();

    $serviceCards = Schema::hasTable('service_cards')
        ? ServiceCard::ordered()->get()->map(fn ($card) => [
            'id' => $card->id,
            'title' => $card->title,
            'description' => $card->description,
            'image_path' => $card->image_path
                ? PublicUrl::web(
                    preg_match('#^/?storage/#', str_replace('\\', '/', $card->image_path))
                        ? str_replace('\\', '/', $card->image_path)
                        : 'storage/' . ltrim(str_replace('\\', '/', $card->image_path), '/')
                )
                : null,
            'alt_text' => $card->alt_text,
            'sort_order' => (int) $card->sort_order,
            'is_active' => (bool) $card->is_active,
        ])
        : collect();

    $tpsmiProducts = Schema::hasTable('tpsmi_products')
        ? TpsmiProducts::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (TpsmiProducts $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();
    $vacuumformedplastics = Schema::hasTable('vacuumformedplastics')
        ? Vacuumformedplastic::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Vacuumformedplastic $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();
    $topoffroadProducts = Schema::hasTable('topoffroad_products')
        ? TopoffroadProducts::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (TopoffroadProducts $p) => [
                'id' => $p->id,
                'category' => $p->category ?? 'car-accessories',
                'title' => $p->title,
                'description' => $p->description,
                'image_path' => $p->image_path,
                'display_order' => (int) $p->display_order,
                'is_active' => (bool) $p->is_active,
            ])
        : collect();

    $upcomingEvents = Schema::hasTable('upcoming_events')
        ? UpcomingEvent::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (UpcomingEvent $e) => [
                'id' => $e->id,
                'title' => $e->title,
                'location' => $e->location,
                'month_label' => $e->month_label,
                'day_label' => $e->day_label,
                'display_order' => (int) $e->display_order,
                'is_active' => (bool) $e->is_active,
            ])
        : collect();

    $careersCultureCards = Schema::hasTable('career_culture_cards')
        ? CareerCultureCard::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (CareerCultureCard $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'body' => $c->body,
                'image_path' => $c->image_path,
                'display_order' => (int) $c->display_order,
                'is_active' => (bool) $c->is_active,
            ])
        : collect();

    $careersJobs = Schema::hasTable('career_jobs')
        ? CareerJob::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (CareerJob $j) => [
                'id' => $j->id,
                'title' => $j->title,
                'employment_type' => $j->employment_type,
                'location' => $j->location,
                'summary' => $j->summary,
                'responsibilities' => $j->responsibilities ?? [],
                'icon_variant' => (int) $j->icon_variant,
                'display_order' => (int) $j->display_order,
                'is_active' => (bool) $j->is_active,
            ])
        : collect();

    $backgroundPictures = Schema::hasTable('background_pictures')
        ? BackgroundPictureData::adminCollection(BackgroundPicture::all()->keyBy('page_name'))
        : BackgroundPictureData::adminCollection(collect());

    return Inertia::render('Dashboard', [
        'sundia' => $sundiaProps,
        'siam' => $siam,
        'tpsmi' => $tpsmi,
        'topoffroad' => $topoffroad,
        'missionVision' => $missionVision ? [
            'mission_text' => $missionVision->mission_text,
            'vision_text' => $missionVision->vision_text,
        ] : null,
        'subsidiaries' => $subsidiaries,
        'teamMembers' => $teamMembers,
        'trustedCompanies' => $trustedCompanies,
        'contactInfos' => $contactInfos,
        'siamProductCategories' => $siamProductCategories,
        'serviceCards' => $serviceCards,
        'tpsmiProducts' => $tpsmiProducts,
        'vacuumformedplastics' => $vacuumformedplastics,
        'topoffroadProducts' => $topoffroadProducts,
        'upcomingEvents' => $upcomingEvents,
        'careersCultureCards' => $careersCultureCards,
        'careersJobs' => $careersJobs,
        'backgroundPictures' => $backgroundPictures,
        'careersJobIconOptions' => [
            ['value' => 1, 'label' => 'Document'],
            ['value' => 2, 'label' => 'Check / QA'],
            ['value' => 3, 'label' => 'People / sales'],
            ['value' => 4, 'label' => 'Clock / maintenance'],
        ],
    ]);
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        $backgroundPictures = Schema::hasTable('background_pictures')
            ? BackgroundPictureData::adminCollection(BackgroundPicture::all()->keyBy('page_name'))
            : BackgroundPictureData::adminCollection(collect());
        $vacuumformedplastics = Schema::hasTable('vacuumformedplastics')
            ? Vacuumformedplastic::query()
                ->orderBy('display_order')
                ->orderBy('id')
                ->get()
                ->map(fn (Vacuumformedplastic $p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'image_path' => $p->image_path,
                    'display_order' => (int) $p->display_order,
                    'is_active' => (bool) $p->is_active,
                ])
            : collect();

        return Inertia::render('Admin/Dashboard', [
            'backgroundPictures' => $backgroundPictures,
            'vacuumformedplastics' => $vacuumformedplastics,
        ]);
    })->name('dashboard');

    Route::resource('homepage-videos', HomepageVideoController::class)->except(['show']);
    Route::resource('siampage-videos', SiampageVideoController::class)->except(['show']);

    Route::resource('team-members', AdminTeamMemberController::class)->except(['show', 'create', 'edit']);
    Route::resource('trusted-companies', TrustedCompanyController::class)->except(['show', 'create', 'edit']);

    Route::resource('career-culture-cards', CareerCultureCardController::class)->only(['store', 'update', 'destroy']);
    Route::resource('career-jobs', CareerJobController::class)->only(['store', 'update', 'destroy']);

    Route::resource('service-cards', ServiceCardController::class);

    Route::post('background-pictures', [BackgroundPictureController::class, 'update'])->name('background-pictures.update');

    Route::post('mission-vision', [MissionVisionController::class, 'update'])->name('mission-vision.update');

    // Primary Sundia homepage configuration used by the owner dashboard
    Route::get('/sundia/logo', [SundiaController::class, 'editPrimary'])->name('sundia.logo.edit');
    Route::post('/sundia/logo', [SundiaController::class, 'updatePrimary'])->name('sundia.logo.update');

    // Primary SIAM configuration used by the owner dashboard
    Route::post('/siam', [SiamController::class, 'updatePrimary'])->name('siam.update');

    // Primary TPSMI configuration used by the owner dashboard
    Route::post('/tpsmi', [TpsmiController::class, 'updatePrimary'])->name('tpsmi.update');

    // Primary TOP OFFROAD configuration used by the owner dashboard
    Route::post('/topoffroad', [TopoffroadController::class, 'updatePrimary'])->name('topoffroad.update');

    // Full CRUD API for Sundia homepage configurations
    Route::apiResource('sundia', SundiaController::class)->except(['create', 'edit']);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/subsidiaries', [SubsidiaryController::class, 'store'])->name('subsidiaries.store');
    Route::put('/subsidiaries/{subsidiary}', [SubsidiaryController::class, 'update'])->name('subsidiaries.update');
    Route::delete('/subsidiaries/{subsidiary}', [SubsidiaryController::class, 'destroy'])->name('subsidiaries.destroy');

    Route::post('/team-members', [TeamMemberController::class, 'store'])->name('team-members.store');
    Route::put('/team-members/{teamMember}', [TeamMemberController::class, 'update'])->name('team-members.update');
    Route::delete('/team-members/{teamMember}', [TeamMemberController::class, 'destroy'])->name('team-members.destroy');

    Route::post('/trusted-companies', [PublicTrustedCompanyController::class, 'store'])->name('trusted-companies.store');
    Route::put('/trusted-companies/{trustedCompany}', [PublicTrustedCompanyController::class, 'update'])->name('trusted-companies.update');
    Route::delete('/trusted-companies/{trustedCompany}', [PublicTrustedCompanyController::class, 'destroy'])->name('trusted-companies.destroy');

    Route::post('/contact-infos', [PublicContactInfoController::class, 'store'])->name('contact-infos.store');
    Route::put('/contact-infos/{contactInfo}', [PublicContactInfoController::class, 'update'])->name('contact-infos.update');
    Route::delete('/contact-infos/{contactInfo}', [PublicContactInfoController::class, 'destroy'])->name('contact-infos.destroy');

    Route::post('/upcoming-events', [UpcomingEventController::class, 'store'])->name('upcoming-events.store');
    Route::put('/upcoming-events/{upcomingEvent}', [UpcomingEventController::class, 'update'])->name('upcoming-events.update');
    Route::delete('/upcoming-events/{upcomingEvent}', [UpcomingEventController::class, 'destroy'])->name('upcoming-events.destroy');

    Route::post('/siam-product-categories', [SiamProductCategoryController::class, 'store'])->name('siam-product-categories.store');
    Route::put('/siam-product-categories/{siamProductCategory}', [SiamProductCategoryController::class, 'update'])->name('siam-product-categories.update');
    Route::delete('/siam-product-categories/{siamProductCategory}', [SiamProductCategoryController::class, 'destroy'])->name('siam-product-categories.destroy');

    Route::post('/siam-category-products', [SiamCategoryProductController::class, 'store'])->name('siam-category-products.store');
    Route::put('/siam-category-products/{siamCategoryProduct}', [SiamCategoryProductController::class, 'update'])->name('siam-category-products.update');
    Route::delete('/siam-category-products/{siamCategoryProduct}', [SiamCategoryProductController::class, 'destroy'])->name('siam-category-products.destroy');

    Route::post('/tpsmi-products', [TpsmiProductsController::class, 'store'])->name('tpsmi-products.store');
    Route::put('/tpsmi-products/{tpsmiProduct}', [TpsmiProductsController::class, 'update'])->name('tpsmi-products.update');
    Route::delete('/tpsmi-products/{tpsmiProduct}', [TpsmiProductsController::class, 'destroy'])->name('tpsmi-products.destroy');

    Route::post('/vacuumformedplastics', [VacuumformedplasticController::class, 'store'])->name('vacuumformedplastics.store');
    Route::put('/vacuumformedplastics/{vacuumformedplastic}', [VacuumformedplasticController::class, 'update'])->name('vacuumformedplastics.update');
    Route::delete('/vacuumformedplastics/{vacuumformedplastic}', [VacuumformedplasticController::class, 'destroy'])->name('vacuumformedplastics.destroy');

    Route::post('/topoffroad-products', [TopoffroadProductsController::class, 'store'])->name('topoffroad-products.store');
    Route::put('/topoffroad-products/{topoffroadProduct}', [TopoffroadProductsController::class, 'update'])->name('topoffroad-products.update');
    Route::delete('/topoffroad-products/{topoffroadProduct}', [TopoffroadProductsController::class, 'destroy'])->name('topoffroad-products.destroy');
});

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
| When public/storage is a stale copy instead of a symlink to storage/app/public,
| new uploads exist on disk but are not under public/storage. Apache then forwards
| the request here (file not found). Serve the file from the real public disk.
*/
Route::get('/storage/{path}', function (string $path) {
    $path = str_replace('\\', '/', $path);
    if (str_contains($path, '..')) {
        abort(404);
    }
    if (! Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return response()->file(Storage::disk('public')->path($path));
})->where('path', '.*');

require __DIR__.'/auth.php';
