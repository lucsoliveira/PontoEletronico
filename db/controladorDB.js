var Sequelize = require('sequelize');

module.exports = function(app){
    const Op = Sequelize.Op;
    //SEQUELIZE CONNECTION

    
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db/bancoDados.sqlite'
      });
    
    
    global.sequelize = sequelize;
    global.Op = Op;

    require('./models')(app, Sequelize, sequelize);//Pega todos os modelos
}
