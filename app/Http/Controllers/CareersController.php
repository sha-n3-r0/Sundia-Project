<?php

namespace App\Http\Controllers;

use App\Models\CareerCultureCard;
use App\Models\CareerJob;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class CareersController extends Controller
{
    private static function defaultCultureCards(): array
    {
        return [
            [
                'id' => '1',
                'title' => 'Empowering Excellence',
                'body' => 'We invest in training, mentorship, and tools so every teammate can grow skills, share ideas, and deliver their best work.',
                'image' => '/coordination.jpg',
            ],
            [
                'id' => '2',
                'title' => 'Elevate Your Work Experience',
                'body' => 'Modern facilities, clear processes, and supportive leadership help you focus on meaningful work in a professional environment.',
                'image' => '/2026 Sundia lobby.png',
            ],
            [
                'id' => '3',
                'title' => 'Cultivating Unity and Respect',
                'body' => 'Team outings, celebrations, and open communication reinforce trust, inclusion, and pride in what we build together.',
                'image' => '/lineup.jpg',
            ],
        ];
    }

    private static function defaultJobs(): array
    {
        return [
            [
                'id' => '1',
                'title' => 'Production Operator',
                'type' => 'Full-time',
                'location' => 'Santa Rosa, Laguna',
                'summary' => 'Support daily production operations to ensure quality, safety, and on-time delivery.',
                'bullets' => ['Follow SOP and safety procedures', 'Perform basic machine operation', 'Maintain clean and organized work areas'],
                'icon_variant' => 1,
            ],
            [
                'id' => '2',
                'title' => 'Quality Assurance Officer',
                'type' => 'Full-time',
                'location' => 'Santa Rosa, Laguna',
                'summary' => 'Monitor product quality and compliance through inspections, documentation, and continuous improvement.',
                'bullets' => ['Conduct incoming and in-process checks', 'Support corrective and preventive actions', 'Maintain quality records'],
                'icon_variant' => 2,
            ],
            [
                'id' => '3',
                'title' => 'Sales Representative',
                'type' => 'Full-time',
                'location' => 'Metro Manila',
                'summary' => 'Build customer relationships, promote Sundia products, and help achieve sales targets.',
                'bullets' => ['Identify customer needs and opportunities', 'Prepare proposals and quotations', 'Coordinate with operations for fulfillment'],
                'icon_variant' => 3,
            ],
            [
                'id' => '4',
                'title' => 'Maintenance Technician',
                'type' => 'Full-time',
                'location' => 'Santa Rosa, Laguna',
                'summary' => 'Ensure equipment readiness through preventive maintenance, troubleshooting, and timely repairs.',
                'bullets' => ['Perform preventive maintenance schedules', 'Troubleshoot equipment and utilities', 'Coordinate repairs to minimize downtime'],
                'icon_variant' => 4,
            ],
        ];
    }

    public function index(): Response
    {
        if (! Schema::hasTable('career_culture_cards') || ! Schema::hasTable('career_jobs')) {
            return Inertia::render('Careers', [
                'careerCultureCards' => self::defaultCultureCards(),
                'careerJobs' => self::defaultJobs(),
            ]);
        }

        $cultureFromDb = CareerCultureCard::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        $jobsFromDb = CareerJob::query()
            ->active()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        // Always reflect the database when tables exist (no fallback to seeded defaults),
        // so empty or inactive-only content does not show stale placeholder data.
        $careerCultureCards = $cultureFromDb
            ->map(fn (CareerCultureCard $c) => [
                'id' => (string) $c->id,
                'title' => $c->title,
                'body' => $c->body,
                'image' => $c->image_path ?? '',
            ])
            ->values()
            ->all();

        $careerJobs = $jobsFromDb
            ->map(fn (CareerJob $j) => [
                'id' => (string) $j->id,
                'title' => $j->title,
                'type' => $j->employment_type,
                'location' => $j->location,
                'summary' => $j->summary,
                'bullets' => $j->responsibilities ?? [],
                'icon_variant' => (int) $j->icon_variant,
            ])
            ->values()
            ->all();

        return Inertia::render('Careers', [
            'careerCultureCards' => $careerCultureCards,
            'careerJobs' => $careerJobs,
        ]);
    }
}
