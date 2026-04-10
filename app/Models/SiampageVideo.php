<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiampageVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'video_url',
        'video_path',
        'thumbnail_path',
        'overlay_enabled',
        'overlay_image_path',
        'is_active',
    ];

    protected $casts = [
        'overlay_enabled' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getResolvedVideoUrlAttribute(): ?string
    {
        return $this->video_path ?: $this->video_url;
    }
}

