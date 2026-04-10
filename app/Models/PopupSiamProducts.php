<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PopupSiamProducts extends Model
{
    protected $table = 'popup_siam_products';

    protected $fillable = [
        'title',
        'description',
        'image_path',
        'category',
        'short_description',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}

