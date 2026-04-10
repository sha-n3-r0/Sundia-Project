<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SiamProductCategory extends Model
{
    protected $table = 'siam_product_categories';

    protected $fillable = [
        'name',
        'slug',
        'card_description',
        'card_image_path',
        'modal_short_description',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(SiamCategoryProduct::class, 'siam_product_category_id')
            ->orderBy('display_order')
            ->orderBy('id');
    }

    public function activeProducts(): HasMany
    {
        return $this->products()->where('is_active', true);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
