
/**this
 * 
 * one we use express to simplify!!!!
 */

const express = require('express');
const path = require("path");


//initialize express app
const app = express();


app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));






// Configurar o middleware para servir arquivos estáticos do diretório "public"
//ADDING THE STATIC FUNCTIONS TO DISPLAY CSS

//express.static(root, [options]);

//app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/about', (req, res) => {
    res.render("about.ejs");
});


app.get('/sources',(req,res) => {
    res.render("sources.ejs");
})

app.get('/disclaimer',(req,res) => {
    res.render("disclaimer.ejs");
})

app.get('/recipe_result',(req,res) => {
    res.render("recipe_result.ejs");
})

app.get('/nutrition_test',(req,res) => {
    res.render("nutrition_test.ejs");
})

function GetAnalyzeCaloriesMesssage(data)
{
  if (data.calories > 1000) {
    return `Attention - ingredient with high caloric value, not healthy!!`;
  } else {
    return `Healthy ingredient!!`;
  }
}

function fetchCalorieAnalisis(ingredient, calorieAnalisisMessage) {
    const _appID = "88d46105";
    const _apiKey = "c5369472c0a51ae557ad559ca2555846";
    let ingr = ingredient.split("\n");

    return fetch(
        `https://api.edamam.com/api/nutrition-details?app_id=${_appID}&app_key=${_apiKey}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingr }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        calorieAnalisisMessage.value = GetAnalyzeCaloriesMesssage(data);
      })
      .catch((error) => console.log(error));
  }

app.get('/api/analyze-calories', async (req,res) => {
    var calorieAnalisisMessage = { value: "no answer" };
    await fetchCalorieAnalisis(req.query.ingredient, calorieAnalisisMessage);
    res.json(calorieAnalisisMessage);
})

//use means anything else....
app.use((req, res) => {
    res.status(404).sendFile('public/views/404.html', { root: __dirname });
});


app.listen(3000, () => {
    console.log("CONNEXION ESTABILSHED . . .")
    console.log("Current Port : 3000 . . .")
});