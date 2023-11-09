API Documentation

Calorie Analyzer


Calorie Analyzer API is an integration in Eat Easier Web Services Project. 
Introduction
The Calorie Analyzer API allows you to determine whether an ingredient is healthy or not based on its calorie value. The API takes an ingredient's calorie value as input and provides a message as output.

API Endpoints
1. Analyze Calories
This endpoint analyzes the calorie content of ingredients and provides a message indicating whether the ingredients are healthy or not based on their calorie value.
Endpoint: `/api/analyze-calories`
HTTP Method: GET
Parameters:
- `ingredient` (Query Parameter): A string representing the ingredient(s) to be analyzed. 
Request Example:

GET / api/analyze-calories?ingredient=%2210%20oz%20sugar%22

Response Example:
{"value":"Attention - ingredient with high caloric value, not healthy!!"}

How to Use

To use the Calorie Analyzer API, follow these steps:
1. Include the necessary JavaScript functions in your application:
```javascript
function GetAnalyzeCaloriesMesssage(data) {
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

// Define an Express.js route to use the API
app.get('/api/analyze-calories', async (req, res) => {
  var calorieAnalisisMessage = { value: "no answer" };
  await fetchCalorieAnalisis(req.query.ingredient, calorieAnalisisMessage);
  res.json(calorieAnalisisMessage);
});
```

2. Call the API using the `/api/analyze-calories` endpoint. You can do this through an HTTP request in your application, passing the `ingredient` parameter with the ingredients you want to analyze.

3. Receive and display the response in your application. You can use the `calorieAnalisisMessage` value to determine whether the ingredients are healthy or not based on their calorie content.

Here's an example of how to display the response in an HTML page:

```javascript
let calorieMessage = GetAnalyzeCaloriesMesssage(data);
let html = `
    ${calorieMessage}<b>CALORIES</b> ${data.calories}<br>  ${fragments.join("")}
`;

nutritionContainer.innerHTML = html;
```

