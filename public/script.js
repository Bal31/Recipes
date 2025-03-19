let currentMood = '';

document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const newRecipeButton = document.getElementById('new-recipe');
    const recipeContainer = document.getElementById('recipe-container');

    // Add click handlers to mood buttons
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentMood = button.dataset.mood;
            getRecipe(currentMood);
            
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('ring-4', 'ring-offset-2'));
            // Add active class to clicked button
            button.classList.add('ring-4', 'ring-offset-2');
        });
    });

    // Add click handler for new recipe button
    newRecipeButton.addEventListener('click', () => {
        if (currentMood) {
            getRecipe(currentMood);
        }
    });
});

async function getRecipe(mood) {
    try {
        const response = await fetch(`/api/recipe/${mood}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const recipe = await response.json();
        if (recipe) {
            displayRecipe(recipe);
            document.getElementById('recipe-container').classList.remove('hidden');
        } else {
            showError('No recipe found for this mood. Try another mood!');
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        showError('Error fetching recipe. Please try again.');
    }
}

function displayRecipe(recipe) {
    // Add fade-out effect
    const container = document.getElementById('recipe-container');
    container.style.opacity = '0';
    
    // Update content and fade in
    setTimeout(() => {
        document.getElementById('recipe-name').textContent = recipe.name;
        document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
        document.getElementById('recipe-instructions').textContent = recipe.instructions;
        container.style.opacity = '1';
    }, 300);
}

function showError(message) {
    alert(message);
} 