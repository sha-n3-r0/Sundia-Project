<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CareerJob extends Model
{
    protected $fillable = [
        'title',
        'employment_type',
        'location',
        'summary',
        'responsibilities',
        'icon_variant',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'responsibilities' => 'array',
        'icon_variant' => 'integer',
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
