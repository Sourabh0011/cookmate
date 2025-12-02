"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
    ChefHat, Calendar, Users, Zap, Clock, Utensils, Heart, BookOpen, 
    Search, User, Loader2, ListChecks, CornerDownRight, XCircle, FlaskConical, Code, HeartHandshake,
    Bell 
} from 'lucide-react';

// FIREBASE IMPORTS REMOVED

// --- Utility Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
    let baseStyle = 'px-4 py-2 font-semibold transition duration-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full'; // Ensure buttons are full width on mobile by default
    
    if (variant === 'primary') {
        baseStyle += ' bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500';
    } else if (variant === 'secondary') {
        baseStyle += ' bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
    } else if (variant === 'outline') {
        baseStyle += ' border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500';
    }

    return (
        <button className={`${baseStyle} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

const Card = ({ children, className = '' }) => (
    <div className={`bg-white p-5 sm:p-6 rounded-xl shadow-lg ${className}`}>
        {children}
    </div>
);

// --- Mock Data (Simulating AI Output Structure) ---

const mockRecipes = [
    {
        id: 1,
        title: "Quick 20-Minute Lemon Chicken Stir-fry",
        tags: ["Beginner", "30 mins", "Healthy", "Dinner", "High Protein"],
        description: "A simple, protein-packed meal perfect for a busy weeknight. Minimal chopping and maximum flavor, ideal if you have chicken and rice on hand.",
        ingredients: ["Chicken breast (200g)", "Broccoli (1 cup)", "Soy sauce (2 tbsp)", "Lemon (1)", "Cooked Rice"],
        steps: [
            "Cut chicken into 1-inch cubes and stir-fry in a hot pan until golden brown.",
            "Add broccoli and a splash of water, cover quickly to steam for 5 minutes.",
            "Mix soy sauce and lemon juice; pour over chicken and vegetables.",
            "Serve immediately over a bed of warm rice.",
        ],
        healthFocus: "High Protein, Low Carb option (if served without rice). Excellent source of Vitamin C.",
        estimatedTime: 20,
    },
    {
        id: 2,
        title: "Lentil Shepherd's Pie (Vegan & Gluten-Free)",
        tags: ["Intermediate", "75 mins", "Vegan", "Gluten-Free", "Lesson"],
        description: "A hearty, nutritious plant-based pie. This recipe focuses on creating a rich, flavorful lentil base and a perfectly creamy potato topping.",
        ingredients: ["Brown lentils (1 cup)", "Carrots, diced", "Celery, diced", "Vegetable broth", "Potatoes (4 large)", "Almond milk"],
        steps: [
            "Boil and mash potatoes with almond milk and seasoning for the topping.",
            "Sauté carrots and celery until soft, then add lentils and broth. Simmer for 30 minutes.",
            "Transfer lentil mixture to a baking dish, top with mashed potatoes.",
            "Bake at 375°F (190°C) until golden brown and bubbly (approx. 25 minutes).",
        ],
        healthFocus: "Excellent source of fiber, iron, and plant-based protein. Suitable for most common allergens.",
        estimatedTime: 75,
    },
];

const mockTeam = [
    {
        name: "Dolly Patel",
        role: "Full-Stack Developer",
        focus: "Personalized Recipe Generation",
        icon: FlaskConical,
        avatarText: "DP",
        color: "red",
        delay: 0.1,
    },
    {
        name: "Dolly ki dost",
        role: "UI /UX Designer",
        focus: "Database & Real-time Planner",
        icon: Code,
        avatarText: "DD",
        color: "blue",
        delay: 0.2,
    },
   
];

// --- Team Member Component ---

const TeamMemberCard = ({ member }) => {
    const Icon = member.icon;
    const baseColor = {
        'red': 'bg-red-500', 'blue': 'bg-blue-500', 'emerald': 'bg-emerald-500'
    }[member.color];
    const lightColor = {
        'red': 'bg-red-50', 'blue': 'bg-blue-50', 'emerald': 'bg-emerald-50'
    }[member.color];
    const textColor = {
        'red': 'text-red-700', 'blue': 'text-blue-700', 'emerald': 'text-emerald-700'
    }[member.color];

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, member.delay * 1000);
        return () => clearTimeout(timer);
    }, [member.delay]);

    return (
        <Card className={`
            text-center transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl
            ${lightColor} border-t-4 ${baseColor}
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            {/* Avatar Placeholder */}
            <div className={`w-20 h-20 ${baseColor} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold border-4 border-white shadow-md`}>
                {member.avatarText}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className={`text-sm font-semibold ${textColor} mb-3`}>{member.role}</p>
            
            <div className={`p-3 rounded-lg ${lightColor} border border-dashed ${textColor.replace('700', '300')}`}>
                <p className="text-xs text-gray-600 mb-1">Focus Area:</p>
                <div className="flex items-center justify-center font-medium text-gray-600">
                    <Icon className="w-4 h-4 mr-5 opacity-80" />
                    {member.focus}
                </div>
            </div>
        </Card>
    );
};


