const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((request, response, next) => {
    console.log('Running for every request');
    next();
});

const customers = [
    {id: 1, name: "Harsh"},
    {id: 2, name: "Test"},
    {id: 3, name: "Sam"},
];

const user = [
    { name: "Test", email: "test@gmail.com", password: "password" },    
]

app.get('/', (request, response) => {
    response.redirect('/customers');
});

app.get('/customers', (request, response) => {

    if(!customers) response.status(404).send('Customer not found');
    response.send(customers);
});

//grab a particular customer

app.get('/customers/:id', (request, response) => {
    
    // try to find the customer using find function
    var customer = customers.find(x => x.id == request.params.id);        
    if(!customer) response.status(404).send('Customer not found');    
    response.send(customer);
});

app.post('/customers', (request, response) => {
    
    //validate if the customer has a name
    if(!request.body.name) response.status(404).send('Please provide a customer name');

    var customer = {
        id: customers.length + 1,
        name: request.body.name
    }
    customers.push(customer);
    response.send(customer);
});

//update request
app.put('/customers/:id', (request, response) => {

    
    //validate if the customer exist
    var customer = customers.find(x => x.id == request.params.id);        
    if(!customer) response.status(404).send('Customer not found');  
    
    //validate if we got a name to update
    if(!request.body.name) response.status(404).send('Please provide a customer name');

    //update logic
    customer.name = request.body.name;
    response.send(customer);
});

app.delete('/customers/:id', (request, response) => {
    //validate if the customer exist
    var customer = customers.find(x => x.id == request.params.id);        
    if(!customer) response.status(404).send('Customer not found');

    var index = customers.indexOf(customer);
    customers.splice(index,1);
    response.send(customers);
})

app.post('/register/', (request, response) => {
    
    //email
    //name
    //password    

    //validate if we have all 3 values
    //use this example and modify it
    // if(!request.body.name) response.status(404).send('Please provide a customer name');


    // use this code as a reference code to add your newly register user to user object
    // var customer = {
    //     id: customers.length + 1,
    //     name: request.body.name
    // }
    // customers.push(customer);

    response.send(user);
    // var user_register =

});

app.all('*', (request, response) => {
    response.send("404 Page not found");
});

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
})