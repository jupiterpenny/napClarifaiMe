
var http = require('http'),
    fs = require('fs');


fs.readFile('./test.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(3540);
});


var firebase = require('firebase');
var fb = firebase.initializeApp({
    apiKey: "AIzaSyALxMopDDvh22l3VjU2q5gV-ekxIo2Plnw",
    authDomain: "mangohack-f5793.firebaseapp.com",
    databaseURL: "https://mangohack-f5793.firebaseio.com",
    projectId: "mangohack-f5793",
    storageBucket: "",
    messagingSenderId: "1081064810330"
});


//   var arr = [];

var a;
var b;

function gotData(data) {


    var userNames =[];
    var Pic1 = [];
    var Pic2 =[];
    var Pic3 = [];
    var Pic11 = [];
    var Pic12 = [];
    var test = [];
    var query = firebase.database().ref("Users").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                test.push(childData);
                userNames.push(childData.Name);
                Pic1.push(childData.Pic1);
                Pic2.push(childData.Pic2);
                Pic3.push(childData.Pic3);


                userNames.slice(-2);
                Pic1.slice(-2);
                Pic2.slice(-2);
                Pic3.slice(-2);

                Pic11 = Pic1[0];
                // Pic12 = Pic1[1];


                b = Pic11.slice(23);

            });

            // console.log(Pic1[0]);



const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ebfc009e62074178ba50f8b3beaab221'
});

var count = 0;
app.models.predict(Clarifai.GENERAL_MODEL, {base64: b}).then(
    function(response) {
        // console.log(response);
        // console.log(response['outputs'][0]['data']['concepts']);

        var k = response['outputs'][0]['data']['concepts'];

       for (var i= 0;i< k.length; i++){
           console.log(k[i]);


           if ( k[i].name === 'one'){
               count++;
               console.log("one");
           }

           if (k[i].name === "two"){
               console.log("two");
           }
           if (k[i].name === "three"){
               console.log('three');
           }
       }
    },
    function(err) {
        console.error(err);
    }
);

        });


}



gotData();
