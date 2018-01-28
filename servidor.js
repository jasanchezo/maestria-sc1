const myHTTPService = require('http');

const myHostname = '127.0.0.1';
const myPort = 3000;

const myServer = myHTTPService.createServer((myRequest, myResponse) => {
    myResponse.statusCode = 200;
    // myResponse.setHeader('Content-type', 'text/plain');
    myResponse.setHeader('Content-type', 'application/json');
    // myResponse.end('Hola Mundo\n');
    myResponse.end('{ "Mensaje" : "Hola Mundo" }');
});

myServer.listen(myPort, myHostname, () => {
    console.log(`Server running at http://${myHostname}:${myPort}/`);
});