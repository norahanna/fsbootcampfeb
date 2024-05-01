const express = require('express');
const app = express();

app.use(express.json());

const customers = [
    {id: 1, name: "Harsh"},
    {id: 2, name: "Test"},
    {id: 3, name: "Sam"},
];

app.get('/', (request, response) => {
    response.send('The is another message');
});

app.get('/customers', (request, response) => {

    if(!customers) response.status(404).send('Customer not found');
    response.send(customers);
});

app.get('/customers/:id', (request, response) => {

    // try to find the customer using find function
    var customer = customers.find(x => x.id == request.params.id);        
    if(!customer) response.status(404).send('Customer not found');    
    response.send(customer);
});

app.listen(3000, () => {
    console.log('Application is running');
})

app.post('/customers', (request, response)=> {
    if(!request.body.name) response.status(404).send('please provide customer name');
    
    var customer = {
        id: customers.length + 1
        name: request.body.name
    }
    customers.push(customers);
    response.send(customers);
})

app.put('customers/:id', (request, response)=> {
    var customer = customers.find(x => x.id == request.params.id);        
    if(!customer) response.status(404).send('Customer not found');
})

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
})