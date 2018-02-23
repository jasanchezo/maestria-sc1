// DEFINICIÓN DE LIBRERIAS DE NODE JS
// MODULO PATH DE NODE JS
const pathLib = require('path');

// http://expressjs.com/ 
const expressLib = require('express');

// https://www.npmjs.com/package/ejs
const ejsLib = require('ejs');

// https://www.npmjs.com/package/body-parser 
const bodyParserLib = require('body-parser');


// INSTANCIAMOS EXPRESS
var appExpress = expressLib();

// PARÁMETRO DE CONFIGURACIÓN DE BODY-PASER
var urlencodedParser = bodyParserLib.urlencoded({ extended: false });

// HABILITAMOS BODY-PARSER COMO PARSER JSON
appExpress.use(bodyParserLib.json());

// PREPARAMOS EL ENTORNO GENERAL
appExpress.use(expressLib.static('public'));
appExpress.use(expressLib.static('views'));
appExpress.set("view engine", "ejs");


appExpress.get('*', (req, res) => {
    // MOSTRAR INFORMACION DE LA URL EN LA CONSOLA
    console.log(req.originalUrl);

    // SI EL REQUEST ES LA RAIZ ENTONCES RENDERIZAR LA VISTA INDEX
    if (req.originalUrl == '/') res.render("page", {ruta: '/index'});

    // ... EN CASO CONTRARIO RENDERIZAR LA LIGA QUE SE SOLICITA EN EL REQUEST
    res.render("page", {ruta: req.originalUrl});
    
    // MOSTRAR INFORMACION EN NAVEGADOR
    // res.send("POR *: " + req.originalUrl);

    // RESPUESA DE UN ARCHIVO
    // res.sendFile(dirLib.join(__dirname+'/index.html'));

    // RESPUESTA DE UNA VISTA/PLANTILLA CON EJS
    // res.sendFile(dirLib.join(__dirname+'../views/index.ejs'));
});


// POST /login gets urlencoded bodies MÉTODO PARA EL COMANDO POST EN LA RUTA /contact USANDO EL PARSER DE 
appExpress.post('/contact', urlencodedParser, function (req, res) {
    // SI NO SE RECIBE EL CONTENIDO CORRECTO DE BODY ENTONCES SE REGRESA (return) UN ESTATUS DE NOT FOUND (400) EN EL PROTOCOLO DE HTTP
    if (!req.body) return res.sendStatus(400);

    // EN CASO DE ENCONTRARSE CONTENIDO DE BODY SE CONTINUA CON LA EJECUCIÓN, MOSTRANDO LOS DATOS DEL FORM PARSEADOS
    console.log(req.body.name + " " + req.body.email + " " + req.body.phone + " " + req.body.website + " " + req.body.message);
    
    // MOSTRAR SOLO EL DATO CAPTURADO
    res.send('welcome, ' + req.body.name + " " + req.body.email + " " + req.body.phone + " " + req.body.website + " " + req.body.message);
    // res.render("contact");
  });

// POSICIONAMOS EL SERVICIO EN EL PUERTO 3000/TCP Y MOSTRAMOS UN MENSAJE DE SALIDA PARA MONITOREAR EL LANZAMIENTO DEL SERVICIO
appExpress.listen(3000, () => console.log('Ejemplo app listening on port 3000'));
