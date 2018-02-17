// DEFINICIÓN DE LIBRERIAS DE NODE JS
const expressLib = require('express');
const dirLib = require('path');
const plantilla = require('ejs');

// INSTANCIAMOS EXPRESS
var app = expressLib();

// PREPARAMOS EL ENTORNO GENERAL
app.use(expressLib.static('public'));
app.use(expressLib.static('views'));
app.set("view engine", "ejs");

// RUTEO PARA PAGE
app.get('/', (req, res) => {
    // res.send('Hola Mundo!');
    // res.sendFile(dirLib.join(__dirname+'/index.html'));
    // res.sendFile(dirLib.join(__dirname+'../views/index.ejs'));

    console.log(req.originalUrl);

    res.render("index");
});

// RUTEO PARA SERVICE
app.get('/service', (req, res) => {
    console.log(req.originalUrl);
    res.render("service");
});

// RUTEO PARA TEAM
app.get('/team', (req, res) => {
    console.log(req.originalUrl);
    res.render("team");
});

// RUTEO PARA SKILLS
app.get('/skills', (req, res) => {
    console.log(req.originalUrl);
    res.render("skills");
});

// RUTEO PARA PORTFOLIO
app.get('/portfolio', (req, res) => {
    console.log(req.originalUrl);
    res.render("portfolio");
});

// RUTEO PARA PRICE
app.get('/price', (req, res) => {
    console.log(req.originalUrl);
    res.render("price");
});

// RUTEO PARA CONTACT
app.get('/contact', (req, res) => {
    console.log(req.originalUrl);
    res.render("contact");
});

// POSICIONAMOS EL SERVICIO EN EL PUERTO 3000/TCP
app.listen(3000, () => console.log('Ejemplo app listening on port 3000'));
