/*jshint esversion: 6*/
$.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true&fillIngredients=false&instructionsRequired=true&limitLicense=false&maxCalories=5000&maxCarbs=5000&maxFat=5000&maxProtein=5000&minCalories=1&minCarbs=1&minFat=1&minProtein=1&number=50&offset=0&query=salad&ranking=1&excludeIngredients=anchovies",
    headers: {
        "X-Mashape-Key": "tJIWsmWwMQmshiO3xh51NdiuhqKJp1uhRC2jsnWEAsZKQhSs5E",
        "Accept": "application/json"
    },
    method: "GET",
    success: createModel,
    error: function(err) {
        console.log(err);
    },
});

function createModel(food) {
    let recipes = food.results.map(function(elem) {
        let recipe = {
            name: elem.title,
            ingredients: getIngredients(food),
            preparation: {
                dificulty: getDificulty(food),
                timeForPreparaion: elem.readyInMinutes,
                StepByStep: getSteps(food)
            },
            likes: elem.aggregateLikes,
            dishTypes: elem.dishTypes,
            nutritionalInfo: {
                calories: elem.calories,
                protein: elem.protein,
                fat: elem.fat,
                carbs: elem.carbs,
            },
            vegetarian: elem.vegetarian,
            vegan: elem.vegan,
            glutenFree: elem.glutenFree,
            dairyFree: elem.dairyFree,
            veryHealthy: elem.veryHealthy,
            source: elem.sourceUrl,
            healthScore: elem.healthScore,
            imgUrl: elem.image
        };
        return recipe;
    });

    console.log(recipes);
    $.ajax({
        // Notice that we are using POST
        type: 'POST',
        url: '/get-recipes',
        // The data key is for sending data in a POST, PUT or PATCH!
        contentType: 'application/json',
        data: JSON.stringify({
            recipes
        }),
        dataType: "json",
        success: showFeedback,
        error: handleError
    });
};

function showFeedback(postResponse) {
    console.log('post success');
    console.log(postResponse);
}

function handleError(err) {
    console.log('Oh no! Error:');
    console.log(err);
}

function getIngredients(food) {
    let ingredients = [];
    food.results[0].analyzedInstructions[0].steps.forEach(function(elem) {
        elem.ingredients.forEach(function(elem) {
            ingredients.push(elem.name);
        });
    });
    var uniqueIngredients = [];
    $.each(ingredients, function(i, el) {
        if ($.inArray(el, uniqueIngredients) === -1) uniqueIngredients.push(el);
    });
    return uniqueIngredients;
};

function getSteps(food) {
    let steps = [];
    food.results[0].analyzedInstructions[0].steps.forEach(function(elem) {
        steps.push(elem.step);
    });
    return steps;
};

function getDificulty(food) {
    let time = food.results[0].readyInMinutes;
    if (time < 40) {
        dificulty = "SuperStarterChef"
    } else if (time < 70) {
        dificulty = "ChefWannaBe"
    } else {
        dificulty = "MasterChef"
    }
    return dificulty;
}

var slider = new Slider('#ex1', {
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});
