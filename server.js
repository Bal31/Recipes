const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('recipes.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});

// Create tables
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        mood TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Tables created successfully');
            insertSampleRecipes();
        }
    });
}

// Insert sample recipes
function insertSampleRecipes() {
    const recipes = [
        {
            name: "Comforting Dal Makhani",
            ingredients: "Whole black lentils (urad dal), kidney beans (rajma), butter, cream, ginger, garlic, onions, tomatoes, garam masala, cumin, coriander powder, salt",
            instructions: "1. Soak lentils and kidney beans overnight\n2. Pressure cook until soft\n3. Prepare masala with ginger, garlic, onions, and tomatoes\n4. Combine dal with masala, add butter and cream\n5. Simmer for 30 minutes",
            mood: "sad"
        },
        {
            name: "Energizing Sarson ka Saag",
            ingredients: "Mustard greens, spinach, ginger, garlic, onions, tomatoes, corn flour, butter, garam masala, salt",
            instructions: "1. Boil mustard greens and spinach\n2. Blend to make a paste\n3. Prepare masala with ginger, garlic, onions\n4. Combine greens with masala\n5. Add corn flour slurry and simmer",
            mood: "tired"
        },
        {
            name: "Happy Paneer Butter Masala",
            ingredients: "Paneer, tomatoes, butter, cream, cashews, ginger, garlic, onions, garam masala, kasuri methi, salt",
            instructions: "1. Fry paneer cubes until golden\n2. Make tomato-cashew gravy\n3. Add spices and cream\n4. Combine paneer with gravy\n5. Garnish with kasuri methi",
            mood: "happy"
        },
        {
            name: "Spicy Chole Bhature",
            ingredients: "Chickpeas, flour, oil, ginger, garlic, onions, tomatoes, garam masala, amchur powder, salt",
            instructions: "1. Soak and cook chickpeas\n2. Prepare masala with ginger, garlic, onions\n3. Make bhature dough\n4. Fry bhature until puffed\n5. Combine chole with masala",
            mood: "cold"
        },
        {
            name: "Warming Rajma Chawal",
            ingredients: "Kidney beans, rice, ginger, garlic, onions, tomatoes, garam masala, cumin, coriander powder, salt",
            instructions: "1. Soak and cook kidney beans\n2. Prepare masala with ginger, garlic, onions\n3. Cook rice separately\n4. Combine rajma with masala\n5. Serve with rice",
            mood: "cold"
        },
        {
            name: "Uplifting Aloo Paratha",
            ingredients: "Potatoes, wheat flour, ginger, green chilies, coriander leaves, butter, salt",
            instructions: "1. Boil and mash potatoes\n2. Add spices to potato filling\n3. Make dough and roll parathas\n4. Stuff with potato mixture\n5. Cook on tawa with butter",
            mood: "sad"
        },
        {
            name: "Energizing Mixed Vegetable Curry",
            ingredients: "Mixed vegetables (cauliflower, peas, carrots), ginger, garlic, onions, tomatoes, garam masala, turmeric, salt",
            instructions: "1. Chop vegetables\n2. Prepare masala with ginger, garlic, onions\n3. Add vegetables to masala\n4. Cook until vegetables are tender\n5. Garnish with coriander",
            mood: "tired"
        },
        {
            name: "Celebratory Paneer Tikka",
            ingredients: "Paneer, yogurt, ginger, garlic, garam masala, red chili powder, lemon juice, salt",
            instructions: "1. Marinate paneer in spiced yogurt\n2. Let it rest for 30 minutes\n3. Thread on skewers\n4. Grill or bake until golden\n5. Serve with mint chutney",
            mood: "happy"
        },
        {
            name: "Soothing Kadhi Pakora",
            ingredients: "Yogurt, gram flour, onion pakoras, ginger, garlic, curry leaves, cumin, fenugreek seeds, turmeric, salt",
            instructions: "1. Make onion pakoras\n2. Prepare yogurt-gram flour mixture\n3. Temper with spices\n4. Add pakoras to kadhi\n5. Simmer until thick",
            mood: "sad"
        },
        {
            name: "Revitalizing Dal Tadka",
            ingredients: "Yellow lentils (toor dal), ginger, garlic, tomatoes, cumin, mustard seeds, curry leaves, turmeric, red chili powder, salt",
            instructions: "1. Cook lentils until soft\n2. Prepare tempering with spices\n3. Add tomatoes and spices\n4. Pour tempering over dal\n5. Garnish with coriander",
            mood: "tired"
        },
        {
            name: "Joyful Paneer Do Pyaza",
            ingredients: "Paneer, onions, tomatoes, ginger, garlic, green chilies, garam masala, cumin, coriander powder, salt",
            instructions: "1. Fry paneer cubes\n2. Sauté onions until golden\n3. Add spices and tomatoes\n4. Combine with paneer\n5. Garnish with coriander",
            mood: "happy"
        },
        {
            name: "Warming Malai Kofta",
            ingredients: "Paneer, potatoes, mixed vegetables, cream, cashews, ginger, garlic, onions, garam masala, cardamom, salt",
            instructions: "1. Make kofta mixture\n2. Shape and fry koftas\n3. Prepare rich gravy\n4. Add koftas to gravy\n5. Garnish with cream",
            mood: "cold"
        },
        {
            name: "Comforting Baingan Bharta",
            ingredients: "Eggplant, onions, tomatoes, ginger, garlic, green chilies, cumin, coriander powder, garam masala, salt",
            instructions: "1. Roast eggplant\n2. Mash eggplant\n3. Prepare masala\n4. Combine eggplant with masala\n5. Garnish with coriander",
            mood: "sad"
        },
        {
            name: "Energizing Dal Fry",
            ingredients: "Yellow lentils (toor dal), ginger, garlic, onions, tomatoes, cumin, turmeric, red chili powder, garam masala, salt",
            instructions: "1. Cook lentils\n2. Prepare tempering\n3. Add vegetables and spices\n4. Combine with dal\n5. Garnish with coriander",
            mood: "tired"
        },
        {
            name: "Happy Paneer Lababdar",
            ingredients: "Paneer, tomatoes, cream, cashews, ginger, garlic, onions, garam masala, cardamom, salt",
            instructions: "1. Fry paneer\n2. Make rich tomato gravy\n3. Add cream and spices\n4. Combine with paneer\n5. Garnish with cream",
            mood: "happy"
        },
        {
            name: "Spicy Vegetable Biryani",
            ingredients: "Basmati rice, mixed vegetables, ginger, garlic, onions, tomatoes, biryani masala, saffron, mint, coriander, salt",
            instructions: "1. Cook rice with spices\n2. Prepare vegetable masala\n3. Layer rice and masala\n4. Add saffron milk\n5. Dum cook for 20 minutes",
            mood: "cold"
        }
    ];

    const stmt = db.prepare('INSERT OR IGNORE INTO recipes (name, ingredients, instructions, mood) VALUES (?, ?, ?, ?)');
    
    recipes.forEach(recipe => {
        stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood);
    });
    stmt.finalize();
}

// Routes
app.get('/api/recipe/:mood', (req, res) => {
    const mood = req.params.mood;
    db.all('SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1', [mood], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows[0]);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 