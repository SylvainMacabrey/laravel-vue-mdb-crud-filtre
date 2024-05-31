<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(): View
    {
        return view('auth.login');
    }

    public function authenticate(Request $request): JsonResponse
    {

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => "L'email n'existe pas dans notre base de données.",
            ]);
        }

        if (Hash::check($request->password, $user->password)) {
            return response()->json([
                'token' => $user->createToken(time())->plainTextToken,
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'message' => "Le mot de passe est incorrect",
            ]);
        }

    }

    public function getUsers(): JsonResponse
    {
        return response()->json([
            'users' => User::all(),
        ]);
    }

}
