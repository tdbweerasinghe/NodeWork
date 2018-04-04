/*Reference (Mentioned with thanks): http://teknosains.com/i/simple-crud-nodejs-mysql
Edited by Tharindu Weerasinghe.*/
/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM employees WHERE resigneddate = "" OR resigneddate IS NULL ORDER BY empid',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('employees',{page_title:"ABC Company Current Employees",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

exports.listpast = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT *  FROM employees WHERE resigneddate <> "" ORDER BY empid',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('pastemployees',{page_title:"ABC Company Past Employees",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_employees',{page_title:"Add an Employee (SNL)"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM employees WHERE empid = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_employees',{page_title:"Edit an Employee (SNL)",data:rows});
                
           
         });
         
         console.log(query.sql);
    }); 
};

/*Save the employee*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        
        var data = {
            empid    		: input.empid,
            name    		: input.name,
	    nic                 : input.nic,
	    designation 	: input.designation,
            homeaddress 	: input.homeaddress,
            email   		: input.email,
	    leaves   		: input.leaves,
            phone   		: input.phone, 
            salary  		: input.salary,
	    resigneddate  	: input.resigneddate,
	    joineddate  	: input.joineddate,
	    lastincrementdate  	: input.lastincrementdate,
	    dateofbirth  	: input.dateofbirth,
	    expertise	  	: input.expertise
        
        };
        
        var query = connection.query("INSERT INTO employees SET ? ",data, function(err, rows)
        {
  
          if (err){
              console.log("Error Inserting : %s ",err );
	      res.redirect('/employees/duplicateEntry');
             
          }
          else{
	    res.redirect('/employees');
	  }
          
        });
        
       console.log(query.sql); //get raw query
       console.log(input); //get result set in JSON
    
    });
};

/*Edit the employee*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            empid    		: input.empid,
            name    		: input.name,
	    nic                 : input.nic,
	    designation 	: input.designation,
            homeaddress 	: input.homeaddress,
            email   		: input.email,
	    leaves   		: input.leaves,
            phone   		: input.phone, 
            salary  		: input.salary,
	    resigneddate  	: input.resigneddate,
	    joineddate  	: input.joineddate,
	    lastincrementdate  	: input.lastincrementdate,
	    dateofbirth  	: input.dateofbirth,
	    expertise	  	: input.expertise
        
        };
        
        connection.query("UPDATE employees SET ? WHERE empid = ? ",[data,id], function(err, rows)
        {
  
          if (err){
              console.log("Error Updating : %s ",err );
	      res.redirect('/employees/duplicateEntry');
          }
         
          else{
		res.redirect('/employees');
          }
          
        });
    
    });
};

/*Delete the employee*/
exports.delete_employee = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM employees WHERE empid = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/employees');
             
        });
        
     });
};

/*Delete the employee*/
exports.delete_past_employee = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM employees WHERE empid = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error Deleting : %s ",err );
            
             res.redirect('/pastemployees');
             
        });
        
     });
};

/*Duplicate Entry Message*/
exports.duplicateMessage = function(req, res){
  res.render('duplicate_entry_message',{page_title:"Duplicate Entry"});
};


