
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

app.get('/nutrition',(req,res) => {
    res.render("nutrition_test.ejs");
})

//use means anything else....
app.use((req, res) => {
    res.status(404).sendFile('public/views/404.html', { root: __dirname });
});


app.listen(3000, () => {
    console.log("CONNEXION ESTABILSHED . . .")
    console.log("Current Port : 3000 . . .")
});