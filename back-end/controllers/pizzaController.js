const pizza = require('./pizza/pizza.js');
const pizzaOrder = require('./pizza/pizzaOrder.js');

module.exports = function (app) {
    // Gestion des pizzas
    app.get('', pizza.getPizza);
    app.get('/:name', pizza.getPizzaId);

    app.post('/add', pizza.addPizza);

    app.put('/setPrice', pizza.setPrice);

    app.delete('', pizza.deletePizza);

    // Gestion des commandes
    app.post('/pizzaOrder', pizzaOrder.addPizzaOrder);
}
