var sequelize = require('sequelize');
var dotenv = require('dotenv');
dotenv.load();

//init database connection

var connection = new sequelize(process.env.DB_DATABASE_NAME, process.env.DB_SERVER_USER_NAME, process.env.DB_SERVER_USER_PASSWORD, {
    host: process.env.DB_SERVER_HOST,
    port: process.env.DB_SERVER_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
    logging:()=>{}
});
//console.log(process.env.DB_SERVER_USER_NAME);


//define model

var bus = connection.define('bus', {
        time: {
            type: sequelize.DATE,
            allowNull: true,
            primaryKey: true
        },
    directionId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    distanceFromPoint: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    pointId: {
        type: sequelize.DOUBLE,
        allowNull: false
    }}
    , {
    timestamps: false,
    freezeTableName: true
});

// connect to MIVB datasource

function getBusses() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const Http = new XMLHttpRequest();
    const datasource = process.env.DATASOURCE;
    const query = process.env.QUERY;
    const url = datasource + query;
    //console.log(url);
    //console.log('hello');
    Http.onreadystatechange = function (){
        if(Http.readyState === 4 && Http.status === 200) {
            //console.log(Http.responseText);
            json=JSON.parse(Http.responseText);
            for (var i = 0; i < json.lines.length; i++) {
                var line = json.lines[i];
                //console.log(line.vehiclePositions);
                for (var j = 0; j < line.vehiclePositions.length; j++)
                {
                    var busInstance = bus.build({
                        time: Date.now(),
                        directionId: line.vehiclePositions[j].directionId,
                        pointId: line.vehiclePositions[j].pointId,
                        distanceFromPoint: line.vehiclePositions[j].distanceFromPoint
                    })
                    busInstance.save();
                    //console.log(busInstance);

                }
            }
        }
    };
    Http.open("GET", url, true);
    Http.setRequestHeader('Accept', 'application/json');
    var token = process.env.TOKEN;
    Http.setRequestHeader('Authorization', 'Bearer ' + token);
    //console.log(token);
    Http.send();
}

setInterval(getBusses,20000);
