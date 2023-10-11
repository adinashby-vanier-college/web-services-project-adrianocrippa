
const titleInput = document.getElementById("title");
const recipeInput = document.getElementById("recipe");
const output = document.getElementById("output");
const appID = "88d46105";
const apiKey = "c5369472c0a51ae557ad559ca2555846";
const btnFind = document.querySelector(".btn");
const txtSearch = document.querySelector("#txtSearch");
const nutritionContainer = document.querySelector("#nutrition-container");
const loadingEle = document.querySelector("#loading");

const toggleLoad = (element, isShow) =>{
    element.classList.toggle("hide", isShow);
};

function fetchNutrition (){
    //let title = titleInput.value;
    let ingr = txtSearch.value.split("\n");
    
    return fetch(`https://api.edamam.com/api/nutrition-details?app_id=${appID}&app_key=${apiKey}`, {
        method: "POST",
        cache: "no-cache",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ingr})
        //body: JSON.stringify({title, ingr})
    })
    .then(response => response.json())
    .then ((data) => {renderNutrion(data); toggleLoad(loadingEle, true); })
    .catch((error) => toggleLoad(loadingEle, false))
    //.finally(() => setScrollPosition());
}

btnFind.addEventListener("click", ()=>fetchNutrition());

const renderNutrion = (data = []) => {
    nutritionContainer.innerHTML ="";
    let fragments =[];

        Object.keys(data.totalDaily).forEach(key => {
            let obj = data.totalDaily[key];

            fragments.push(`<dt>${obj.label}</dt><dd>${obj.quantity}${obj.unit}</dd>`);
        });
            
            let html = `<dl>
            <dt>Calories</dt>
            <dd>${data.calories}</dd>
            ${fragments.join('')}
            </dl>`;

    nutritionContainer.innerHTML = html;
 
};






