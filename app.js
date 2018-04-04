/*Reference (Mentioned with thanks): 
1. http://teknosains.com/i/simple-crud-nodejs-mysql
2. http://www.tamtech.co.in/custom-pagination-in-nodejs-with-mysql
*/

//Edited by Tharindu Weerasinghe

//Global Variables (Module dependencies are assigned to Variables)
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var auth = require('basic-auth')

//Global Variables - For Pagination
var totalInvItems = 0;
var pageSize = 3;
var pageCount = 0;
var start = 0;
var currentPage = 1;

//Load employees and inventory routes
var employees = require('./routes/employees'); 
var inventory = require('./routes/inventory');
var projects  = require('./routes/projects');
var releases  = require('./routes/releases');
var app = express();

//Related to db connection
var connection  = require('express-myconnection'); 
var mysql = require('mysql');



//All generic usages
app.set('port', process.env.PORT || 3300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'ABC-HRDB'

    },'pool') //or single

);
	
app.get('/', routes.index);

//Employees:
app.get('/employees', employees.list);
app.get('/employees/add', employees.add);
app.post('/employees/add', employees.save);
app.get('/employees/delete/:id', employees.delete_employee);
app.get('/employees/edit/:id', employees.edit);
app.post('/employees/edit/:id',employees.save_edit);
app.get('/employees/inventory/:id', inventory.listByEmpID);
app.post('/employees/inventory/:id', inventory.listByEmpID);
app.get('/employees/inventory/edit/:id', inventory.edit);
//Past Employees
app.get('/pastemployees', employees.listpast);
app.get('/pastemployees/delete/:id', employees.delete_past_employee);
//Inventory:
app.get('/inventory', inventory.list);
app.post('/inventory/:id', inventory.listByEmpID);
app.get('/inventory/laptops', inventory.listLapTops);
app.get('/inventory/monitors', inventory.listMonitors);
app.get('/inventory/accessories', inventory.listAllAcc);
app.get('/inventory/add', inventory.add);
app.post('/inventory/add', inventory.save);
app.get('/inventory/delete/:id', inventory.delete_invItem);
app.get('/inventory/edit/:id', inventory.edit);
app.post('/inventory/edit/:id', inventory.save_edit);
//Projects
app.get('/projects', projects.list);
app.get('/projects/add', projects.add);
app.post('/projects/add', projects.save);
app.get('/projects/edit/:id', projects.edit);
app.post('/projects/edit/:id', projects.save_edit);
app.get('/projects/delete/:id', projects.delete_project);
//Project-Releaes
app.get('/projects/releases/:id', releases.listByProjID);
app.post('/projects/releases/:id', releases.listByProjID);
app.get('/projects/releases/edit/:id', releases.edit);
app.post('/projects/releases/edit/:id', releases.save_edit);
app.get('/projects/releases/delete/:id', releases.delete_release);
//Releases
app.get('/releases', releases.list);
app.post('/releases/:id', releases.listByProjID);
app.get('/releases/add', releases.add);
app.post('/releases/add', releases.save);
app.get('/releases/edit/:id', releases.edit);
app.post('/releases/edit/:id', releases.save_edit);
app.get('/releases/delete/:id', releases.delete_release);

//General
app.get('/employees/duplicateEntry', employees.duplicateMessage);

app.use(app.router);


// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
