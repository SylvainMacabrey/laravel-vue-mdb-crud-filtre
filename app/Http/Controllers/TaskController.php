<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $title = $request->title;
        $due_date = $request->due_date;
        $validation_date = $request->validation_date;
        $is_finish = $request->is_finish;
        $user = $request->user;

        $where = [
            ['title', 'LIKE', $title . '%'],
        ];

        if ($is_finish !== null) {
            array_push($where, ['is_finish', $is_finish]);
        }

        if ($due_date) {
            array_push($where, ['due_date', '<=', $due_date]);
        }
        if ($validation_date) {
            array_push($where, ['validation_date', '<=', $validation_date]);
        }

        $tasks = Task::with('users')
            ->where($where)
            ->whereHas('users', function($query) use ($user) {
                $query->where('name', 'LIKE', $user . '%');
            })
            ->latest()
            ->paginate(5);

        return response()->json([
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {

        $request->validate([
            "title" => "required",
            "due_date" => "required",
            "validation_date" => "required",
        ]);

        $task = Task::create([
            "title" => $request->title,
            "due_date" => $request->due_date,
            "validation_date" => $request->validation_date,
            "is_finish" => false
        ]);

        if (count($request->users) > 0) {
            $task->users()->attach($request->users);
        }

        return response()->json([
            'task' => $task,
            'users' => $task->users()->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json([
            'task' => $task,
            'users' => $task->users()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $request->validate([
            "title" => "required",
            "due_date" => "required",
            "validation_date" => "required",
        ]);

        $task->update($request->only(['title', 'due_date', 'validation_date']));

        if (count($request->users) > 0) {
            $task->users()->sync($request->users);
        }

        return response()->json([
            'task' => $task,
            'users' => $task->users()->get()
        ]);
    }

    /**
     * Update is_finish value
     */
    public function updateIsFinish(Request $request, Task $task): JsonResponse
    {
        $request->validate([
            "is_finish" => 'boolean'
        ]);
        $task->update($request->only(['is_finish']));
        return response()->json([
            'task' => $task
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return response()->json([
            "message" => "Tâche supprimé"
        ]);
    }
}
