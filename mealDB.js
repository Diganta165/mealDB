const submitInput = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;

    searchedValue(inputFieldText);
    inputField.value = '';
}


// Searched API loading
const searchedValue = mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadSearchedValue(data.meals))
}

// Load Searched Value 
const loadSearchedValue = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('meals');
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick = "mealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}

// load Meal Details
const mealDetails = mealID =>{
    console.log(mealID);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]));
}

// Display Meal Details 
const displayMealDetail = meal =>{
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML =`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;

    mealDetails.appendChild(div);

    

}