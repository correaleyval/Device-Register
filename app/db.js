var sql = require('sqlite3');
var fs = require('fs');

var db = new sql.Database('mac.db');

function saveMac(user, mac1, mac2, mac3) {
    mac1 = mac1.replace(/:/g, '-');
    mac2 = mac2.replace(/:/g, '-');
    mac3 = mac3.replace(/:/g, '-');


    var queryInsert = "INSERT INTO `mac`(`user`,`mac1`,`mac2`,`mac3`) VALUES" + 
        "('" + user + "','"+mac1+"','"+mac2+"','"+mac3+"');"

    var queryDelete = "DELETE FROM `mac` WHERE user='"+user+"';"

    db.run(queryDelete);
    db.run(queryInsert);

    syncFile();
}

function syncFile() {
    fs.writeFile('mac.txt', "#MACS\n", function(err) {
        if(err) {
            console.log("error de escritura en el fichero de macs");
        }
    });
    
    db.each("SELECT user,mac1,mac2,mac3 FROM mac", function(err, row) {       
        if(!err) {
            var data = "";
            
            data += "#"+row.user+"\n";
            data += row.mac1+"\n";
            data += row.mac2+"\n";
            data += row.mac3+"\n";


            fs.appendFile('mac.txt', data, function(err) {
                if(err) {
                    console.log("error de escritura en el fichero de macs");
                }
            });
        }
    });
}

module.exports = {saveMac};
