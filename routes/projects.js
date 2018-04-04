/*Reference (Mentioned with thanks): http://teknosains.com/i/simple-crud-nodejs-mysql
Edited by Tharindu Weerasinghe for ABC Company (Pvt) Ltd.*/

/*Get all items*/
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM projects ORDER BY projid',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('projects',{page_title:"ABC Company Projects",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Render the add project page*/
exports.add = function(req, res){
  res.render('add_project',{page_title:"Add a Project, handled by ABC Company"});
};

/*Save the project*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            projid    		: input.projid,
            projname            : input.projname,
            projinfo 		: input.projinfo,
	    starteddate 	: input.starteddate,
	    currentstatus 	: input.currentstatus
        
        };
        
        var query = connection.query("INSERT INTO projects set ? ",data, function(err, rows)
        {
  
          if (err){
              console.log("Error inserting : %s ",err );
              res.redirect('/employees/duplicateEntry');	  
	   }
           
          else{
             res.redirect('/projects');
          }
          
        });
        
       console.log(query.sql); //get raw query
       console.log(input); //get result set in JSON
    
    });
};

/*Edit the item*/
exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM projects WHERE projid = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_project',{page_title:"Edit a Project (ABC Company)",data:rows});
                
           
         });
         
         console.log(query.sql);
    }); 
};

/*Save the edited item*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
	    projname            : input.projname,
            projinfo 		: input.projinfo,
	    starteddate 	: input.starteddate,
	    currentstatus 	: input.currentstatus            
        
        };
        
        connection.query("UPDATE projects set ? WHERE projid = ? ",[data,id], function(err, rows)
        {
  
          if (err){
              console.log("Error inserting : %s ",err );
              res.redirect('/employees/duplicateEntry');	  
	   }
           
          else{
             res.redirect('/projects');
          }
          
        });
    
    });
};


/*Delete the item*/
exports.delete_project = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM projects WHERE projid = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/projects');
             
        });
        
     });
};


