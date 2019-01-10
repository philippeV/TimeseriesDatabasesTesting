const Influx = require('influx');
const express = require('express')
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'weather'
})


module.exports = {

    createInfluxServer: function() {
        var test = influx.getMeasurements();
        console.log(test);
        influx.getDatabaseNames()
            .then(() => {
                http.createServer(app).listen(3000, function () {
                    console.log('Listening on port 3000')
                })
            })
            .catch(err => {
                console.error(`Error creating Influx database!`);
            })
    },

    getDatabaseSchema: function (database){
        var result;
        var test = influx.getMeasurements()
            .then(test => {
                console.log(test);});
        var schema = influx.schema.keys;
        result = influx.queryRaw(`
    select time, count(device) from weathercondition group by temperature LIMIT 100
  `)
            .then( results => {
                    console.log(results);
                //console.log();
                var tags = schema.weathercondition.options.tags;
                console.log(tags);
            })
            .catch( error => response.status(500).json({ error }) );
        //console.log(result);

        return schema;
    },




    influxDBWrite: function (data) {
        console.time("ingestionTime");
        influx.writePoints(
            data
            //[
            /*{
                measurement: 'weathercondition',
                //timestamp:data[0],
                tags: {
                    temperature: data[2],
                    humidity: data[3],
                },
                fields: {device: data[1]}
            }*/
        //]
        , {
            database: 'wea-ther',
            precision: 'ns',
        }).then()

            .catch(error => {
                console.error(`Error saving data to InfluxDB! ${err.stack}`)
            });
        console.timeEnd("ingestionTime");

    }
}