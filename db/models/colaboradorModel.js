module.exports = function(app, Sequelize, sequelize){

const Timing = sequelize.define('timing', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idUser: {
      type: Sequelize.INTEGER,
    },
    idTask: {
      type: Sequelize.INTEGER,
    },
    startAt: {
      type: Sequelize.STRING
    },

    finishedAt: {
        type: Sequelize.STRING
      },

      timeSecondsTask: {
        type: Sequelize.INTEGER
      },
      productivity: {
        type: Sequelize.INTEGER
      },

      humorBefore: {
        type: Sequelize.INTEGER
        },
    
      humorAfter: {
      type: Sequelize.INTEGER
      },

      moreInformation: {
        type: Sequelize.STRING
      },  
     
  });


/*
// force: true will drop the table if it already exists
Timing.sync({force: true}).then(() => {
  // Table created
  return Timing.create({
    idTask: 111,
    idUser: 212,
    startAt: 'skdjioj',
    finishedAt: 'sajkondjasd',
    timeSecondsTask: 'sioadjiasd',
    productivity: 2,
    humorAfter: 1,
    humorBefore: 1,
    moreInformation: 'Apenas um teste',
  });
});
*/
  global.Timing = Timing;

}
