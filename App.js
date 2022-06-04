const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { response } = require('express');
   
app.use(bodyParser.json());
   
/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'videos'
});
   
/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});


/*------------------------------------------
--------------------------------------------
API For Video
--------------------------------------------
--------------------------------------------*/


/**
 * Get All Items
 *
 * @return response()
 */
app.get('/video',(req, res) => {
  let sqlQuery = "SELECT * FROM video";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/video/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM video WHERE VideoId=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/video',(req, res) => {
    let sqlQuery1 = 'Select Max(VideoId) as MaxId from video';
    var newId = 0;
    let q = conn.query(sqlQuery1, (err, results) => {
        if(err) throw err;
        const max = Object.values(JSON.parse(JSON.stringify(results)));
        newId = max[0]['MaxId']+1;
        let data = {VideoId: newId, Name: req.body.Name, Description: req.body.Description, Active: req.body.Active};
  
        let sqlQuery = "INSERT INTO video SET ?";
        
        let query = conn.query(sqlQuery, data,(err, results) => {
            if(err) throw err;
            res.send(apiResponse(results));
        });
      });  
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/video/:id',(req, res) => {
  let sqlQuery = "UPDATE video SET Name='"+req.body.Name+"', Active='"+req.body.Active+"', Description='"+req.body.Description+"' WHERE VideoId="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/video/:id',(req, res) => {
  let sqlQuery = "DELETE FROM video WHERE VideoId="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   

/*------------------------------------------
--------------------------------------------
API For VideoList
--------------------------------------------
--------------------------------------------*/


/**
 * Get All Items
 *
 * @return response()
 */
 app.get('/videoList',(req, res) => {
    let sqlQuery = "SELECT * FROM videolist";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });
     
  /**
   * Get Single Item
   *
   * @return response()
   */
  app.get('/videoList/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM videolist WHERE VideoListId=" + req.params.id;
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });
     
  /**
   * Create New Item
   *
   * @return response()
   */
  app.post('/videolist',(req, res) => {
    let sqlQuery = 'Select Max(VideoListId) as MaxId from videolist';
    var newId = 0;
    let q = conn.query(sqlQuery, (err, results) => {
        if(err) throw err;
        const max = Object.values(JSON.parse(JSON.stringify(results)));
        newId = max[0]['MaxId']+1;
        let data = {VideoListId: newId, Name: req.body.Name, Link: req.body.Link, VideoId: req.body.VideoId};
    
        let sqlQuery1 = "Select VideoId from video where VideoId=" +req.body.VideoId;
        let sqlQuery2 = "INSERT INTO videolist SET ?";
        
        let query = conn.query(sqlQuery1, data,(err, results) => {
            if(results.length === 0){
                res.send(apiResponse("Select VideoId from Video,"+req.body.VideoId+" does not exist in Video"));
            }
            else{
                let query = conn.query(sqlQuery2, data,(err1, results1) => {
                    if(err1) throw err1;
                    res.send(apiResponse(results1));
                });
            }
            
        });
      });
    
    
});
     
  /**
   * Update Item
   *
   * @return response()
   */
  app.put('/videolist/:id',(req, res) => {
    let sqlQuery = "UPDATE videoList SET Name='"+req.body.Name+"', VideoId='"+req.body.VideoId+"', Link='"+req.body.Link+"' WHERE VideoListId="+req.params.id;
    let sqlQuery1 = "Select VideoId from video where VideoId=" +req.body.VideoId;

    let query = conn.query(sqlQuery1, (err, results) => {
        if(results.length === 0){
            res.send(apiResponse("Select VideoId from Video,"+req.body.VideoId+" does not exist in Video"));
        }
        else{
            let query = conn.query(sqlQuery, (err1, results1) => {
                if(err1) throw err1;
                res.send(apiResponse(results1));
            });
        }
        
    });
  });
     
  /**
   * Delete Item
   *
   * @return response()
   */
  app.delete('/videolist/:id',(req, res) => {
    let sqlQuery = "DELETE FROM videolist WHERE VideoListId="+req.params.id+"";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});