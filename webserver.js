const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
module.exports = () => {
    let app = express();
    app.set('json spaces', 2);
    app.set('x-powered-by', false);
    app.use(compression());
    app.use( (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Language', 'en');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Content-Language, Accept');
    next();
});
    app.use(bodyParser.json());
    app.options('*', (req, res) => {
        res.status(204);
});
    app.listen(3030, () => console.log(`[OK] Cumul.io plugin \'Citybik.es\' listening on port 3030`));
    return app;
}
