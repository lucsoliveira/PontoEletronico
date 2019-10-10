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

        Registro.findAll(
            { 
                limit: limit ,
                order: [
                    ['id', 'DESC']
                ] 
            }, 
            
            
            ).then(registros => {

            getJsonHeaders(req, res);

            if(!registros){

                sendMsgJson(req, res, 'error', 'Registros não encontrados.', null);
                
            }else{
                sendMsgJson(req, res, 'success', 'Registros encontrados!', registros)
            }

        })
          
  
    });

    //POST
    app.post('/api/post/registro', function(req,res){

        var colaboradorCPF = req.body.colaboradorCpf;
        var colaboradorSenha = req.body.colaboradorSenha;

        Colaborador.findOne({ 
            where: { cpf : colaboradorCPF, senha: colaboradorSenha} 
        })
        .then(colaborador => {

            
            if(!colaborador){

                sendMsgJson(req, res, 'error', 'Colaborador não encontrado.', null);

            }else{

                

                    Registro.findOne({ 
                        limit: 1,
                        where: {
                            //your where conditions, or without them if you need ANY entry
                            colaboradorId: colaborador.id
                          },
                        order: [
                            ['id', 'DESC']
                        ] 
                    }).then(function(registro){

                        

                        if(!registro || registro == null || registro.length == 0){

                            Registro.create({ 
                                colaboradorId: colaborador.id, 
                                tipo: 1,
                            });

                            
                        sendMsgJson(req, res, 'entrada', 'Registro de entrada gravado.', null);

                        }else{

                            if(registro.tipo == 1){

                                Registro.create({ 
                                    colaboradorId: colaborador.id, 
                                    tipo: 0,
                                });
                                

                                
                        sendMsgJson(req, res, 'saida', 'Registro de saída gravado.', null);
                            }
    
                            if(registro.tipo == 0){
    
                                

                                Registro.create({ 
                                    colaboradorId: colaborador.id, 
                                    tipo: 1,
                                });

                                sendMsgJson(req, res, 'entrada', 'Registro de entrada gravado.', null);
                                
                            }
    

                        }
                        
                        //only difference is that you get users list limited to 1
                        //entries[0]
                    }); 
                    


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
  