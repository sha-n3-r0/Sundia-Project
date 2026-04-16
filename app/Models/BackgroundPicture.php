<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BackgroundPicture extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_name',
        'image_path',
        'image_paths',
    ];

    protected $casts = [
        'image_paths' => 'array',
    ];
}
