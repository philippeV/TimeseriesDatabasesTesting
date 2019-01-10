const Influx = require('influx');
const express = require('express')
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'testlowcards'
});

const querytext = `select count(*) from conditions group by temperature`;
console.time("testi");
result = influx.queryRaw(querytext)
    .then(results=>{
        console.timeEnd("testi");
        console.time("testii");
        return influx.queryRaw(querytext);})
    .then(results=>{
        console.timeEnd("testii");
        console.time("testiii");
        return influx.queryRaw(querytext);})
    .then(results=>{
        console.timeEnd("testiii");
        console.time("testiv");
        return influx.queryRaw(querytext);})
    .then(results=>{
        console.timeEnd("testiv");
        console.time("testv");
        return influx.queryRaw(querytext);})
    .then(results=>{
        console.timeEnd("testv");
        console.time("testvi");
        return influx.queryRaw(querytext);})
    .then(results=>{
        console.timeEnd("testvi");
        });
