/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();
const fetch = require("node-fetch");

const manifest_url = "https://www.dl.ndl.go.jp/api/iiif/8929985/manifest.json";
const images = [];


app.get("/", function (req, res){
    const manifest_url = req.body;
    if( manifest_url.match(/http/) ){
    // if文でURLでないものを弾く(この仕組みを採用するときはmatchを厳密にすること)
        fetch(manifest_url)
        .then(res => res.json())
        .then(response => {
            response.sequences.forEach( seq=> {
                seq.canvases.forEach(element => {
                    images.push(element.thumbnail["@id"]);
                });
            }
        )})
        .then(()=>{
            console.log(images);
            res.send(images);
        })
        .catch(error => console.error('Error:', error));
    }else{
        res.send("request is only allowed absolutely path to manifest.json");
    }
});

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
app.listen(3000, ()=>{
    console.log("listen: port 3000");
});