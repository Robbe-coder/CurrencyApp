
const Primus = require('primus');
let go = (server)=>{
   let primus = new Primus(server,{})
   primus.on('connection', function (spark) {
    console.log("received spark🚀🚀")
    spark.query.uid = 
    spark.on('data',(data)=>{
        console.log(data);
        primus.write(data);
        console.log("🐨")
    });
  });
}
module.exports.go = go;