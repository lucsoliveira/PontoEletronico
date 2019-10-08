module.exports = function(app){

  require('./dashboard')(app);//Pega todos os modelos
  require('./restAPI')(app);//Pega todos os modelos


}
