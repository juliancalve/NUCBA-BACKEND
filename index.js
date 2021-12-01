const express = require('express');
// import express from 'express';

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );
app.use( cors() );

// Endpoints
app.get('/api/hola', (req, res) => {
    res.send('me llamaste a hola');
});

app.post('/api/login', (req, res) => {
    try {
        // const email = req.body.email;
        // const password = req.body.password;
        const { email, password } = req.body;
        // conectarnos a una db, vamos a preguntar si el email existe y sitiene esa contraseña
        // y si la tiene, solo obtenemos el token de la db y lo retornamos

        if( email === 'pepe@pepe.com' && password === 'pass12345' ){
    
            const token = 'sd-ag65dsfg3dfasdfsdf';
            res.send({ data: { token }, problem: null });
        } else {
            res.send({ data: null, problem: { message: 'email o apss invalidos' }});
        }

    } catch( error ){
        throw new Error(error);
    }

});

app.get('/api/otra-cosa', (req, res) => {
    let token = req.headers.authorization;
    token = token?.replace('Bearer ');
    if(token) {
        res.send({ products: [ { name: 'zanahoria '}]})
    } else {
        res.send({ message: 'se necesita token'});
    }

});

app.delete('/api/users/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    res.send(`Eliminaste el usuario con id ${id}`);
})


app.listen(3100, () => {
    console.log('Mi app esta corriendo en el puerto 3100');
})

