// FRONT END FILE TO INTERACT WITH THE DOM
let input = document.getElementById('mysearch')
const search = document.querySelector('#search')
const container = document.querySelector('#post')
search.addEventListener('click', publication);

function publication() {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)


      // const container = document.querySelector('#post')
      container.innerHTML = ""
      data.meals.forEach((meal) => {
        let post = `<div class="container">
                        <div class="header">
                          <h4>${meal.idMeal}</h1>
                          <h1>${meal.strMeal}</h3>
                          <img src="${meal.strMealThumb}"></img>
                        </div>
                        <div class="things">
                          <h5>Category: ${meal.strCategory}</h3>
                          <h5>Area: ${meal.strArea}</h3>
                        </div>
                        <div class="ingredients">
                        <h2>Ingredients</h2>
                        <table>
                            <tr>
                              <td>${meal.strIngredient1}</td>
                              <td>${meal.strMeasure1}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient2}</td>
                              <td>${meal.strMeasure2}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient3}</td>
                              <td>${meal.strMeasure3}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient4}</td>
                              <td>${meal.strMeasure4}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient5}</td>
                              <td>${meal.strMeasure5}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient6}</td>
                              <td>${meal.strMeasure6}</td>
                            </tr>
                            <tr>
                              <td>${meal.strIngredient7}</td>
                              <td>${meal.strMeasure7}</td>
                            </tr>
                            <tr>
                            <td>${meal.strIngredient8}</td>
                            <td>${meal.strMeasure}</td>
                          </tr>
                          <tr>
                              <td>${meal.strIngredient9}</td>
                              <td>${meal.strMeasure9}</td>
                            </tr>
                            <tr>
                            <td>${meal.strIngredient10}</td>
                            <td>${meal.strMeasure10}</td>
                          </tr>
                          <tr>
                              <td>${meal.strIngredient11}</td>
                              <td>${meal.strMeasure11}</td>
                            </tr>
                            <tr>
                            <td>${meal.strIngredient12}</td>
                            <td>${meal.strMeasure12}</td>
                          </tr>
                          <tr>
                              <td>${meal.strIngredient13}</td>
                              <td>${meal.strMeasure13}</td>
                            </tr>
                            <tr>
                            <td>${meal.strIngredient14}</td>
                            <td>${meal.strMeasure14}</td>
                          </tr>
                          <tr>
                              <td>${meal.strIngredient15}</td>
                              <td>${meal.strMeasure15}</td>
                            </tr>
                            <tr>
                            <td>${meal.strIngredient16}</td>
                            <td>${meal.strMeasure16}</td>
                          </tr>
                        </table>
                        </div>
                        <div>
                          <h2>Instructions</h2>
                          <p class="instruction">${meal.strInstructions}</p>
                        </div>
                          <button id=${meal.imdbID}>Add recipe</button>
                      </div>`
        container.insertAdjacentHTML('beforeend', post)

        const addRecipeBtn = document.getElementById(`${meal.imdbID}`);
        addRecipeBtn.addEventListener("click", (e) => {
          e.preventDefault()
          alert("Recipe added to your list");
          fetch('/api/addrecipe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              // console.error('Error:', error);
            });
        });
      });
    });
};


const UpdateRecipes = (meal) => {
  fetch('/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};


const addEventToAllRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    recipe.addEventListener('click', (event) => {
      // alert(recipe.children[0].innerText)
      // alert(recipe.dataset.id)
      UpdateRecipes({recipes_id: recipe.dataset.id, isDone: recipe.dataset.Done})
      recipe.children[5].classList.toggle('done-1')
      if(recipe.dataset.Done === "0"){
        recipe.dataset.Done = "1"
      }else{
        recipe.dataset.Done = "0"
      }
    })
  })
};

const DeleteRecipes = (meal) => {
  fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};



const addEventtoAllDeleteBtns = (recipes) => {
  recipes.forEach((recipe) => {
    recipe.children[4].addEventListener('click', (e) => {
      alert('Recipe deleted')
      DeleteRecipes({recipes_id: recipe.dataset.id})
    })
  })
}


const allrecipes = () => {
  let allrecipes = document.querySelectorAll('.containerTwo')
  console.log(allrecipes)
  addEventToAllRecipes(allrecipes)
  addEventtoAllDeleteBtns(allrecipes)
}


let getRecipeBtn = document.getElementById('load-recipes');
getRecipeBtn.addEventListener('click', (event) => {
  const getRecipeFromdb = () => {
    fetch('/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      data.data.forEach((data) => {
        let poster = `<div data-id=${data.recipes_id} data-done=${data.Done} class="containerTwo">
        <div class="header">
          <h4>${data.idmeal}</h1>
          <h1>${data.title}</h3>
          <img src="${data.img}"></img>
        </div>
          <div class="things">
          <h5>Category: ${data.category}</h3>
          <h5>Area: ${data.area}</h3>
        </div>
        <table class="table">
          <tr>
          <td>${data.ingredients}</td>
          <td>${data.measures}</td>
          </tr>
        </table>
        <p>${data.instructions}</p>
        <button class="delete">Delete</button>
        <button class="btndone" class=${"done-" + data.Done}>Done</button>`
        container.insertAdjacentHTML('beforeend', poster)
      })
      allrecipes()
    })
    .catch((error) => {
      // console.error('Error:', error);
    });
  };
  getRecipeFromdb()
});


