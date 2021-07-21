var admin = require("firebase-admin");
const http = require('http');

var file ;
var serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "firebase-bucket-address"
});

var bucket = admin.storage().bucket();
bucket.upload("file-name-here",{public:true},(err,res)=>{
    console.log("Uploaded");
    file = res.publicUrl();
    console.log(file);
});

const server = http.createServer((req, res) => {
    res.end(`<html><body><img src='${file}'></body></html>`);
});

server.listen(8080,  () => {});