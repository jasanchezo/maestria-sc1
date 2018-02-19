// DEFINICIÓN DE LIBRERIAS DE NODE JS
const expressLib = require('express');
const dirLib = require('path');
const plantilla = require('ejs');
const parseador = require('body-parser');

// INSTANCIAMOS EXPRESS
var app = expressLib();

// PARÁMETRO DE CONFIGURACIÓN DE BODY-PASER
var urlencodedParser = parseador.urlencoded({ extended: false });

// HABILITAMOS BODY-PARSER COMO PARSER JSON
app.use(parseador.json());

// PREPARAMOS EL ENTORNO GENERAL
app.use(expressLib.static('public'));
app.use(expressLib.static('views'));
app.set("view engine", "ejs");

// RUTEO PARA INDEX
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

// POST /login gets urlencoded bodies
app.post('/contact', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body.name + " " + req.body.email + " " + req.body.phone + " " + req.body.website + " " + req.body.message);
    // MOSTRAR SOLO EL DATO CAPTURADO
    res.send('welcome, ' + req.body.name + " " + req.body.email + " " + req.body.phone + " " + req.body.website + " " + req.body.message);
    // res.render("contact");
  });

// POSICIONAMOS EL SERVICIO EN EL PUERTO 3000/TCP
app.listen(3000, () => console.log('Ejemplo app listening on port 3000'));

/*
FORMA DE RECIBIR CUALQUIER DATO EN EL REQUEST
app.get('*', (req, res) => {
    console.log(req.originalUrl);
    res.render("contact");
});
*/