const http = require('http')
const fs = require('fs')   
  let path  = '';
const server = http.createServer((req, res) => {
    console.log('Requset  Made ')
    res.setHeader('content-Type', 'text/html')

        switch (req.url) {
            case '/':
            path = 'home.html';
             break;
            case '/about':
            path = 'about.html';
            break;
               case '/about-me':
          res.statusCode = 301

          res.setHeader('Location'  ,'/about')
     
            break;
            default:
            path = '404.html'
            break;
        }

    fs.readFile(path, 'utf-8', (err, data) => {
        res.end(data)

    });
})
server.listen(5000, () => {
    console.log("Listening For Requsets On port 5000")
})
