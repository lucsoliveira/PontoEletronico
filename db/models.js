module.exports = function(app, Sequelize, sequelize){
    require('./models/colaboradorModel')(app, Sequelize, sequelize);
    require('./models/registroModel')(app, Sequelize, sequelize);
    //require('./models/registroPontoModel')(app);
}
