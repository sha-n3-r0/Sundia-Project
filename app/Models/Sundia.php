<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sundia extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo_path',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];
}

