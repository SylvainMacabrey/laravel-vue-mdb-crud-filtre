<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'authenticate'])
    ->name('auth.authenticate');

Route::get('users', [AuthController::class, 'getUsers'])
    ->name('auth.getUsers')
    ->middleware('auth:sanctum');

Route::apiResource('task', TaskController::class)
    ->middleware('auth:sanctum');

Route::put('task/updateisfinish/{task}', [TaskController::class, 'updateIsFinish'])
    ->name('task.updateIsFinish')
    ->middleware('auth:sanctum');

