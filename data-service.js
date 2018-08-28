const { Pool } = require('pg');
const config = require('./configs/config.json');

const pool = new Pool({
    user: config.DB_user,
    host: config.DB_host,
    database: config.DB_database,
    password: config.DB_password,
    port: config.DB_port,
    ssl: true
})

exports.storeURL = function (id, URL) {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }

        const query = {
            // give the query a unique name
            name: 'setURL',
            text: 'INSERT INTO urls(id, url) VALUES($1, $2) RETURNING *',
            values: [id, URL]
        }

        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows[0]);
            }
        })
    });
}

exports.removeURL = function(id) {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }

        const query = {
            // give the query a unique name
            name: 'setURL',
            text: 'DELETE FROM URLS WHERE id = $1',
            values: [id]
        }

        client.query(query, (err, res) => {
            if (err) {
                console.log("Querry Error");
            }
        });
    });
}

exports.getNextURL = function () {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                reject('Error acquiring client');
            }

            const query = {
                // give the query a unique name
                name: 'getURL',
                text: 'SELECT * FROM urls ORDER BY id DESC LIMIT 1',
            }

            client.query(query, (err, res) => {
                if (err) {
                    reject("query error");
                } else {
                    resolve(res.rows[0]);
                }
            })
        });
    });
}