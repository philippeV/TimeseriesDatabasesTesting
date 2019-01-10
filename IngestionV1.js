/*module.exports = {
    getDataFromCSV: function(csvFile) {*/
        var csv = require('fast-csv');
        var fs = require('fs');
        var dataArray = []
    const myModule = require('./InfluxDBTestingServer');
        myModule.createInfluxServer();

function getBusses(data)
{
    myModule.influxDBWrite(data);
}

async function sleep(millis) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, millis);
    });
}

/*var stream = fs.createReadStream("weather_big_conditions.csv");

var csvStream = csv()
    .on("data", function(data){
        //console.log(data);
        myModule.influxDBWrite(data);
    })
    .on("end", function(){
        console.log("done");
    });

stream.pipe(csvStream);*/
//console.log(stream);
async function getData() {
    console.log(myModule.getDatabaseSchema('weather'));
    //myModule.doQuery();
    dataIndex = 0;
    csv.fromPath('weather_med_conditions.csv')
        .on('data', function (data) {
            if (dataIndex != 0) {
                //console.log(data);
                dataArray.push(data);
                //myModule.influxDBWrite(data);
            }
            dataIndex++;
            if (dataIndex == 1500000) {
                console.log('parsing at 10%');
            }
            if (dataIndex == 7500000) {
                console.log('parsing at 50%');
            }
            if (dataIndex == 10750000) {
                console.log('parsing at 75%');
            }

            /*dataIndex++;

            if(dataIndex==2000)
            {
                for (j=0;j<dataArray.length;j++) {
                    myModule.influxDBWrite(data);
                }
                //console.log(dataArray);
                dataArray = [];
                dataIndex = 0;
            }*/

            // `data` is an array containing the values
            // of the current line in the file
            //console.log(data);

            //myModule.influxDBWrite(data);

            //console.log(dataArray);

        })
        .on('end', function () {
            console.log('Parsing complete!');
            //console.log(dataArray);
            console.time("totalingestionTime");
            var insertDataArray = [];
            insertIndex = 0
            for (index = 0; index < 10001; index++){
                //for (index = 0; index < dataArray.length; index++) {
                insertDataArray.push({
                    measurement: 'weathercondition',
                    //timestamp:data[0],
                    tags: {
                        temperature: dataArray[index][2],
                        humidity: dataArray[index][3],
                    },
                    fields: {device: dataArray[index][1]}

                });
                insertIndex++;


                if (insertIndex == 2000) {
                    console.log('Parsing complete2!');
                    console.log(myModule.getDatabaseSchema('weather'));
                    insertIndex = 0;
                    myModule.influxDBWrite(insertDataArray);
                    insertDataArray = [];
                ;

                //console.log(insertDataArray);
                //myModule.influxDBWrite(dataArray[index]);
                //setTimeout(getBusses(dataArray[index]), 1000);
            }}
            console.log('Parsing complete2!');
            //myModule.influxDBWrite(insertDataArray);

            console.timeEnd("totalingestionTime");

            /*while (true)
    {
        for (index=0; index<dataArray.length;index++)
        {
            myModule.influxDBWrite(dataArray[index]);
        }
    }
       */
        });
}
//getData();
myModule.getDatabaseSchema('weather');


    //}

//}