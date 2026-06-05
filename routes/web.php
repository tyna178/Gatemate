<?php

use Illuminate\Support\Facades\Route;

/**
 * React App Routes
 * All routes return the React app view
 */
Route::get('/', function () {
    return view('app');
});

/**
 * Catch-all route for React Router
 * This allows React Router to handle navigation
 */
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
