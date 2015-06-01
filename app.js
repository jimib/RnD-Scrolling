var express = require("express"),
	path = require("path");

var app = express( );

app.set("view engine", "jade");
app.set("views", __dirname );

app.get("/", function( req, res, next ){
	res.render("index");
});

app.use( express.static( path.join( __dirname, "public" ) ) );

app.listen( 8000 );