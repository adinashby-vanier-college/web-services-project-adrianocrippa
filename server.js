//THIS WAS AN EXAMPLE DURING CLASS...
/**
 * 
 * 
 * 
 */


//NOT RELATED TO THE PROJECT.

/**
 * 
 * 
 * 
 * 
 */
//VIEW ONLY, DONT LINK

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res)=>{
    console.log("Hello Vanier students");

    res.setHeader("Content-Type", "text/html");
    let path = "./";


    switch(req.url){
        case "/":
            res.statusCode = 200;
            path += "index.html";
            break;
        case "/about":
            res.statusCode = 200;
            path += "about.html";
            break;
        case "/about-us":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
            res.statusCode = 404;
            path += "404.html";
            break;

    }

    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else {
            res.write(data);
            res.end();
        }
    })
    


//console.log(req.url, req.method);

// res.setHeader("Content-Type", "text/plain");
// res.end("Hello, Vanier Students!");
// res.write("Hello, Vanier students!");
// res.write("At Park Ex!");
// res.end();


});

server.listen(3000, "localhost", ()=> {
    console.log ("Listening for requests on port 3000");
})