const TeamMembers = () => (
    <div className="space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 flex items-center justify-center border-b pb-4 text-center">
            <Users className="w-8 h-8 sm:w-9 sm:h-9 mr-3 text-emerald-600" />
            Meet the CookMate AI Team
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-600 max-w-3xl mx-auto px-2">
            We are a passionate, multi-disciplinary team dedicated to making healthy, organized cooking accessible to everyone through intelligent technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
            {mockTeam.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
            ))}
        </div>

        <div className="pt-8 text-center">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">Our Mission</h2>
            <p className="text-gray-600 italic">
                "To simplify the culinary journey, turning confusion into confidence, one personalized recipe at a time."
            </p>
        </div>
    </div>
);


// --- Main Screens (Previous components remain the same) ---

const RecipeFinder = ({ onRecipeGenerate, isLoading }) => {
    const [preferences, setPreferences] = useState({
        skill: 'Beginner',
        time: '30',
        diet: 'None',
        pantry: '',
    });

    const handleChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
    };
    
    // Determine button state and content
    const generateButtonContent = isLoading ? (
        <span className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Smart Recipe...
        </span>
    ) : (
        <span className="flex items-center justify-center">
            <Zap className="w-5 h-5 mr-2" />
            Generate Personalized Recipe
        </span>
    );

    return (
        <div className="space-y-6 sm:space-y-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-emerald-600" />
                Your AI Culinary Guide
            </h1>
            <p className="text-gray-600">Tell CookMate AI what you need today, and get a personalized recipe instantly.</p>

            <Card>
                {/* Responsive Grid for Preferences: single column on mobile, 2 columns on medium, 4 columns on large */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Skill Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Skill Level
                        </label>
                        <select
                            name="skill"
                            value={preferences.skill}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="Beginner">Beginner (Quick/Simple)</option>
                            <option value="Intermediate">Intermediate (Skill Building)</option>
                            <option value="Expert">Advanced (Complex Techniques)</option>
                        </select>
                    </div>

                    {/* Time Available */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Time Available (mins)
                        </label>
                        <input
                            type="number"
                            name="time"
                            value={preferences.time}
                            onChange={handleChange}
                            min="5"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g., 30"
                        />
                    </div>

                    {/* Dietary Focus */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <Heart className="w-4 h-4 mr-2" />
                            Dietary Focus
                        </label>
                        <select
                            name="diet"
                            value={preferences.diet}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="None">No Restrictions</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Keto">Keto / Low-Carb</option>
                            <option value="Gluten-Free">Gluten-Free</option>
                        </select>
                    </div>

                    {/* Pantry/Ingredients */}
                    <div className="lg:col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <ListChecks className="w-4 h-4 mr-2" />
                            Pantry (e.g., ingredients on hand)
                        </label>
                        <input
                            type="text"
                            name="pantry"
                            value={preferences.pantry}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g., eggs, pasta, tomatoes"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Button onClick={() => onRecipeGenerate(preferences)} className="w-full" disabled={isLoading}>
                        {generateButtonContent}
                    </Button>
                    <p className="mt-2 text-xs text-gray-500 text-center">AI uses all four criteria to find the perfect meal for your current needs.</p>
                </div>
            </Card>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 pt-4">Featured Lessons & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockRecipes.filter(r => r.tags.includes('Lesson')).map((recipe) => (
                    <Card key={recipe.id} className="border-t-4 border-amber-500">
                        <div className="flex items-center text-amber-600 mb-2">
                            <BookOpen className="w-5 h-5 mr-2" />
                            <h3 className="text-xl font-bold">{recipe.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {recipe.tags.map(tag => (
                                <span key={tag} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const RecipeView = ({ recipe, onBack, onAddToPlanner }) => (
    <div className="space-y-6">
        <Button variant="secondary" onClick={onBack} className="mb-4 w-auto px-4 py-2">
            &larr; Back to Finder
        </Button>

        <Card>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-2">{recipe.title}</h1>
            <div className="flex flex-wrap gap-3 mb-4">
                {recipe.tags.map(tag => (
                    <span key={tag} className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                        {(tag === 'Healthy' || tag.includes('Protein')) && <Heart className="w-4 h-4 mr-1" />}
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-base sm:text-lg text-gray-700 mb-6 border-l-4 border-emerald-500 pl-4 italic">
                {recipe.description}
            </p>

            {/* Content grid: single column on mobile, 2 columns on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                        <Utensils className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        Ingredients List
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="pl-1">{item}</li>
                        ))}
                    </ul>
                    
                    {/* Shopping List Feature Placeholder */}
                    <div className="mt-6 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-gray-700 flex items-center">
                            <ListChecks className="w-4 h-4 mr-2 text-blue-500" /> Smart Shopping List
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Automatically compare ingredients to your pantry and generate a list of missing items.</p>
                        <Button variant="secondary" className="mt-3 text-sm" onClick={() => console.log("Generating smart shopping list...")}>
                            Generate Missing Items List
                        </Button>
                    </div>
                </div>

                {/* Steps/Lesson */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        Cooking Steps
                    </h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="pl-1">
                                <span className="font-medium text-emerald-600">Step {index + 1}:</span> {step}
                            </li>
                        ))}
                    </ol>

                    {/* Adaptive Lesson Feature Placeholder */}
                    <div className="mt-6 p-4 border border-gray-100 rounded-lg bg-emerald-50 border-l-4 border-emerald-500">
                        <h3 className="font-bold text-emerald-800 flex items-center">
                            <CornerDownRight className="w-4 h-4 mr-2" /> Adaptive Step-by-Step Lesson
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">Start the interactive mode for video guidance and troubleshooting that adjusts to your pace and skill level.</p>
                        <Button variant="primary" className="mt-3 text-sm" onClick={() => console.log("Starting adaptive lesson...")}>
                            Start Interactive Cooking Guide
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-semibold text-red-600 flex items-center">
                        <Heart className="w-5 h-5 mr-2" /> Health Focus:
                    </h3>
                    <p className="text-gray-600 mt-1">{recipe.healthFocus}</p>
                </div>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => onAddToPlanner(recipe)}>
                    Add to Meal Planner
                </Button>
            </div>
        </Card>
    </div>
);


// UPDATED MEAL PLANNER TO USE LOCAL STATE ONLY
const MealPlanner = ({ plannedMeals, setPlannedMeals }) => {
    const today = new Date().toISOString().split('T')[0];
    const [newMeal, setNewMeal] = useState({ date: today, meal: '', recipe: '' });

    // Function to add a meal to local state
    const handleAddMeal = () => {
        if (!newMeal.meal || !newMeal.recipe) {
            console.error("Cannot add meal: Missing meal info.");
            return;
        }

        const mealId = Date.now().toString(); // Use timestamp as a unique ID
        const mealToAdd = {
            id: mealId,
            date: newMeal.date,
            meal: newMeal.meal,
            recipe: newMeal.recipe,
        };

        setPlannedMeals(prevMeals => [...prevMeals, mealToAdd]);
        setNewMeal({ date: today, meal: '', recipe: '' });
    };

    // Function to delete a meal from local state
    const handleDelete = (id) => {
        setPlannedMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
    };

    const groupedMeals = plannedMeals.reduce((acc, meal) => {
        acc[meal.date] = acc[meal.date] || [];
        acc[meal.date].push(meal);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedMeals).sort();

    return (
        <div className="space-y-6 sm:space-y-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-emerald-600" />
                Weekly Meal Planner
            </h1>
            <p className="text-gray-600">Organize your cooking schedule and set reminders for a consistent, healthy routine.</p>
            {/* USER ID REMOVED */}

            {/* Planner Features Card */}
            <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold text-blue-800 mb-3">Integrated Planner & Smart Features</h2>
                {/* Ensure buttons stack on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="secondary" className="flex items-center justify-center text-sm" onClick={() => console.log("Setting reminders for all planned meals...")}>
                        <Bell className="w-4 h-4 mr-2 text-red-500" /> Set Smart Reminders
                    </Button>
                    <Button variant="secondary" className="flex items-center justify-center text-sm" onClick={() => console.log("Generating consolidated shopping list...")}>
                        <ListChecks className="w-4 h-4 mr-2 text-emerald-500" /> Generate Consolidated Shopping List
                    </Button>
                </div>
            </Card>

            {/* Add New Meal Form */}
            <Card>
                <h2 className="text-xl font-semibold mb-4">Plan a New Meal</h2>
                {/* Grid for form: stacks on mobile, becomes horizontal on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            value={newMeal.date}
                            onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                        <select
                            value={newMeal.meal}
                            onChange={(e) => setNewMeal({ ...newMeal, meal: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select...</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Recipe/Dish</label>
                        <input
                            type="text"
                            placeholder="e.g., Lemon Chicken Stir-fry"
                            value={newMeal.recipe}
                            onChange={(e) => setNewMeal({ ...newMeal, recipe: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <Button onClick={handleAddMeal} className="w-full sm:w-auto">
                        Add to Planner
                    </Button>
                </div>
            </Card>

            {/* Meal List */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Your Scheduled Meals</h2>
            {sortedDates.length === 0 ? (
                <p className="text-gray-500 italic">Your planner is empty. Start adding meals!</p>
            ) : (
                <div className="space-y-4 sm:space-y-6">
                    {sortedDates.map(date => (
                        <div key={date}>
                            <h3 className="text-lg sm:text-xl font-bold bg-emerald-50 text-emerald-800 p-2 rounded-t-lg">
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h3>
                            <div className="space-y-3 p-3 sm:p-4 bg-white rounded-b-lg shadow">
                                {groupedMeals[date].map(meal => (
                                    <div key={meal.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                        <div className="font-medium">
                                            <span className="text-emerald-600 mr-2 uppercase text-xs tracking-wider font-extrabold">{meal.meal}</span>
                                            <span className="text-gray-800 text-sm sm:text-base">{meal.recipe}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(meal.id)}
                                            className="text-red-500 hover:text-red-700 text-sm p-1 transition"
                                        >
                                            <XCircle className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- Main Application Component ---

const App = () => {
    const [currentView, setCurrentView] = useState('finder'); 
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    // Initialize plannedMeals with local state
    const [plannedMeals, setPlannedMeals] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    
    // FIREBASE STATES REMOVED
    // const [db, setDb] = useState(null);
    // const [auth, setAuth] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [isAppReady, setIsAppReady] = useState(true); // Always ready without Firebase

    // FIREBASE EFFECT REMOVED (Initialization and Auth)
    useEffect(() => {
        // Since Firebase is removed, we just ensure the app is considered ready.
        // In a real local state app, you might load from localStorage here.
        // For this demo, we skip authentication setup.
        console.log("Running without Firebase.");
        setIsAppReady(true);
    }, []);


    // FIREBASE EFFECT REMOVED (Real-time Listener)
    // useEffect(() => { ... }, [isAuthReady, db, userId]); 

    // Mock AI Recipe Generation (kept for frontend demo)
    const handleGenerateRecipe = useCallback((preferences) => {
        setIsLoading(true);
        console.log("Requesting AI Recipe with preferences:", preferences);

        setTimeout(() => {
            const isAdvancedRequest = preferences.pantry.toLowerCase().includes('lentils') && 
                                      (preferences.diet === 'Vegan' || preferences.diet === 'Gluten-Free');
            
            const recipeToSelect = isAdvancedRequest
                ? mockRecipes.find(r => r.id === 2) 
                : mockRecipes.find(r => r.id === 1); 

            setSelectedRecipe(recipeToSelect);
            setCurrentView('recipe');
            setIsLoading(false);
            console.log("AI Recipe Generated:", recipeToSelect.title);
        }, 2000); 
    }, []);

    // Function to add the selected recipe to the planner (uses local state)
    const handleAddToPlanner = useCallback((recipe) => {
        const today = new Date().toISOString().split('T')[0];
        
        const mealId = Date.now().toString(); // Generate unique ID
        const mealToAdd = {
            id: mealId,
            date: today,
            meal: 'Dinner', 
            recipe: recipe.title,
        };

        setPlannedMeals(prevMeals => [...prevMeals, mealToAdd]);
        console.log(`"${recipe.title}" added to planner successfully (Local State).`);
        setCurrentView('planner');
    }, []);

    const renderContent = () => {
        // Display a loading screen while auth is in progress
        if (!isAppReady) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 mr-2 animate-spin text-emerald-600" />
                    <p className="text-lg text-gray-600">Loading CookMate AI...</p>
                </div>
            );
        }

        switch (currentView) {
            case 'finder':
                return <RecipeFinder onRecipeGenerate={handleGenerateRecipe} isLoading={isLoading} />;
            case 'recipe':
                return <RecipeView 
                            recipe={selectedRecipe} 
                            onBack={() => setCurrentView('finder')} 
                            onAddToPlanner={handleAddToPlanner}
                        />;
            case 'planner':
                return <MealPlanner 
                            plannedMeals={plannedMeals} 
                            setPlannedMeals={setPlannedMeals} // Pass setter for local state management
                        />;
            case 'team':
                return <TeamMembers />;
            default:
                return <RecipeFinder onRecipeGenerate={handleGenerateRecipe} isLoading={isLoading} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Header/Navigation: Tighter on mobile */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 flex items-center">
                        <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 mr-2" />
                        CookMate AI
                    </div>

                    {/* Navigation: Icons only on smallest screens */}
                    <nav className="flex space-x-2 sm:space-x-4">
                        <NavItem icon={Search} label="Finder" active={currentView === 'finder' || currentView === 'recipe'} onClick={() => setCurrentView('finder')} />
                        <NavItem icon={Calendar} label="Planner" active={currentView === 'planner'} onClick={() => setCurrentView('planner')} />
                        <NavItem icon={Users} label="Team" active={currentView === 'team'} onClick={() => setCurrentView('team')} />
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 mt-10 p-4 text-center text-gray-500 text-sm">
                CookMate AI - Intelligent Meal Management. Powered by Personalized AI Suggestions.
            </footer>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => {
    const activeClasses = 'text-emerald-600 border-b-2 border-emerald-600';
    const inactiveClasses = 'text-gray-500 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-300';
    
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-1 py-1 px-2 sm:py-2 sm:px-3 transition-colors duration-200 ${active ? activeClasses : inactiveClasses}`}
        >
            <Icon className="w-5 h-5" />
            {/* Show label only on screens larger than mobile */}
            <span className="hidden sm:inline text-sm">{label}</span>
        </button>
    );
};

export default App;