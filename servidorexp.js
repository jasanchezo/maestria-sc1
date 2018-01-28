var expLib = require('express');

var app = expLib();

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.listen(3001, () => console.log('Ejemplo app listening on port 3001'));
