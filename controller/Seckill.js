let redis = require("redis");
let kafka = require("kafka-node");

let Producer = kafka.Producer;
let kafkaClient = new kafka.Client();
let producer = new Producer(kafkaClient);
let count = 0;

const fn = (optionalClient) => {
    count ++;
    let client;
    if(optionalClient === 'undefined' || optionalClient === null){
        client = redis.createClient();
    } else {
        client = optionalClient;
    }
    client.on('error', (error) => {
        console.error(error.stack);
        client.end(true);
    });
    client.watch("counter");
    client.get("counter", (error, reply) => {
        if(parseInt(reply) > 0) {
            let multi = client.multi();
            multi.decr("counter");
            multi.exec((error, replies) => {
                if(replies === null) {
                    console.log("conflict!");
                    fn(client);
                } else {
                    let payload = [{
                        topic: "CAR_NUMBER",
                        message: "buy one thing",
                        partition: 0,
                    }];
                    producer.send(payload, (error, data) => {
                        console.log(data);
                    });
                    res.send(replies);
                    client.end(true);
                }
            });
            ctx.body = "Sold one!";
        } else {
            console.log("Sold out!");
            ctx.body = "Sold out!";
            client.end(true);
        }
    });
}

const seckill = (ctx, next) => {
    fn();
}

exports.seckill = seckill;