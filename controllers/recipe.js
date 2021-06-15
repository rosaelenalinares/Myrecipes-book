const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES
// ADD RECIPE TO DB
const addRecipeToDB = (data) => {
  let db = new sqlite3.Database('db/db.MyCookingBook');
let ingredients = [data.strIngredient1, data.strIngredient2, data.strIngredient3, data.strIngredient4, data.strIngredient5, data.strIngredient6, data.strIngredient7, data.strIngredient8, data.strIngredient9, data.strIngredient10,
data.strIngredient11, data.strIngredient12, data.strIngredient13, data.strIngredient14, data.strIngredient15, data.strIngredient16, data.strIngredient17];

let measures = [data.strMeasure1, data.strMeasure2, data.strMeasure3, data.strMeasure4, data.strMeasure5, data.strMeasure6, data.strMeasure7, data.strMeasure8, data.strMeasure9, data.strMeasure10,
data.strMeasure11, data.strMeasure12, data.strMeasure13, data.strMeasure14, data.strMeasure15, data.strMeasure16, data.strMeasure17]

  db.run(`INSERT INTO recipes (idmeal, title, img, category, area, instructions, ingredients, measures) VALUES (?,?,?,?,?,?,?,?)`, [[data.idMeal], [data.strMeal], [data.strMealThumb], [data.strCategory], [data.strArea], [data.strInstructions], ingredients, measures],

  function (err) {

      if (err) {
        return console.log(err);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  console.log(data)

  db.close();
};




//GET RECIPE FROM DB
const getRecipeFromdb = (req, res) => {

  let sendData = {data: []};

  let db = new sqlite3.Database('db/db.MyCookingBook', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the recipes database.');
  });
   db.serialize(() => {
    db.each(`SELECT * FROM recipes`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row)
      sendData.data.push(row)
    });
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(sendData)
    res.send(sendData)
    console.log('Close the database connection.');
  });
};


//UPDATE RECIPES
const updateRecipes = (recipe) => {
  let done
  if(recipe.isDone === "0"){
    done = 1
  }else{
    done = 0
  }
  console.log("I will update the recipe with the id", recipe.recipes_id)
  let db = new sqlite3.Database('db/db.MyCookingBook');


  db.run(`UPDATE recipes SET Done = ? WHERE recipes_id = ?`, [done, recipe.recipes_id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);

  });

  // close the database connection
  db.close();
  // console.log('update recipes', recipe.recipes_id)
};



//DELETE RECIPES
const deleteRecipes = (recipe) => {
  // console.log('Im ready to delete the recipes with the id: ', recipe.recipes_id)
  let db = new sqlite3.Database('db/db.MyCookingBook', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let id = recipe.recipes_id;
  // delete a row based on id
  db.run(`DELETE FROM recipes WHERE recipes_id=?`, id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}


exports.addRecipeToDB = addRecipeToDB;
exports.getRecipeFromdb = getRecipeFromdb;
exports.updateRecipes = updateRecipes;
exports.deleteRecipes = deleteRecipes;