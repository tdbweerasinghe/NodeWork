/*Reference (Mentioned with thanks): http://teknosains.com/i/simple-crud-nodejs-mysql
Edited by Tharindu Weerasinghe*/

/*Get all releases*/
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT relid, DATE_FORMAT(releasedate, "%Y-%m-%d") d, releaseinfo from releases ORDER by d desc',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('releases',{page_title:"ABC Company Project-Releases",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Get releases per project*/
exports.listByProjID = function(req, res){
  
  var id = req.params.id;

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT relid, DATE_FORMAT(releasedate, "%Y-%m-%d") d, releaseinfo FROM releases where projid = ? ORDER BY d desc', [id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('releases',{page_title:"ABC Company Project-Releases",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Render the add release page*/
exports.add = function(req, res){
  res.render('add_releases',{page_title:"Add a release, Related to a Project"});
};

/*Save the release*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            relid    		: input.relid,
            releaseinfo 	: input.releaseinfo,
	    releasedate 	: input.releasedate,
            projid 	        : input.projid,
        };
        
        var query = connection.query("INSERT INTO releases set ? ",data, function(err, rows)
        {
  
          if (err){
              console.log("Error inserting : %s ",err );
              res.redirect('/employees/duplicateEntry');	  
	   }
           
          else{
             res.redirect('/releases');
          }
         
          
        });
        
       console.log(query.sql); //get raw query
       console.log(input); //get result set in JSON
    
    });
};

/*Edit an existing release*/
exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT relid, DATE_FORMAT(releasedate, "%Y-%m-%d") releasedate, releaseinfo, projid FROM releases WHERE relid = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_releases',{page_title:"Edit a Release related to a Project",data:rows});
                
           
         });
         
         console.log(query.sql);
    }); 
};

/*Save the edited release*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            relid    		: input.relid,
            releaseinfo 	: input.releaseinfo,
	    releasedate	 	: input.releasedate,
            projid              : input.projid        
        
        };
        
        connection.query("UPDATE releases set ? WHERE relid = ? ",[data,id], function(err, rows)
        {
  
          if (err){
              console.log("Error inserting : %s ",err );
              res.redirect('/employees/duplicateEntry');	  
	   }           
          else{
             res.redirect('/releases/');
	     res.send('Data Saved!')
          }
        });     
    
    });
};


/*Delete the release*/
exports.delete_release = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM releases WHERE relid = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/releases');
             
        });
        
     });
};


