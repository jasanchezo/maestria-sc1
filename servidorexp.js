// DEFINICIÓN DE LIBRERIAS DE NODE JS
// MODULO PATH DE NODE JS
const pathLib = require('path');

// http://expressjs.com/ 
const expressLib = require('express');

// https://www.npmjs.com/package/ejs
const ejsLib = require('ejs');

// https://www.npmjs.com/package/body-parser 
const bodyParserLib = require('body-parser');

// https://www.npmjs.com/package/multer#readme
var multerLib = require('multer');

// LIBRERIA DE fs de NODEJS
const fsLib = require('fs');

// LIBRERIA DE fs-extra DE NODEJS PARA FUNCIONES SIMPLIFICADA DE file system
// https://www.npmjs.com/package/fs-extra
const fsExtraLib = require('fs-extra');






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


// http://www.embeddedjs.com/
// https://www.codementor.io/naeemshaikh27/node-with-express-and-ejs-du107lnk6 
appExpress.get('*', (req, res) => {
    // MOSTRAR INFORMACION DE LA URL EN LA CONSOLA
    // console.log(req.originalUrl);

    // SI EL REQUEST ES LA RAIZ ENTONCES RENDERIZAR LA VISTA INDEX
    if (req.originalUrl == '/') return res.render("page", {ruta: '/index'});

    // ... EN CASO CONTRARIO RENDERIZAR LA LIGA QUE SE SOLICITA EN EL REQUEST
    res.render("page", {ruta: req.originalUrl});
    
    // MOSTRAR INFORMACION EN NAVEGADOR
    // res.send("POR *: " + req.originalUrl);

    // RESPUESA DE UN ARCHIVO
    // res.sendFile(dirLib.join(__dirname+'/index.html'));

    // RESPUESTA DE UNA VISTA/PLANTILLA CON EJS
    // res.sendFile(dirLib.join(__dirname+'../views/index.ejs'));
});

uploadsPath = "./uploads";
separator = "|||";
dataForm = {};
localStorageFileName = "";

// FUNCION DE SUBIDA DE ARCHIVOS
// OPCIONES PARA MEJORAR FILTRADO: https://scotch.io/tutorials/express-file-uploads-with-multer 
// ARTICULO CON EJEMPLO CLARO DE CONFIGURACION DE ALMACENAMIENTO: https://www.ibm.com/developerworks/community/blogs/a509d54d-d354-451f-a0dd-89a2e717c10b/entry/How_to_upload_a_file_using_Node_js_Express_and_Multer?lang=en 
// EJEMPLO EN ESPAÑOL: http://www.tutorialesprogramacionya.com/javascriptya/nodejsya/detalleconcepto.php?codigo=24&punto=24&inicio=15 
var myStorage = multerLib.diskStorage({
    destination: function(req, file, callback) {
        callback(null, uploadsPath);
    },
    filename: function(req, file, callback) {
        // LE AGREGAMOS UN TIMESTAMP AL ARCHIVO PARA QUE NO SE SOBREESCRIBA AUN CON EL MISMO NOMBRE
        localStorageFileName = Date.now() + file.originalname;
        
        // CONSTRUCCION DEL ARREGLO dataForm PARA ENVIAR A LA VISTA lista
        dataForm = {name : req.body.name, email : req.body.email, phone : req.body.phone, website : req.body.website, message : req.body.message, myimage : localStorageFileName};
        
        // REGISTRAMOS LA INFORMACIÓN DEL form EN EL ARCHIVO DE INDICE
        // http://stackabuse.com/writing-to-files-in-node-js/
        fsLib.appendFile(uploadsPath + "/index.txt", req.body.name + separator + 
                                                req.body.email + separator + 
                                                req.body.phone + separator + 
                                                req.body.website + separator + 
                                                req.body.message + separator + 
                                                localStorageFileName +  "\n", (err) => {  
            // EN CASO DE ERROR EN LA ESCRITURA CACHAMOS EL EVENTO Y SALE DE EJECUCION DE MANERA CONTROLADA
            if (err) throw err;
        
            // IMPRESION EN CONSOLA EN CASO DE EXITO DE ESCRITURA
            // console.log("Archivo registrado");
        });

        // GUARDAMOS LA IMAGEN CON EL NOMBRE CONSTRUIDO
        callback(null, localStorageFileName);
    }
});

// CONFIGURAMOS MULTER PARA UN upload SIMPLE CON LA CONFIGURACION DE ALMACENAMIENTO DE storage Y ESPERANDO EL ARCHIVO DEL form DEL ELEMENTO file CON EL ATRIBUTO name IGUAL A myimage
var uploadFunc = multerLib({storage: myStorage}).single('myimage');

// RUTEO PARA RECIBIR EL COMANDO post CON LA RUTA /contact Y LO RECIBIMOS CON LA FUNCION DE multer
appExpress.post('/contact', function(req, res) {
    // SUBIMOS EL ARCHIVO, EN CASO DE ERROR DESPLEGAMOS MENSAJE
    uploadFunc(req, res, function(err) {
        if (err) return res.send("ERROR cargando archivo");
        
        // EN CASO DE EXITO IMPRIMIMOS EN PANTALLA MENSAJE
        // res.send("Archivo cargado");

        // CODIGO PARA MOVER UN ARCHIVO DE LA RUTA TEMPORAL A LA DEFINITIVA
        // https://stackoverflow.com/questions/3133243/how-do-i-get-the-path-to-the-current-script-with-node-js
        fsExtraLib.move(process.cwd() + "/uploads/" + localStorageFileName, process.cwd() + "/public/files/" + localStorageFileName, err => {
            if (err) return console.error(err);
        
            // console.log('Archivo movido a ruta definitiva');
        });

        // ENVIAR A LA VISTA lista ENVIANDO UN ARREGLO DE DATOS dataForm
        res.render('lista', dataForm);
    });
});


// POSICIONAMOS EL SERVICIO EN EL PUERTO 3000/TCP Y MOSTRAMOS UN MENSAJE DE SALIDA PARA MONITOREAR EL LANZAMIENTO DEL SERVICIO
appExpress.listen(3000, () => console.log('Ejemplo app listening on port 3000'));
