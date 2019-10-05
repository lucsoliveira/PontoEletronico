module.exports = function(app, Sequelize, sequelize){

const Colaborador = sequelize.define('colaborador', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nomeCompleto: {
      type: Sequelize.STRING,
    },
    dataNascimento: {
      type: Sequelize.STRING,
    },
    endereco: {
      type: Sequelize.STRING,
    },
    rg: {
      type: Sequelize.STRING
    },
    cpf: {
      type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING
      },

      telefone: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
     
  });


/*
// force: true will drop the table if it already exists
Colaborador.sync({force: true}).then(() => {
  // Table created
  return Colaborador.create({
    nomeCompleto: '111',
    dataNascimento: '212',
    endereco: 'skdjioj',
    rg: 'sajkondjasd',
    cpf: 'sioadjiasd',
    email: '2',
    telefone: '1',
    senha: '1',
  });
});
*/
  global.Colaborador = Colaborador;

}
