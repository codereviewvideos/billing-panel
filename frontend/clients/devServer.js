var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('dist/*', function (req, res) {
    res.sendFile(path.join(__dirname, req.url));
});

app.use(function(req, res) {
  res.sendFile(__dirname + '/app/index.html')
})

//app.get('*', function (req, res) {
//    res.sendFile(path.join(__dirname,'app', 'index.html'));
//});



app.listen(3001, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
