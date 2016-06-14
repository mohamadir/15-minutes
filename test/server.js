var express = require('express');
app = express();
var jwt = require('express-jwt');
var cors = require('cors');

// Port
app.set('port', process.env.PORT || 8000);

app.use(cors());

var authCheck = jwt({
	secret: new Buffer('8Gy8N84TkXWuC2md96FxRxftf4axHap9O4GeXlC_FrvaffTffuygDbaS0Z3VoutH', 'base64'),
	audience: 'wMiaGVcupBYebZC5whqoyYAwtz8k04E1'
});

app.get('/api/public', function(req, res){
	res.json({message: 'public endpoint, you dont need to be authenticated to see this.'})
});

app.get('/api/private', authCheck, function(req, res){
	res.json({message: 'private endpoint, you DO need to be authenticated to see this.'})
});

// =====================================
// HOME PAGE (with login links) ========
// =====================================
app.get('*', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

app.listen(app.get('port'), function(){
	console.log("Server Running on localhost:" + app.get('port'));
});