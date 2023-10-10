
/**this
 * 
 * one we use express to simplify!!!!
 */

const express = require('express');

//initialize express app
const app = express();

app.set("view-engine", "ejs");




// Configurar o middleware para servir arquivos estáticos do diretório "public"
//ADDING THE STATIC FUNCTIONS TO DISPLAY CSS

//express.static(root, [options]);

//app.use(express.static('public'));


app.get('/',(req,res) => {
    
    //render, assistir aulq
    res.render("/public/views/index.ejs");
});

app.get('/about',(req,res) => {
    res.render("/public/views/about.ejs");
});

app.get('/sources',(req,res) => {
    res.render("/public/views/sources.ejs");
})

app.get('/disclaimer',(req,res) => {
    res.render("/public/views/disclaimer.ejs");
})

app.get('/recipes',(req,res) => {
    res.render("/public/views/recipe_test.ejs");
})

app.get('/nutrition',(req,res) => {
    res.render("/public/views/nutrition_test.ejs");
})

//use means anything else....
app.use((req, res) =>{
    res.status(404).sendFile('/public/views/404.html', {root: __dirname});
})

app.listen(3000, () => {
    console.log("CONNEXION ESTABILSHED . . .")
    console.log("Current Port : 3000 . . .")
});