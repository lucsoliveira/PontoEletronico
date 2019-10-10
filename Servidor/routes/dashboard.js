module.exports = function(app){

    //GETS
    app.get('/', 
    function(req, res){
  
        res.redirect('/dashboard');
  
    });

    app.get('/:page/', 
    function(req, res){

        var getPage = req.params.page;
        var getAction = req.query.action;
        var getId = req.query.id;
        var msg = req.query.msg;
        
        res.render('index', { 
            getPage : getPage,
            getAction: getAction,
            msg: msg
        })
        
  

  
    });

    //POSTS
    app.post('/colaborador/adicionar', function(req,res){

        var dadoForm = req.body;

        //verifica se já existe o colaborador cadastrado
        Colaborador.findAll({ where: { rg: dadoForm.rg } }).then(colaborador => {

            //se não existe o colaborador, irá criar um
            if(!colaborador || colaborador.length == 0){

                Colaborador.create({ 
                    nomeCompleto: dadoForm.nomeCompleto, 
                    dataNascimento: dadoForm.dataNascimento, 
                    senha: dadoForm.senha, 
                    endereco: dadoForm.endereco, 
                    rg: dadoForm.rg, 
                    cpf: dadoForm.cpf, 
                    telefone: dadoForm.telefone, 
                });

                res.redirect('/colaborador?action=add&msg=success')

            //caso contrário, redireciona a pagina de criação
            }else{

                console.log(colaborador)
                res.redirect('/colaborador?action=add&msg=colaboradorExistente')

            }
            // projects will be an array of Project instances with the specified name
        })
          


    })
      

}
  