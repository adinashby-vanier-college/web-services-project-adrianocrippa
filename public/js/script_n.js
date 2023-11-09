const titleInput = document.getElementById("title");
const recipeInput = document.getElementById("recipe");
const output = document.getElementById("output");
const appID = "88d46105";
const apiKey = "c5369472c0a51ae557ad559ca2555846";
const btnFind = document.querySelector(".btn");
const txtSearch = document.querySelector("#txtSearch");
const nutritionContainer = document.querySelector("#nutrition-container");
const loadingEle = document.querySelector("#loading");

const toggleLoad = (element, isShow) => {
  element.classList.toggle("hide", isShow);
};

function fetchNutrition() {
  let ingr = txtSearch.value.split("\n");

  return fetch(
    `https://api.edamam.com/api/nutrition-details?app_id=${appID}&app_key=${apiKey}`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingr })
    }
  )
    .then((response) => response.json())
    .then((data) => {
      renderNutrion(data);
      toggleLoad(loadingEle, true);
    })
    .catch((error) => toggleLoad(loadingEle, false));
}

btnFind.addEventListener("click", () => fetchNutrition());
txtSearch.addEventListener("keyup", (e) => {
    
    if(e.keyCode ===13){
        fetchNutrition();
    }
} );

const renderNutrion = (data = []) => {
  nutritionContainer.innerHTML = "";
  let fragments = [];

  Object.keys(data.totalDaily).forEach((key) => {
    let obj = data.totalDaily[key];

    fragments.push(
      `<b>${obj.label}</b>${"        "}${parseFloat(obj.quantity).toFixed(1)}${
        obj.unit
      }<br>`
    );
  });

  let calorieMessage = "";

  calorieMessage = GetAnalyzeCaloriesMesssage(data);
  let html = `
          ${calorieMessage}<b>CALORIES</b> ${data.calories}<br>  ${fragments.join("")}
            `;

  nutritionContainer.innerHTML = html;
};


function GetAnalyzeCaloriesMesssage(data)
{
  if (data.calories > 1000) {
    return `<b style="color:red; font-size:30px">Attention</b> ingredient with high caloric value, not healthy <br>`;
  } else {
    return `<b style="color:green; font-size:30px">Healthy </b>ingredient <br>`;
  }
}