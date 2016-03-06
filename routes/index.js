var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('data/index', {pcs: req.session.data});
});

/* GET home page. */
router.get('/show/:key', function (req, res, next) {
    var data = req.session.data;
    var pc = data[req.params.key];
    res.render('data/show', {key: req.params.key, pc: pc});
});

router.get('/add', function (req, res, next) {
    res.render('data/add');
});

router.post('/add', function (req, res, next) {
    var data = req.session.data;
    var key = req.body.manufacturer;
    data[key] = req.body;
    var fs = require('fs');
    var dataJSON = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataJSON);
    res.redirect('/show/' + key);
});

router.get('/remove/:key', function (req, res, next) {
    var data = req.session.data;
    delete data[req.params.key];
    var fs = require('fs');
    var dataJSON = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataJSON);
    req.session.data = data;
    res.redirect('/');
});

router.get('/edit/:key', function (req, res, next) {
    var data = req.session.data;
    var pc = data[req.params.key];
    res.render('data/edit', {key: req.params.key, pc: pc});
});


router.post('/edit/:key', function (req, res, next) {
    var data = req.session.data;
    data[req.params.key] = req.body;
    var fs = require('fs');
    var dataJSON = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataJSON);
    req.session.data = data;
    res.redirect('/');

});

router.post('/find', function (req, res, next) {
    var data = req.session.data;
    var q = req.body.q;
    var qq = /('q' \d+(\.\d)*)/i;
    var result = [];
    for (var i = 0; i < data.length; i++) {
        if (
            data[i].id == q
            || data[i].formation.nom.match(qq)
            || data[i].formation.Formateur.match(qq)

        ) {
            result.push(data[i]);
        }
    }
    res.render('data/result.twig', {formateur: result});
});
module.exports = router;
