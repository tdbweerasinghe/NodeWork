/*Reference (Mentioned with thanks): http://teknosains.com/i/simple-crud-nodejs-mysql
Edited by Tharindu Weerasinghe*/

/*Get all items*/
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM inventory ORDER BY itemtype',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('inventory',{page_title:"ABC Company Inventory",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Get all items for a particular Employee*/
exports.listByEmpID = function(req, res){
  
  var id = req.params.id;

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM inventory WHERE usedby = ? ORDER BY itemtype ', [id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('inventory',{page_title:"ABC Company Inventory",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Get all Laptops*/
exports.listLapTops = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM inventory WHERE itemtype="Laptop" ORDER BY itemtype',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('inventory',{page_title:"ABC Company Inventory",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

/*Get all Monitors*/
exports.listMonitors = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM inventory WHERE itemtype="Monitor" ORDER BY itemtype',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('inventory',{page_title:"ABC Company Inventory",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};


/*Get all other accessories*/
exports.listAllAcc = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM inventory WHERE itemtype IN ("HeadSet" , "Keyboard", "Mouse", "Pen Drive") ORDER BY itemtype',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('inventory',{page_title:"ABC Company Inventory",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};
/*Render the add inventory item page*/
exports.add = function(req, res){
  res.render('add_inventoryitem',{page_title:"Add an Inventory Item (SNL)"});
};

/*Save the item*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            itemid    		: input.itemid,
            itemtype    	: input.itemtype,
            itemname 		: input.itemname,
	    usedby 		: input.usedby
        
        };
        
        var query = connection.query("INSERT INTO inventory set ? ",data, function(err, rows)
        {
  
          if (err){
              console.log("Error Inserting : %s ",err );
	      res.redirect('/employees/duplicateEntry');
	  }
          
          else{
		res.redirect('/inventory');
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
       
        var query = connection.query('SELECT * FROM inventory WHERE itemid = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_inventoryitem',{page_title:"Edit an Inventory Item (SNL)",data:rows});
                
           
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
            itemid                      : input.itemid,
            itemname    		: input.itemname,            
            usedby 			: input.usedby            
        
        };
        
        connection.query("UPDATE inventory set ? WHERE itemid = ? ",[data,id], function(err, rows)
        {
  
          if (err){
              console.log("Error Updating : %s ",err );
	      res.redirect('/employees/duplicateEntry');
         }
	 else{
             res.redirect('/inventory');
	     res.send('Data Saved!')
          }
        
          
        });
    
    });
};


/*Delete the item*/
exports.delete_invItem = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM inventory WHERE itemid = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/inventory');
             
        });
        
     });
};


