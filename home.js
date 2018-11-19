var xmlHttp = new XMLHttpRequest();
var baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
var apiKey = "yourAPIKey";
var inputIngredients = [];
var recipesResponse;

document.getElementById("add-ingredient-input").addEventListener("keyup", function(ev) {
    if(ev.key !== "Enter") {
        return;
    }
    else {
        addIngredientToList();
        ev.preventDefault();
    }
});

var grid = document.querySelector(".grid");
var msnry = new Masonry(grid, {
    itemSelector: ".grid-item",
    columnWidth: 200,
    gutter: 10
});

function searchRecipesByIngredients() {
    if(inputIngredients.length > 0){
        var ingredients = inputIngredients.join("%2C");
        var fillIngredients = true;
        var limitLicense = false;
        var number = 5;
        var ranking = 2;

        var parameters = "?ingredients=" + ingredients + "&fillIngredients=" + fillIngredients + "&limitLicense=" + limitLicense + "&number=" + number + "&ranking=" + ranking;
        var completeUrl = baseUrl.concat(parameters);

        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                recipesResponse = JSON.parse(xmlHttp.responseText);
                console.log(recipesResponse);//cb
            }
            else if(xmlHttp.readyState === 4){
                console.log("Error getting data. Status code: " + xmlHttp.status);
            }
        }

        xmlHttp.open("GET", completeUrl, true);
        xmlHttp.setRequestHeader("X-Mashape-Key", apiKey);
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.send();
    }
    else {
        console.log("Error searching for recipes. There are no ingredients to use.");
    }
}

function addIngredientToList(){
    var newIngredient = document.getElementsByName("ingredientInput")[0].value;
    if (!ingredientExists(newIngredient)){
        inputIngredients.push(newIngredient);

        var node = document.createElement("li");
        var textNode = document.createTextNode(newIngredient);
        node.appendChild(textNode);
        document.getElementById("ingredients-list").appendChild(node);
    }
    else {
        console.log("The entered ingredient already exists in the list");
    }
}

function ingredientExists(ingredient) {
    var exists = inputIngredients.indexOf(ingredient);
    return (exists !== -1) ? true : false;
}
