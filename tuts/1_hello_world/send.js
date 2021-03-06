var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        var msg = 'Hello World!';

        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, new Buffer(msg));
        console.log(` [X] Sent '${msg}'`);
    });
    setTimeout(function() {
        conn.close(); process.exit(0);
    }, 500);
});