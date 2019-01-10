const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testhighcards',
    password: 'oculus',
    port: 5432,
})
client.connect();
const querytext = 'select * from conditions';
console.time("testi")
client.query(querytext, (err, res) => {
    console.timeEnd("testi");
    console.time("testii");
    client.query(querytext, (err, res) => {
        console.timeEnd("testii");
        console.time("testiii");
        client.query(querytext, (err, res) => {
            console.timeEnd("testiii");
            console.time("testiv");
            client.query(querytext, (err, res) => {
                console.timeEnd("testiv");
                console.time("testv");
                client.query(querytext, (err, res) => {
                    console.timeEnd("testv");
                    console.time("testvi");
                    client.query(querytext, (err, res) => {
                        console.timeEnd("testvi");
                        client.end()
                    });
                });
            });
        });
    });
});