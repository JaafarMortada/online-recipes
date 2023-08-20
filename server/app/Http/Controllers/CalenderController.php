<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalenderController extends Controller
{
    public function getPlans(){
        
        $plans = Auth::user()->plans;
        $plans_data = $plans->map(function ($plan) {
            return [
                "title" => $plan->meal,
                "date" => $plan->date,
            ];
        });
        return response()->json(["events" => $plans_data]);
    }
    public function setPlan(Request $request){
        
        $user = Auth::user();

        if (is_null($user)){
            return response()->json(["message" => 'failed']);
        }
        $new_event = new Plan;
        $new_event->user_id = $user->id;
        $new_event->meal = $request->meal;
        $new_event->date = $request->date;
        $new_event->save();
        return response()->json(["events" => $new_event]);
    }
}
