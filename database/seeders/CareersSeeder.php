<?php

namespace Database\Seeders;

use App\Models\CareerCultureCard;
use App\Models\CareerJob;
use Illuminate\Database\Seeder;

class CareersSeeder extends Seeder
{
    public function run(): void
    {
        if (CareerCultureCard::query()->exists() && CareerJob::query()->exists()) {
            return;
        }

        if (! CareerCultureCard::query()->exists()) {
            $cards = [
                [
                    'title' => 'Empowering Excellence',
                    'body' => 'We invest in training, mentorship, and tools so every teammate can grow skills, share ideas, and deliver their best work.',
                    'image_path' => '/coordination.jpg',
                    'display_order' => 0,
                ],
                [
                    'title' => 'Elevate Your Work Experience',
                    'body' => 'Modern facilities, clear processes, and supportive leadership help you focus on meaningful work in a professional environment.',
                    'image_path' => '/2026 Sundia lobby.png',
                    'display_order' => 1,
                ],
                [
                    'title' => 'Cultivating Unity and Respect',
                    'body' => 'Team outings, celebrations, and open communication reinforce trust, inclusion, and pride in what we build together.',
                    'image_path' => '/lineup.jpg',
                    'display_order' => 2,
                ],
            ];

            foreach ($cards as $row) {
                CareerCultureCard::query()->create($row + ['is_active' => true]);
            }
        }

        if (! CareerJob::query()->exists()) {
            $jobs = [
                [
                    'title' => 'Production Operator',
                    'employment_type' => 'Full-time',
                    'location' => 'Santa Rosa, Laguna',
                    'summary' => 'Support daily production operations to ensure quality, safety, and on-time delivery.',
                    'responsibilities' => [
                        'Follow SOP and safety procedures',
                        'Perform basic machine operation',
                        'Maintain clean and organized work areas',
                    ],
                    'icon_variant' => 1,
                    'display_order' => 0,
                ],
                [
                    'title' => 'Quality Assurance Officer',
                    'employment_type' => 'Full-time',
                    'location' => 'Santa Rosa, Laguna',
                    'summary' => 'Monitor product quality and compliance through inspections, documentation, and continuous improvement.',
                    'responsibilities' => [
                        'Conduct incoming and in-process checks',
                        'Support corrective and preventive actions',
                        'Maintain quality records',
                    ],
                    'icon_variant' => 2,
                    'display_order' => 1,
                ],
                [
                    'title' => 'Sales Representative',
                    'employment_type' => 'Full-time',
                    'location' => 'Metro Manila',
                    'summary' => 'Build customer relationships, promote Sundia products, and help achieve sales targets.',
                    'responsibilities' => [
                        'Identify customer needs and opportunities',
                        'Prepare proposals and quotations',
                        'Coordinate with operations for fulfillment',
                    ],
                    'icon_variant' => 3,
                    'display_order' => 2,
                ],
                [
                    'title' => 'Maintenance Technician',
                    'employment_type' => 'Full-time',
                    'location' => 'Santa Rosa, Laguna',
                    'summary' => 'Ensure equipment readiness through preventive maintenance, troubleshooting, and timely repairs.',
                    'responsibilities' => [
                        'Perform preventive maintenance schedules',
                        'Troubleshoot equipment and utilities',
                        'Coordinate repairs to minimize downtime',
                    ],
                    'icon_variant' => 4,
                    'display_order' => 3,
                ],
            ];

            foreach ($jobs as $row) {
                CareerJob::query()->create($row + ['is_active' => true]);
            }
        }
    }
}
