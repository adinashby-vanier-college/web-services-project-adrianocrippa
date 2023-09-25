const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res)=>{
    console.log("Test Eat Easier");

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
        case "/disclaimer":
            res.statusCode = 200;
            path += "disclaimer.html";
            break;
        case "/source":
            res.statusCode = 200;
            path += "source.html";
            break;
        default:
            res.statusCode = 404;
            path += "404.html";
            break;

    }
    if (req.url.match(/^\/css\//)) {
        var css = fs.readFileSync(request.url);
        res.writeHead(200,{"Content-Type": "text/css"});
        res.write(css);
        res.end();
        return;
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