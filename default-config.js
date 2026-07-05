const defaultConfig = {
  "plan": {
    "Monday": {
      "location": "Gym ZRH-100",
      "focus": "Push (Chest, Shoulders, Triceps)",
      "warmup": [
        { "imgID": "assault_airbike", "name": "Assault AirBike", "details": "5 min. Low intensity to raise core temperature.", "videoId": "KC-ZSfOmXgE" },
        { "imgID": "arm_circles_and_swings", "name": "Arm Circles & Swings", "details": "30s forward, 30s backward. Lubricates shoulder joints.", "videoId": "" },
        { "imgID": "trx_i_y_t_raises", "name": "TRX I-Y-T Raises", "details": "10 reps each. Activates lower traps and rear delts.", "videoId": "nqEZs8tWn-M" },
        { "imgID": "empty_barbell_bench_press", "name": "Empty Barbell Bench Press", "details": "2 sets of 10-15 reps. Establishes pressing groove.", "videoId": "hWbUlkb5Ms4" }
      ],
      "exercises": [
        { "imgID": "barbell_bench_press", "name": "Barbell Bench Press", "sets": "4 sets of 6-8 reps", "equipment": "Barbell & Flat Bench", "videoId": "hWbUlkb5Ms4" },
        { "imgID": "keiser_cable_incline_press", "name": "Keiser Cable Incline Press", "sets": "3 sets of 8-10 reps", "equipment": "Keiser Machine & Incline Bench", "videoId": "1O_pCbzNUiU" },
        { "imgID": "kettlebell_shoulder_press", "name": "Kettlebell Shoulder Press", "sets": "3 sets of 10 reps", "equipment": "Kettlebells", "videoId": "6fUrgob01UQ" },
        { "imgID": "keiser_cable_lateral_raises", "name": "Keiser Cable Lateral Raises", "sets": "3 sets of 12-15 reps", "equipment": "Keiser Machine", "videoId": "lMJUXEvcMkQ" },
        { "imgID": "keiser_cable_chest_fly", "name": "Keiser Cable Chest Fly", "sets": "3 sets of 12-15 reps", "equipment": "Keiser Functional Trainer", "videoId": "I-Ue34qLxc4" },
        { "imgID": "tricep_pushdown", "name": "Tricep Pushdown", "sets": "3 sets of 12 reps", "equipment": "Keiser Column (Rope)", "videoId": "7R88yqmcGrw" },
        { "imgID": "overhead_rope_extension", "name": "Overhead Rope Extension", "sets": "3 sets of 12 reps", "equipment": "Keiser Column (Rope)", "videoId": "9Ark9S11uXw" },
        { "imgID": "cardio_assault_airbike", "name": "Cardio: Assault AirBike", "sets": "15-20 mins moderate pace", "equipment": "AssaultBike", "videoId": "KC-ZSfOmXgE" }
      ]
    },
    "Tuesday": {
      "location": "Gym BRA",
      "focus": "Pull (Back, Biceps)",
      "warmup": [
        { "imgID": "stationary_bike", "name": "Stationary Bike", "details": "5 min. Increases heart rate.", "videoId": "" },
        { "imgID": "cat_cow_stretch", "name": "Cat-Cow Stretch", "details": "10 reps. Loosens thoracic and lumbar spine.", "videoId": "LIVJZZyZ2qM" },
        { "imgID": "empty_barbell_deadlift", "name": "Empty Barbell Deadlift", "details": "1 set of 10 reps. Primes the hip hinge pattern.", "videoId": "ZaTM37cfiDs" }
      ],
      "exercises": [
        { "imgID": "deadlift", "name": "Deadlift", "sets": "3 sets of 5 reps", "equipment": "Barbell & Plates", "videoId": "ZaTM37cfiDs" },
        { "imgID": "pull_ups_or_assisted", "name": "Pull-ups (or Assisted)", "sets": "3 sets to Max reps", "equipment": "Cable Rig Pull-up Bar", "videoId": "OEXosPwzFdc" },
        { "imgID": "lat_pulldown", "name": "Lat Pulldown", "sets": "3 sets of 10 reps", "equipment": "Precor Lat Pulldown Machine", "videoId": "SALxEARiMkw" },
        { "imgID": "seated_cable_row", "name": "Seated Cable Row", "sets": "3 sets of 10 reps", "equipment": "Adjustable Cable Column", "videoId": "vwHG9Jfu4sw" },
        { "imgID": "face_pull", "name": "Face Pull", "sets": "3 sets of 15 reps", "equipment": "Adjustable Cable Column (Rope)", "videoId": "IeOqdw9WI90" },
        { "imgID": "barbell_curl", "name": "Barbell Curl", "sets": "3 sets of 10 reps", "equipment": "Barbell", "videoId": "54x2WF1_Suc" },
        { "imgID": "hammer_curl", "name": "Hammer Curl", "sets": "3 sets of 12 reps", "equipment": "Dumbbells", "videoId": "BRVDS6HVR9Q" },
        { "imgID": "cardio_incline_treadmill_walk", "name": "Cardio: Incline Treadmill Walk", "sets": "15-20 mins (Speed: 5-6 km/h, Incline: 8-12%)", "equipment": "Treadmill", "videoId": "" }
      ]
    },
    "Wednesday": {
      "location": "Gym ZRH-100",
      "focus": "Legs + Core",
      "warmup": [
        { "imgID": "assault_airbike", "name": "Assault AirBike", "details": "3-5 mins low intensity.", "videoId": "KC-ZSfOmXgE" },
        { "imgID": "bodyweight_squats", "name": "Bodyweight Squats", "details": "15 reps. Primes knee and hip joints.", "videoId": "my0tLDaWyDU" },
        { "imgID": "bodyweight_walking_lunges", "name": "Bodyweight Walking Lunges", "details": "10 reps per leg. Opens hip flexors.", "videoId": "Pbmj6xPo-Hw" },
        { "imgID": "empty_barbell_back_squat", "name": "Empty Barbell Back Squat", "details": "2 sets of 10 reps. Rehearses the exact movement pattern.", "videoId": "my0tLDaWyDU" }
      ],
      "exercises": [
        { "imgID": "back_squat", "name": "Back Squat", "sets": "4 sets of 8 reps", "equipment": "Eleiko Half Rack & Barbell", "videoId": "my0tLDaWyDU" },
        { "imgID": "romanian_deadlift", "name": "Romanian Deadlift", "sets": "3 sets of 10 reps", "equipment": "Barbell & Plates", "videoId": "ZEnWV4kguKc" },
        { "imgID": "kettlebell_goblet_squats", "name": "Kettlebell Goblet Squats", "sets": "3 sets of 12 reps", "equipment": "Kettlebell", "videoId": "Pbmj6xPo-Hw" },
        { "imgID": "kettlebell_walking_lunges", "name": "Kettlebell Walking Lunges", "sets": "3 sets of 12 reps each leg", "equipment": "Kettlebells", "videoId": "Pbmj6xPo-Hw" },
        { "imgID": "leg_curl", "name": "Leg Curl", "sets": "3 sets of 12 reps", "equipment": "BLK BOX Leg Curl Machine", "videoId": "_lgE0gPvbik" },
        { "imgID": "standing_calf_raises", "name": "Standing Calf Raises", "sets": "4 sets of 15 reps", "equipment": "Barbell or Kettlebells", "videoId": "" },
        { "imgID": "core_plank", "name": "Core: Plank", "sets": "3 sets of 1 minute", "equipment": "Mat", "videoId": "" },
        { "imgID": "core_hanging_leg_raise", "name": "Core: Hanging Leg Raise", "sets": "3 sets of 12 reps", "equipment": "Eleiko Rack Pull-up Bar", "videoId": "Pr1ieGZ5atk" },
        { "imgID": "core_russian_twist", "name": "Core: Russian Twist", "sets": "3 sets of 20 reps", "equipment": "Medicine Ball", "videoId": "wkD8rjkodUI" },
        { "imgID": "cardio_skierg", "name": "Cardio: SkiErg", "sets": "15 mins moderate pace", "equipment": "SkiErg", "videoId": "KC-ZSfOmXgE" }
      ]
    },
    "Thursday": {
      "location": "Gym BRA",
      "focus": "Push (Variation)",
      "warmup": [
        { "imgID": "treadmill_brisk_walk", "name": "Treadmill Brisk Walk", "details": "3-5 mins.", "videoId": "" },
        { "imgID": "arm_circles", "name": "Arm Circles", "details": "30s forward, 30s backward.", "videoId": "" },
        { "imgID": "band_pull_aparts", "name": "Band Pull-aparts", "details": "15 reps using the green resistance band.", "videoId": "stwYTTPXubo" },
        { "imgID": "empty_barbell_incline_press", "name": "Empty Barbell Incline Press", "details": "2 sets of 10 reps.", "videoId": "hWbUlkb5Ms4" }
      ],
      "exercises": [
        { "imgID": "incline_barbell_press", "name": "Incline Barbell Press", "sets": "4 sets of 8 reps", "equipment": "Barbell & Squat Rack", "videoId": "hWbUlkb5Ms4" },
        { "imgID": "flat_dumbbell_press", "name": "Flat Dumbbell Press", "sets": "3 sets of 10 reps", "equipment": "Dumbbells & Flat Bench", "videoId": "" },
        { "imgID": "arnold_press", "name": "Arnold Press", "sets": "3 sets of 10 reps", "equipment": "Dumbbells & Bench", "videoId": "Tux8PGVa9wQ" },
        { "imgID": "cable_lateral_raise", "name": "Cable Lateral Raise", "sets": "3 sets of 15 reps", "equipment": "Adjustable Cable Column", "videoId": "lMJUXEvcMkQ" },
        { "imgID": "incline_dumbbell_flyes", "name": "Incline Dumbbell Flyes", "sets": "3 sets of 12 reps", "equipment": "Dumbbells & Incline Bench", "videoId": "idAvu2HvqSQ" },
        { "imgID": "skull_crushers", "name": "Skull Crushers", "sets": "3 sets of 10 reps", "equipment": "Straight Barbell or Dumbbells", "videoId": "" },
        { "imgID": "rope_pushdown", "name": "Rope Pushdown", "sets": "3 sets of 12 reps", "equipment": "Adjustable Cable Column (Rope)", "videoId": "7R88yqmcGrw" },
        { "imgID": "cardio_incline_treadmill_walk", "name": "Cardio: Incline Treadmill Walk", "sets": "15-20 mins", "equipment": "Treadmill", "videoId": "" }
      ]
    },
    "Friday": {
      "location": "Gym BRA",
      "focus": "Pull (Variation)",
      "warmup": [
        { "imgID": "stationary_bike", "name": "Stationary Bike", "details": "3-5 mins. Increases core temperature.", "videoId": "" },
        { "imgID": "cat_cow_stretch", "name": "Cat-Cow Stretch", "details": "10 reps.", "videoId": "LIVJZZyZ2qM" },
        { "imgID": "light_lat_pulldown", "name": "Light Lat Pulldown", "details": "15 reps with very light weight on the machine.", "videoId": "SALxEARiMkw" },
        { "imgID": "empty_barbell_row", "name": "Empty Barbell Row", "details": "1 set of 15 reps.", "videoId": "Nqh7q3zDCoQ" }
      ],
      "exercises": [
        { "imgID": "barbell_row", "name": "Barbell Row", "sets": "4 sets of 8 reps", "equipment": "Barbell", "videoId": "Nqh7q3zDCoQ" },
        { "imgID": "wide_grip_lat_pulldown", "name": "Wide-Grip Lat Pulldown", "sets": "3 sets of 10 reps", "equipment": "Precor Lat Pulldown Machine", "videoId": "SALxEARiMkw" },
        { "imgID": "incline_bench_dumbbell_row", "name": "Incline Bench Dumbbell Row", "sets": "3 sets of 10 reps", "equipment": "Dumbbells & Incline Bench", "videoId": "" },
        { "imgID": "rear_delt_fly", "name": "Rear Delt Fly", "sets": "3 sets of 15 reps", "equipment": "Dumbbells", "videoId": "IeOqdw9WI90" },
        { "imgID": "straight_barbell_or_dumbbell_curl", "name": "Straight Barbell or Dumbbell Curl", "sets": "3 sets of 10 reps", "equipment": "Barbell or Dumbbells", "videoId": "54x2WF1_Suc" },
        { "imgID": "incline_dumbbell_curl", "name": "Incline Dumbbell Curl", "sets": "3 sets of 12 reps", "equipment": "Dumbbells & Incline Bench", "videoId": "" },
        { "imgID": "dumbbell_shrugs", "name": "Dumbbell Shrugs", "sets": "3 sets of 15 reps", "equipment": "Dumbbells", "videoId": "" },
        { "imgID": "cardio_incline_treadmill_walk", "name": "Cardio: Incline Treadmill Walk", "sets": "15-20 mins", "equipment": "Treadmill", "videoId": "" }
      ]
    },
    "Saturday": {
      "location": "Gym ZRH-100",
      "focus": "Legs + Conditioning",
      "warmup": [
        { "imgID": "concept2_skierg", "name": "Concept2 SkiErg", "details": "3-5 mins to warm up full body.", "videoId": "KC-ZSfOmXgE" },
        { "imgID": "worlds_greatest_stretch", "name": "World's Greatest Stretch", "details": "5 reps per side to open hips.", "videoId": "LIVJZZyZ2qM" },
        { "imgID": "light_kettlebell_goblet_squat", "name": "Light Kettlebell Goblet Squat", "details": "15 reps to prime upright torso positioning.", "videoId": "Pbmj6xPo-Hw" },
        { "imgID": "empty_barbell_front_squat", "name": "Empty Barbell Front Squat", "details": "2 sets of 10 reps.", "videoId": "my0tLDaWyDU" }
      ],
      "exercises": [
        { "imgID": "front_squat", "name": "Front Squat", "sets": "3 sets of 8 reps", "equipment": "Eleiko Half Rack & Barbell", "videoId": "my0tLDaWyDU" },
        { "imgID": "bulgarian_split_squat", "name": "Bulgarian Split Squat", "sets": "3 sets of 10 reps each leg", "equipment": "Kettlebells & Bench", "videoId": "lG3MsPmEQQk" },
        { "imgID": "hip_thrust", "name": "Hip Thrust", "sets": "3 sets of 10 reps", "equipment": "Barbell & Bench", "videoId": "pF17m_CXfL0" },
        { "imgID": "leg_extension", "name": "Leg Extension", "sets": "3 sets of 12 reps", "equipment": "BLK BOX Leg Extension", "videoId": "uM86QE59Tgc" },
        { "imgID": "seated_leg_curl", "name": "Seated Leg Curl", "sets": "3 sets of 12 reps", "equipment": "BLK BOX Leg Curl", "videoId": "_lgE0gPvbik" },
        { "imgID": "seated_calf_raise", "name": "Seated Calf Raise", "sets": "4 sets of 15 reps", "equipment": "Bench, Bumper Plate & Kettlebells", "videoId": "" },
        { "imgID": "hiit_cardio", "name": "HIIT Cardio (AssaultBike Sprints)", "sets": "8-10 rounds: 30s max effort sprint / 90s slow recovery", "equipment": "AssaultBike", "videoId": "KC-ZSfOmXgE" }
      ]
    },
    "Sunday": {
      "location": "Home / Outdoors",
      "focus": "Recovery",
      "warmup": [],
      "exercises": [
        { "imgID": "walking", "name": "Walking", "sets": "45-60 mins", "equipment": "Bodyweight", "videoId": "" },
        { "imgID": "full_body_stretching", "name": "Full-body Stretching", "sets": "15 minutes", "equipment": "Mat", "videoId": "KrUnq66qn_k" },
        { "imgID": "foam_rolling_or_mobility_work", "name": "Foam Rolling or Mobility Work", "sets": "As needed", "equipment": "Foam Roller", "videoId": "Oz4xHEgMaLY" }
      ]
    }
  }
};