const Influx = require('influx');
const express = require('express')
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'busses',
    schema : [
        {
            measurement: 'bus',
            fields: {distance: Influx.FieldType.FLOAT},
            tags: ['directionID', 'PointID']
        }

]
})

influx.getDatabaseNames()
    .then(names => {
        if (!names.includes('busses')) {
            return influx.createDatabase('busses');
        }
    })
    .then(() => {
        http.createServer(app).listen(3000, function () {
            console.log('Listening on port 3000')
        })
    })
    .catch(err => {
        console.error(`Error creating Influx database!`);
    })




function getBusses() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const Http = new XMLHttpRequest();
    const url = 'https://opendata-api.stib-mivb.be/OperationMonitoring/3.0/VehiclePositionByLine/1%2C2%2C3%2C4%2C5%2C6%2C7';
    var document;
    console.log('hello');
    Http.onreadystatechange = function (){
        if(Http.readyState === 4 && Http.status === 200) {
            console.log(Http.responseText);
            json=JSON.parse(Http.responseText);
            for (var i = 0; i < json.lines.length; i++) {
                var line = json.lines[i];
                for (var j = 0; j < line.vehiclePositions.length; j++)
                {
                   var bus = line.vehiclePositions[j];
                    console.log(bus);
                    console.log(bus.directionId);
                    influx.writePoints([
                        {
                            measurement: 'bus',
                            tags: {
                                directionID: bus.directionId,
                                PointID: bus.pointId,
                            },
                            fields: { distance: bus.distanceFromPoint }}
                    ], {
                        database: 'busses',
                        precision: 's',
                    })
                        .catch(error => {
                            console.error(`Error saving data to InfluxDB! ${err.stack}`)
                        });
                }
                console.log(line.vehiclePositions);
            }
        }
    };
    Http.open("GET", url, true);
    Http.setRequestHeader('Accept', 'application/json');
    Http.setRequestHeader('Authorization', 'Bearer ' + '4b87fb3b78437fbce5e12101aea0a98d');
    Http.send();
}
setInterval(getBusses,20000);


