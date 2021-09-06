// lib and imports
const express = require("express");
const app = express();

const recipe = require("./controllers/recipe")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('recipe.ejs');
});


// Create here your api setup

app.post('/api/addrecipe', (req, res) => {
  recipe.addRecipeToDB(req.body)
});

app.post('/api/recipe', recipe.getRecipeFromdb);

app.post('/api/update', (req, res) => {
  recipe.updateRecipes(req.body)
  // console.log(req.body)
});

app.post('/api/delete', (req, res) => {
  recipe.deleteRecipes(req.body)
  // console.log(req.body)
});

app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));
