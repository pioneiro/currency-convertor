const PORT = process.env.PORT || 5192;

const express = require('express');

const index = express();

index.set('view engine', 'ejs');

index.use(express.static('assets'));

index.get('/', function(req, res) {
    res.render('index');
});

index.listen(PORT, function() {
    console.log(`Server initiated at port ${PORT}`);
})