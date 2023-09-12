const appId = "32c7753d";
const appKey = "38abef7a3d6b628ea191f51716bbb1b4";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
const loadingEle = document.querySelector("#loading");

btnFind.addEventListener("click", ()=>loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputValue = txtSearch.value;
    if(e.keyCode ===13){
        loadRecipes(inputVal);
    }
} );

const toggleLoad = (element, isShow) =>{
    element.classList.toggle("hide", isShow);
};

const setScrollPosition = () => {
    recipeContainer.scrollTo({ top:0, behavior: "smooth "});
};

function loadRecipes(type = "paneer"){
    
    //console.log("enntrou no loadREcipes");
    const url = baseUrl + `&q=${type}`;
    fetch (url)
        .then((res) => res.json())
        .then ((data) => {renderRecipes(data.hits);
        toggleLoad(loadingEle, true);
})
        .catch((error) => toggleLoad(loadingEle, false))
        .finally(() => setScrollPosition());
}

loadRecipes();

const getRecipeStepStr = (ingredientLines = []) =>{
    let str = "";
    for (var step of ingredientLines){
        str = str + `<li>${step}</li>`;
    }
    return str;

};


const renderRecipes = (recipeList = []) => {
    recipeContainer.innerHTML ="";
    recipeList.forEach((recipeObj) => {
        const { 
            label: recipeTitle, ingredientLines, image: recipeImage, } = recipeObj.recipe;
            const recipeStepStr=getRecipeStepStr(ingredientLines);
        const htmlStr = `<div class="recipe">
      <div class="recipe-title">${recipeTitle}</div>
      <div class="recipe-image">
        <img src="${recipeImage}" alt="Recipe" />
      </div>
      <div class="recipe-text">
        <ul>
          ${recipeStepStr}
        </ul>
      </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);


    });
};

