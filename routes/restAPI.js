module.exports = function(app){

    app.get('/api/get/colaborador/:id', 
    function(req, res){


        var colaboradorId = req.params.id;

        Colaborador.findOne({ where: {id: colaboradorId} }).then(colaborador => {

            getJsonHeaders(req, res);

            if(!colaborador){

                sendMsgJson(req, res, 'error', 'Colaborador não encontrado.', null);
                
            }else{
                sendMsgJson(req, res, 'success', 'Colaborador encontrado!', colaborador)
            }

        })
          
  
    });

    //  -> api/get/registro/recentes?limit=10
    app.get('/api/get/registro/recentes', 
    function(req, res){

        var limit = req.query.limit;

        Registro.findAll({ limit: limit }).then(registros => {

            getJsonHeaders(req, res);

            if(!registros){

                sendMsgJson(req, res, 'error', 'Registros não encontrados.', null);
                
            }else{
                sendMsgJson(req, res, 'success', 'Registros encontrados!', registros)
            }

        })
          
  
    });


    function sendMsgJson(req,res, type, msg, data){
        
        getJsonHeaders(req,res);
    
        res.json({
          type: type,
          msg : msg,
          data: data
        });
    
      }    
    
      function getJsonHeaders(req, res){
        res.setHeader('Content-Type', 'application/json');
        app.set('json spaces', 40);
        res.setHeader('Access-Control-Allow-Origin', '*');
          //res.setHeader('Access-Control-Allow-Origin', site.baseUrl);
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
      }
      

}
  