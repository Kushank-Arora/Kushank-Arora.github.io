const DIET_ARZOO = {
    meta: {
        goal: "FAT LOSS + MUSCLE BUILD (81kg → 71kg)",
        calories: "~2200/day",
        protein: "170g+",
        water: "3.5–4L/day"
    },
    rules: [
        "Pick ONE option from each meal.",
        "Use minimal oil (1–2 tsp per meal).",
        "Fill half your plate with vegetables whenever possible.",
        "Have dinner after your workout.",
        "1 planned flexible meal every week (preferably Saturday dinner or Sunday lunch)."
    ],
    supplements: [
        "Whey Protein (only if needed to hit protein target)",
        "Creatine Monohydrate – 5g daily",
        "Vitamin D3 (if deficient)",
        "Fish Oil (on non-salmon days)",
        "Electrolytes (if sweating heavily)"
    ],
    cookingRules: [
        "Use only 1–2 tsp oil per meal.",
        "Prefer baking, grilling, roasting or air frying.",
        "Add plenty of vegetables.",
        "Use Greek yogurt instead of cream whenever possible.",
        "Season generously with garlic, ginger, herbs, lemon and spices."
    ],
    freeMeal: {
        title: "🍔 Free Meal (Once Every Week)",
        desc: "Instead of a 'cheat meal,' have a planned flex meal. Keep it to one meal, not a whole day. Options include: Homemade chicken burger with baked fries, Thin-crust chicken pizza, Chicken/prawn pasta, or favorite chicken biryani with raita."
    },
    recipes: {
        "Vegetable Poha": {
            ingredients: ["80g Poha", "1 tsp oil", "1 small onion", "½ carrot", "¼ cup peas", "Curry leaves", "Mustard seeds", "Green chilli", "Turmeric, Salt", "Lemon juice", "Coriander"],
            method: ["Wash poha and let it soften.", "Heat oil and add mustard seeds & curry leaves.", "Cook onion and green chilli.", "Add carrots and peas.", "Add turmeric and salt.", "Mix in poha.", "Finish with lemon juice and coriander."]
        },
        "Paneer Besan Chilla": {
            ingredients: ["100g Besan", "Water, Salt, Turmeric, Red chilli powder, Ajwain, Coriander", "100–120g Low-fat Paneer (Stuffing)", "Onion, Coriander, Green chilli (Stuffing)"],
            method: ["Prepare a smooth besan batter.", "Pour onto a hot pan like a pancake.", "Add paneer stuffing.", "Fold and cook until golden on both sides."]
        },
        "Healthy Chicken Kadai": {
            ingredients: ["220g Chicken Breast", "Onion, Tomato, Capsicum", "Ginger Garlic Paste", "Kadai Masala, Turmeric, Red Chilli Powder, Coriander Powder, Garam Masala, Salt", "1 tsp oil"],
            method: ["Cook onions.", "Add ginger garlic paste.", "Add tomatoes and spices.", "Add chicken.", "Cook until done.", "Add capsicum during the last few minutes."]
        },
        "Oven Baked Chicken": {
            ingredients: ["Chicken Breast", "Garlic Powder, Paprika, Oregano, Salt, Pepper", "Lemon Juice", "1 tsp Olive Oil"],
            method: ["Marinate for 30 minutes.", "Bake at 200°C for 20–25 minutes.", "Rest for 5 minutes before serving."]
        },
        "Garlic Lemon Baked Chicken": {
            ingredients: ["Chicken Breast", "Garlic, Garlic Salt, Red Chilli Powder, Oregano, Black Pepper", "Lemon Juice"],
            method: ["Coat chicken well with all ingredients.", "Bake at 200°C for 20–25 minutes.", "Serve with vegetables."]
        },
        "Chicken Curry": {
            ingredients: ["Chicken", "Onion, Tomato", "Ginger Garlic Paste", "Turmeric, Kashmiri Chilli Powder, Coriander Powder, Garam Masala, Salt", "1 tsp oil"],
            method: ["Cook onions.", "Add ginger garlic paste.", "Add tomatoes.", "Add spices.", "Add chicken.", "Add water and simmer until cooked."]
        },
        "Protein Smoothie": {
            ingredients: ["Milk", "Banana", "Whey Protein (Optional)", "Ice"],
            method: ["Blend everything until smooth."]
        },
        "Rajma": {
            ingredients: ["Rajma", "Onion, Tomato", "Ginger Garlic Paste", "Turmeric, Coriander Powder, Kashmiri Chilli, Garam Masala"],
            method: ["Pressure cook rajma.", "Prepare onion-tomato masala.", "Add rajma.", "Simmer for 15–20 minutes."]
        },
        "Chole": {
            ingredients: ["Chickpeas", "Onion, Tomato", "Ginger Garlic Paste", "Chole Masala, Salt"],
            method: ["Pressure cook chickpeas.", "Prepare masala.", "Mix together and simmer."]
        },
        "Palak Paneer": {
            ingredients: ["Spinach", "200g Low-fat Paneer", "Onion, Tomato, Garlic, Ginger, Green Chilli"],
            method: ["Boil spinach and blend.", "Prepare onion-tomato masala.", "Add spinach puree.", "Add paneer.", "Simmer for a few minutes."]
        },
        "Paneer Bhurji": {
            ingredients: ["Paneer", "Onion, Tomato, Capsicum", "Turmeric, Red Chilli Powder, Garam Masala"],
            method: ["Cook vegetables.", "Add crumbled paneer.", "Cook for 5 minutes."]
        },
        "Garlic Lemon Salmon": {
            ingredients: ["Salmon", "Garlic Salt, Red Chilli Powder, Oregano", "Lemon Juice"],
            method: ["Coat salmon with seasoning.", "Bake at 200°C for 12–15 minutes.", "Serve immediately."]
        },
        "Egg Bhurji": {
            ingredients: ["4 Eggs", "Onion, Tomato, Green Chilli", "Turmeric, Coriander"],
            method: ["Cook vegetables.", "Add beaten eggs.", "Scramble until cooked."]
        },
        "Healthy Butter Chicken": {
            ingredients: ["Chicken Breast", "Onion, Tomato, Garlic, Ginger", "1 tsp Butter", "Greek Yogurt", "Kasuri Methi, Garam Masala"],
            method: ["Prepare tomato-onion gravy.", "Add chicken.", "Finish with Greek yogurt instead of cream.", "Sprinkle Kasuri Methi."]
        },
        "Whole Wheat Chicken Pasta": {
            ingredients: ["Whole Wheat Pasta", "Chicken Breast", "Garlic, Onion", "Tomato Puree", "Italian Herbs, Chilli Flakes"],
            method: ["Cook pasta.", "Cook chicken separately.", "Prepare tomato sauce.", "Mix everything together."]
        },
        "Chicken Fried Rice": {
            ingredients: ["Cooked Rice", "Chicken Breast", "Egg (Optional)", "Carrots, Beans, Peas, Garlic", "Light Soy Sauce, Pepper"],
            method: ["Cook chicken.", "Stir-fry vegetables.", "Add rice.", "Add chicken.", "Finish with soy sauce and pepper."]
        },
        "Masala Omelette": {
            ingredients: ["Eggs", "Onion, Tomato, Green Chilli, Coriander", "Salt, Pepper"],
            method: ["Whisk everything together and cook until golden."]
        },
        "Garlic Prawns": {
            ingredients: ["Prawns", "Garlic, Chilli Flakes, Coriander", "½ tsp Butter, ½ tsp Olive Oil", "Lemon"],
            method: ["Cook prawns for 2 minutes per side. Don't overcook."]
        },
        "Healthy Chicken Biryani": {
            ingredients: ["Chicken Breast", "Basmati Rice", "Onion, Tomato, Mint, Coriander", "Ginger Garlic Paste", "Biryani Masala", "Greek Yogurt"],
            method: ["Marinate chicken.", "Cook rice until 70% done.", "Layer rice and chicken.", "Dum cook until fully cooked.", "Use more chicken, less rice and minimal oil."]
        },
        "Paneer Sandwich": {
            ingredients: ["Whole Wheat Bread", "Paneer", "Onion, Tomato", "Green Chutney, Pepper"],
            method: ["Assemble sandwich and toast lightly."]
        },
        "Scrambled Eggs": {
            ingredients: ["Eggs", "Small amount of butter", "Salt, Pepper"],
            method: ["Cook over low heat while gently stirring until soft and creamy."]
        },
        "Yellow Dal Tadka": {
            ingredients: ["50g Chana Dal", "50g Moong Chilka", "Onion, Tomato, Garlic, Ginger, Green Chilli", "Turmeric, Cumin seeds, Coriander powder, Garam Masala", "1 tsp Ghee (for tadka)", "Coriander leaves"],
            method: ["Wash and pressure cook both dals with turmeric and salt.", "In a pan, heat ghee and add cumin seeds.", "Saute garlic, ginger, green chilli, and onions until golden.", "Add tomatoes and dry spices, cook until soft.", "Pour tadka over the boiled dal and garnish with coriander."]
        }
    },
    days: [
        {
            id: "Monday",
            title: "Push (Chicken Day)",
            colorClass: "bg-red-500/20 text-red-400 border-red-500/30",
            icon: "fa-dumbbell",
            meals: [
                
                { type: "Night Snack", options: [
                    { id: "m_ns_1", text: "150g Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] },
                    { id: "m_ns_2", text: "Glass of milk + 2 boiled eggs", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"},{item:"Eggs",qty:2,unit:"pcs"}] }
                ]}
            ]
        },
        {
            id: "Tuesday",
            title: "Vegetarian",
            colorClass: "bg-green-500/20 text-green-400 border-green-500/30",
            icon: "fa-leaf",
            meals: [
                { type: "Breakfast", options: [
                    { id: "t_b_1", text: "Paneer Besan Chilla (3)", recipe: "Paneer Besan Chilla", groceries: [{item:"Besan",qty:100,unit:"g"},{item:"Low-fat Paneer",qty:120,unit:"g"}] },
                    { id: "t_b_2", text: "Vegetable Poha + 200g Greek yogurt", recipe: "Vegetable Poha", groceries: [{item:"Poha",qty:80,unit:"g"},{item:"Greek Yogurt",qty:200,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "t_ms_1", text: "Protein smoothie (Milk + Banana + Whey)", recipe: "Protein Smoothie", groceries: [{item:"Milk",qty:250,unit:"ml"},{item:"Bananas",qty:1,unit:"pc"},{item:"Whey Protein",qty:1,unit:"scoop"}] },
                    { id: "t_ms_2", text: "Greek yogurt + Fruit", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"},{item:"Seasonal Fruits",qty:1,unit:"serving"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "t_l_1", text: "Rajma + 150g rice + Salad", recipe: "Rajma", groceries: [{item:"Rajma",qty:100,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] },
                    { id: "t_l_2", text: "Chole + 2 rotis + Salad", recipe: "Chole", groceries: [{item:"Chickpeas",qty:100,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"},{item:"Salad Veggies",qty:1,unit:"serving"}] }
                ]},
                { type: "Pre-Workout", options: [
                    { id: "t_pw_1", text: "Banana", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"}] },
                    { id: "t_pw_2", text: "Apple + Black coffee", recipe: null, groceries: [{item:"Apples",qty:1,unit:"pc"},{item:"Coffee",qty:1,unit:"serving"}] }
                ]},
                { type: "Dinner", options: [
                    { id: "t_d_1", text: "Palak Paneer (200g paneer) + 2 rotis", recipe: "Palak Paneer", groceries: [{item:"Spinach",qty:1,unit:"bunch"},{item:"Low-fat Paneer",qty:200,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"}] },
                    { id: "t_d_2", text: "Paneer Bhurji + 150g rice + Stir-fried vegetables", recipe: "Paneer Bhurji", groceries: [{item:"Low-fat Paneer",qty:150,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "t_ns_1", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] },
                    { id: "t_ns_2", text: "Glass of milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] }
                ]}
            ]
        },
        {
            id: "Wednesday",
            title: "Legs (Salmon Day)",
            colorClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            icon: "fa-fish",
            meals: [
                { type: "Breakfast", options: [
                    { id: "w_b_1", text: "Oats with milk + Banana + 2 boiled eggs", recipe: null, groceries: [{item:"Oats",qty:50,unit:"g"},{item:"Milk",qty:250,unit:"ml"},{item:"Bananas",qty:1,unit:"pc"},{item:"Eggs",qty:2,unit:"pcs"}] },
                    { id: "w_b_2", text: "Egg Bhurji (4 eggs) + Whole wheat toast", recipe: "Egg Bhurji", groceries: [{item:"Eggs",qty:4,unit:"pcs"},{item:"Whole Wheat Bread",qty:2,unit:"slices"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "w_ms_1", text: "Greek yogurt + Apple", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"},{item:"Apples",qty:1,unit:"pc"}] },
                    { id: "w_ms_2", text: "2 boiled eggs + Orange", recipe: null, groceries: [{item:"Eggs",qty:2,unit:"pcs"},{item:"Oranges",qty:1,unit:"pc"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "w_l_1", text: "Garlic Lemon Salmon (250g) + Roasted potatoes + Salad", recipe: "Garlic Lemon Salmon", groceries: [{item:"Salmon",qty:250,unit:"g"},{item:"Potatoes",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] },
                    { id: "w_l_2", text: "Garlic Lemon Salmon + Rice + Steamed vegetables", recipe: "Garlic Lemon Salmon", groceries: [{item:"Salmon",qty:250,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Pre-Workout", options: [
                    { id: "w_pw_1", text: "3 dates + Coffee", recipe: null, groceries: [{item:"Dates",qty:3,unit:"pcs"},{item:"Coffee",qty:1,unit:"serving"}] },
                    { id: "w_pw_2", text: "Banana", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"}] }
                ]},
                { type: "Dinner", options: [
                    { id: "w_d_1", text: "Chicken Curry (200g) + 2 rotis", recipe: "Chicken Curry", groceries: [{item:"Chicken Breast",qty:200,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"}] },
                    { id: "w_d_2", text: "Chicken Kadai + Rice + Vegetables", recipe: "Healthy Chicken Kadai", groceries: [{item:"Chicken Breast",qty:200,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "w_ns_1", text: "Glass of milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] },
                    { id: "w_ns_2", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] }
                ]}
            ]
        },
        {
            id: "Thursday",
            title: "Vegetarian",
            colorClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            icon: "fa-leaf",
            meals: [
                { type: "Breakfast", options: [
                    { id: "th_b_1", text: "Paneer Besan Chilla", recipe: "Paneer Besan Chilla", groceries: [{item:"Besan",qty:100,unit:"g"},{item:"Low-fat Paneer",qty:120,unit:"g"}] },
                    { id: "th_b_2", text: "Paneer Sandwich (Whole wheat bread)", recipe: "Paneer Sandwich", groceries: [{item:"Whole Wheat Bread",qty:2,unit:"slices"},{item:"Low-fat Paneer",qty:100,unit:"g"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "th_ms_1", text: "Paneer cubes (100g)", recipe: null, groceries: [{item:"Low-fat Paneer",qty:100,unit:"g"}] },
                    { id: "th_ms_2", text: "Greek yogurt + Fruit", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"},{item:"Seasonal Fruits",qty:1,unit:"serving"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "th_l_1", text: "Chole + Rice + Salad", recipe: "Chole", groceries: [{item:"Chickpeas",qty:100,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] },
                    { id: "th_l_2", text: "Dal Tadka + 2 rotis + Mixed vegetables", recipe: null, groceries: [{item:"Lentils (Dal)",qty:100,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Pre-Workout", options: [
                    { id: "th_pw_1", text: "Banana", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"}] },
                    { id: "th_pw_2", text: "Apple + Coffee", recipe: null, groceries: [{item:"Apples",qty:1,unit:"pc"},{item:"Coffee",qty:1,unit:"serving"}] }
                ]},
                { type: "Dinner", options: [
                    { id: "th_d_1", text: "Paneer Bhurji + 2 rotis", recipe: "Paneer Bhurji", groceries: [{item:"Low-fat Paneer",qty:150,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"}] },
                    { id: "th_d_2", text: "Kadhai Paneer + Rice + Salad", recipe: null, groceries: [{item:"Low-fat Paneer",qty:150,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "th_ns_1", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] },
                    { id: "th_ns_2", text: "Glass of milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] }
                ]}
            ]
        },
        {
            id: "Friday",
            title: "Pull (Chicken + Pasta Day)",
            colorClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            icon: "fa-dumbbell",
            meals: [
                { type: "Breakfast", options: [
                    { id: "f_b_1", text: "Egg Bhurji + Whole wheat toast", recipe: "Egg Bhurji", groceries: [{item:"Eggs",qty:4,unit:"pcs"},{item:"Whole Wheat Bread",qty:2,unit:"slices"}] },
                    { id: "f_b_2", text: "Omelette (4 eggs) + Vegetable sandwich", recipe: "Masala Omelette", groceries: [{item:"Eggs",qty:4,unit:"pcs"},{item:"Whole Wheat Bread",qty:2,unit:"slices"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "f_ms_1", text: "Greek yogurt + Apple", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"},{item:"Apples",qty:1,unit:"pc"}] },
                    { id: "f_ms_2", text: "Paneer (100g)", recipe: null, groceries: [{item:"Low-fat Paneer",qty:100,unit:"g"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "f_l_1", text: "Healthy Butter Chicken + Rice", recipe: "Healthy Butter Chicken", groceries: [{item:"Chicken Breast",qty:220,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Greek Yogurt",qty:50,unit:"g"}] },
                    { id: "f_l_2", text: "Chicken Curry + 2 rotis", recipe: "Chicken Curry", groceries: [{item:"Chicken Breast",qty:220,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"}] }
                ]},
                { type: "Pre-Workout", options: [
                    { id: "f_pw_1", text: "Banana", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"}] },
                    { id: "f_pw_2", text: "Dates + Coffee", recipe: null, groceries: [{item:"Dates",qty:2,unit:"pcs"},{item:"Coffee",qty:1,unit:"serving"}] }
                ]},
                { type: "Dinner", options: [
                    { id: "f_d_1", text: "Whole wheat Chicken Pasta + Tomato garlic sauce", recipe: "Whole Wheat Chicken Pasta", groceries: [{item:"Chicken Breast",qty:220,unit:"g"},{item:"Whole Wheat Pasta",qty:100,unit:"g"},{item:"Tomatoes",qty:2,unit:"pcs"}] },
                    { id: "f_d_2", text: "Chicken Fried Rice (homemade) + Vegetables", recipe: "Chicken Fried Rice", groceries: [{item:"Chicken Breast",qty:250,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Eggs",qty:1,unit:"pc"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "f_ns_1", text: "Milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] },
                    { id: "f_ns_2", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] }
                ]}
            ]
        },
        {
            id: "Saturday",
            title: "Legs + HIIT (Prawns Day)",
            colorClass: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            icon: "fa-shrimp",
            meals: [
                 { type: "Breakfast", options: [
                    { id: "s_b_1", text: "Masala Omelette + Whole wheat toast", recipe: "Masala Omelette", groceries: [{item:"Eggs",qty:3,unit:"pcs"},{item:"Whole Wheat Bread",qty:2,unit:"slices"}] },
                    { id: "s_b_2", text: "Poha + 2 boiled eggs", recipe: "Vegetable Poha", groceries: [{item:"Poha",qty:80,unit:"g"},{item:"Eggs",qty:2,unit:"pcs"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "s_ms_1", text: "Apple + Greek yogurt", recipe: null, groceries: [{item:"Apples",qty:1,unit:"pc"},{item:"Greek Yogurt",qty:150,unit:"g"}] },
                    { id: "s_ms_2", text: "Banana + 10 almonds", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"},{item:"Almonds",qty:10,unit:"pcs"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "s_l_1", text: "Garlic Prawns (250g) + Rice + Salad", recipe: "Garlic Prawns", groceries: [{item:"Prawns",qty:250,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] },
                    { id: "s_l_2", text: "Garlic Prawns + Whole wheat pasta + Vegetables", recipe: "Garlic Prawns", groceries: [{item:"Prawns",qty:250,unit:"g"},{item:"Whole Wheat Pasta",qty:100,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] }
                ]},
                { type: "Pre-Workout", options: [
                    { id: "s_pw_1", text: "Banana + Coffee", recipe: null, groceries: [{item:"Bananas",qty:1,unit:"pc"},{item:"Coffee",qty:1,unit:"serving"}] },
                    { id: "s_pw_2", text: "Dates + Coffee", recipe: null, groceries: [{item:"Dates",qty:2,unit:"pcs"},{item:"Coffee",qty:1,unit:"serving"}] }
                ]},
                { type: "Dinner", options: [
                    { id: "s_d_1", text: "Healthy Chicken Biryani + Raita", recipe: "Healthy Chicken Biryani", groceries: [{item:"Chicken Breast",qty:220,unit:"g"},{item:"Basmati Rice",qty:100,unit:"g"},{item:"Greek Yogurt",qty:100,unit:"g"}] },
                    { id: "s_d_2", text: "Oven Baked Chicken + Rice + Salad", recipe: "Oven Baked Chicken", groceries: [{item:"Chicken Breast",qty:220,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "s_ns_1", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] },
                    { id: "s_ns_2", text: "Milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] }
                ]}
            ]
        },
        {
            id: "Sunday",
            title: "Recovery",
            colorClass: "bg-amber-700/20 text-amber-500 border-amber-700/30",
            icon: "fa-bed",
            meals: [
                 { type: "Breakfast", options: [
                    { id: "su_b_1", text: "Paneer Sandwich", recipe: "Paneer Sandwich", groceries: [{item:"Whole Wheat Bread",qty:2,unit:"slices"},{item:"Low-fat Paneer",qty:100,unit:"g"}] },
                    { id: "su_b_2", text: "Scrambled Eggs + Whole wheat toast", recipe: "Scrambled Eggs", groceries: [{item:"Eggs",qty:4,unit:"pcs"},{item:"Whole Wheat Bread",qty:2,unit:"slices"}] }
                ]},
                { type: "Morning Snack", options: [
                    { id: "su_ms_1", text: "Greek yogurt + Fruit", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"},{item:"Seasonal Fruits",qty:1,unit:"serving"}] },
                    { id: "su_ms_2", text: "Apple + 10 almonds", recipe: null, groceries: [{item:"Apples",qty:1,unit:"pc"},{item:"Almonds",qty:10,unit:"pcs"}] }
                ]},
                { type: "Lunch", options: [
                    { id: "su_l_1", text: "Yellow Dal Tadka + 2 rotis + Mixed vegetables", recipe: "Yellow Dal Tadka", groceries: [{item:"Chana Dal",qty:50,unit:"g"},{item:"Moong Chilka Dal",qty:50,unit:"g"},{item:"Whole Wheat Atta",qty:2,unit:"rotis"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] },
                    { id: "su_l_2", text: "Rajma + Rice + Salad", recipe: "Rajma", groceries: [{item:"Rajma",qty:100,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] }
                ]},
                { type: "Pre-Workout (Evening)", options: [
                    { id: "su_pw_1", text: "45–60 minute walk + Stretching", recipe: null, groceries: [] },
                    { id: "su_pw_2", text: "Mobility Work", recipe: null, groceries: [] }
                ]},
                { type: "Dinner", options: [
                    { id: "su_d_1", text: "Garlic Lemon Baked Salmon + Sweet potato + Vegetables", recipe: "Garlic Lemon Salmon", groceries: [{item:"Salmon",qty:250,unit:"g"},{item:"Sweet Potatoes",qty:150,unit:"g"},{item:"Mixed Vegetables",qty:1,unit:"serving"}] },
                    { id: "su_d_2", text: "Garlic Prawns + Rice + Salad", recipe: "Garlic Prawns", groceries: [{item:"Prawns",qty:250,unit:"g"},{item:"Basmati Rice",qty:150,unit:"g"},{item:"Salad Veggies",qty:1,unit:"serving"}] }
                ]},
                { type: "Night Snack", options: [
                    { id: "su_ns_1", text: "Milk", recipe: null, groceries: [{item:"Milk",qty:250,unit:"ml"}] },
                    { id: "su_ns_2", text: "Greek yogurt", recipe: null, groceries: [{item:"Greek Yogurt",qty:150,unit:"g"}] }
                ]}
            ]
        }
    ]
};
