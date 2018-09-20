var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

var mimeTypes = {
    ".css" : "text/css",
	".html" : "text/html",
	".js" : "application/javascript",
	".jsx" : "application/javascript",
    ".ico" : "image/ico",
    ".json" : "application/json",
    ".jpg" : "image/jpeg",
    ".jpeg" : "image/jpeg",
	".png" : "image/png",
	".woff2" : "font/woff2",
	".map" : "application/json",
	".mp4" : "video/mp4"
}

var cache = {}

function onlyDeliver(f, cb) {
	fs.readFile(f, function(err, data) {
		cb(err, data);
	 });
}

function cacheAndDeliver(f, cb) {
    if(!cache[f]) {
        fs.readFile(f, function(err, data) {
           if(!err) {
                cache[f] = {content: data};
            }
            cb(err, data);
        });
        
        return;
    }
    
    cb(null, cache[f].content);
}

function compileCacheAndDeliver(f, cb) {
	options = {
		"plugins": ["transform-react-jsx"]
	}	

    if(!cache[f]) {
        babel.transformFile(f, options, function (err, result) {
			if(!err) {
				cache[f] = {content: result.code};
			}
			else 
				console.log(err);
			cb(err, result.code);
		});

        return;
    }
    
    cb(null, cache[f].content);
}


function file_server(request, response) {
    var lookup = path.basename(decodeURI(request.url)) || 'index.html';
	var ext = lookup.split(".").pop();
	var sendFile = function(err, data) {
		if (err) { 
			response.writeHead(500) 
			response.end('Server error!');
			return;
		}
		
		var header = {'Content-Type': mimeTypes[path.extname(lookup)]}
		
		response.writeHead(200, header);
		response.end(data);
	};


	var f = "static/" + ext + "/" + lookup;

	fs.exists(f, function (exists) {
		if(exists) {
			switch (ext) {
			case 'jsx':
				compileCacheAndDeliver(f, sendFile);
				break;
			case 'mp4':
				onlyDeliver(f, sendFile)
				break;
			default:
				cacheAndDeliver(f, sendFile);
			}
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
}

module.exports = file_server;