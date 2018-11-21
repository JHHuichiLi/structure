let kafka = require("kafka-node");
let Consumer = kafka.Consumer;

let client = new kafka.Client();
let consumer = new Consumer(
    client,
    [{
        topic: "CAR_NUMBER",
        partition: 0,
    }],
    {
        autoCommit: true,
    }
);

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mysql",
});

let initSys = () => {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    
        console.log('connected as id ' + connection.threadId);
    });
    
    consumer.on('message', (message) => {
        connection.query("insert into seckill set ?", { data: new Date() }, (error, results, fields) => {
            if (error) {
                console.error(error);
            }
            console.log(results);
        });
    });
}

exports.initSys = initSys;