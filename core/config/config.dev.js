import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'balandin_s:lxn3151@ds237713.mlab.com';
config.dbPort = process.env.dbPort || '37713';
config.dbName = process.env.dbName || 'time-runche';
config.serverPort = process.env.serverPort || 3000;

export default config;