module.exports = function(app){

    app.get('/', 
    function(req, res){
  
        res.redirect('/dashboard');
  
    });

    app.get('/:page/', 
    function(req, res){

        var getPage = req.params.page;
        var getAction = req.query.action;
        var getId = req.query.id;
        
        res.render('index', { 
            getPage : getPage,
            getAction: getAction
        })
        
  

  
    });
      

}
  