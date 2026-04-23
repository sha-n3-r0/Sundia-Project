<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'logo_path',
        'about_text',
        'contact_email_primary',
        'contact_phone',
        'contact_email_secondary',
        'contact_company_label',
    ];
}

