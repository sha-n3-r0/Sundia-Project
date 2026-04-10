<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionVision extends Model
{
    protected $table = 'mission_vision';

    protected $fillable = [
        'mission_text',
        'vision_text',
    ];
}

