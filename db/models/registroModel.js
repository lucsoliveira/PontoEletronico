module.exports = function(app, Sequelize, sequelize){

const Registro = sequelize.define('registro', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    colaboradorId: {
      type: Sequelize.INTEGER,
    },
    tipo: {
      type: Sequelize.INTEGER,
    }
     
  });


  /* Tipo: 0 - entrada
           1 - saída
  */
/*
Registro.sync({force: true}).then(() => {
  // Table created
  return Registro.create({
    colaboradorId: 1,
    tipo: 0,
  });
});

*/

  global.Registro = Registro;

}
