const ftp = require('ftp')
const client = new ftp();
client.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT
});

module.exports = client;