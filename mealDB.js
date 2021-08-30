const submitInput = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;

    searchedValue(inputFieldText);
    inputField.value = '';
}


// Searched API loading
const searchedValue = async mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const res = await fetch(url);
    const data = await res.json();
    loadSearchedValue(data.meals, mealName);
    
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => loadSearchedValue(data.meals, mealName))
}

// Load Searched Value 
const loadSearchedValue = (meals, mealName) => {
    console.log('Meals Array',meals);
    const searchResult = document.getElementById('meals');
    searchResult.textContent = '';

    if(meals == null || mealName == ''){

        const divError = document.getElementById('error-message');
        divError.textContent = '';
        divError.style.display = 'block';
        const p = document.createElement('p');
        p.classList.add('mx-auto');
        p.innerText='Invalid Input';
        divError.appendChild(p);
        const mealDetails = document.getElementById('meal-details');
        mealDetails.style.display = 'none';
    }
    else{
        document.getElementById('error-message').style.display = 'none';
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
    mealDetails.style.display = 'block';
    mealDetails.textContent = '';
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