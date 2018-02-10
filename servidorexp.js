// DEFINICIÓN DE LIBRERIAS DE NODE JS
const expressLib = require('express');
const dirLib = require('path');
const plantilla = require('ejs');

// INSTANCIAMOS EXPRESS
var app = expressLib();

app.use(expressLib.static('public'));
app.use(expressLib.static('views'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    // res.send('Hola Mundo!');
    // res.sendFile(dirLib.join(__dirname+'/index.html'));
    // res.sendFile(dirLib.join(__dirname+'../views/index.ejs'));

    res.render("page");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});


// POSICIONAMOS 
app.listen(3000, () => console.log('Ejemplo app listening on port 3000'));
