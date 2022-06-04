const {createPool} = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"videos",
    connectionLimit:10
});

//Get List of All Videos
pool.query('Select * from video', (err, result, fields)=>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});


// //Get Video where Id
// pool.query('Select * from video where VideoId ='+ 1, (err, result, fields)=>{
//     if (err){
//         return console.log(err);
//     }
//     return console.log(result);
// });

//Insert into Video
pool.query('Select Max(VideoId) as MaxId from video', (err, result, fields)=>{
    if (err){
        return console.log(err);
    }
    const max = Object.values(JSON.parse(JSON.stringify(result)));
    const newId = max[0]['MaxId']+1;
    pool.query("INSERT INTO Video (VideoId,Name,Description,Active) VALUES ("+ newId+", 'Comedy', 'Collection of Comedy Movies ', 0 );", (err1, result1, fields1)=>{
        if (err){
            return console.log(err1);
        }
        return console.log(result1);
    });
    return console.log(newId);
});

//Update Video Where Id
// pool.query('Update video set Name="Changed", Description="Changes Check", Active=0 where VideoId='+ 1, (err, result, fields)=>{
//     if (err){
//         return console.log(err);
//     }
//     return console.log(result);
// });

// //Delete Video where Id
// pool.query('Delete from video where VideoId ='+ 1, (err, result, fields)=>{
//     if (err){
//         return console.log(err);
//     }
//     return console.log(result);
// });