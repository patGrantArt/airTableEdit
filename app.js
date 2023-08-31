console.log("wahey!");
//set dependencies 
const express = require('express');
const bodyParser = require('body-parser');
require('process');


//create express server
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//PATH
const homeDirectory = process.cwd();
//const dataFilePath = homeDirectory+"/public/data.json";

//AIRTABLE CONFIG - hides private airtable api keys (env)
const Airtable = require('airtable');
const { all } = require('express/lib/application');
require('dotenv').config()
const KEY = process.env.PRIVATE_KEY
const BASE_ID = process.env.AIRTABLEBASE
const base = new Airtable({apiKey: KEY}).base(BASE_ID)




async function goGetFromAirtable(){
    console.log("going and getting");
    // pull data from the test page
    let rawData = await base('tblzCP2io1SOoEJW0')
        .select({view: "Grid view"})
        .all()
        .then(records => {
            return records
        }).catch(err => {
            //console.error(err);
            console.error("looks like Airtable is down... supplying a placeholder card")
            let placeholder = [new Placeholder()];
            return placeholder;
    });
    console.log("done - gone and got");
    return rawData
}

// function Card(string, array1){
//     this.name = string;
//     this.friends = array1;

// }
// function Package(string){
//     this.name = string;
//     this.links = [];
// }
// function Placeholder(){
//     this.fields.name = "Mandy";
//     this.fields.links = [];
//     this.fields.links.push(new Card("Brenton", ["Campbell", "Liz", "Baden"]));
//     this.fields.links.push(new Card("Komala", ["Mandy", "Campbell", "Brenton", "Matty", "Rachel"]));
// }





app.get('/load', (req, res) => {
    console.log(`Request for update made from client`)        
    //console.log(req);
    //this function called below    
    
    async function myResponse() {
        console.log(`async function running`)
        let response = await goGetFromAirtable();
        res.send(response);
        console.log(`=== UPDATE CONFIRMATION SENT! ===`)
        console.log(`sent:`);
    };
    //call the above function
    myResponse();
});

app.post('/new', (req, res) => {
    console.log(`new item posted`);
    let data = req.body;
    console.log(data);
    console.log(data.name);
    console.log(data.type);

    //add line to airtable
    base('testUserInput').create([
    {
        "fields": {
        "Name": data.name,
        "type": [data.type]
        }
    },
    ], function(err, records) {
    if (err) {
        console.log(`=== error!!!! === `)
        console.error(err);
        return;
    }
    records.forEach(function (record) {
        console.log(`==== callback function ====`)
        console.log(record.getId());
    });
    });







    res.send(JSON.stringify(data));
    console.log('response sent')

})

async function sortMyData(data, id){
    console.log("sorting")
    // let sortedData = new Package(id);
    // //console.log(data);
    // //console.log(`does ${data[0].fields.name} match ${id}`);
    // let artistData =  data.filter((item)=> item.fields.name === id);
    // //console.log(artistData);
    // let artistName = artistData[0].fields.name
    // console.log(`artist name is ${artistName}`);
    // let friendNames = artistData[0].fields.friends;
    // console.log(`friends names are:`);
    // console.log(friendNames);
    // friendNames.forEach(name => {        
    //         console.log(`checking for ${name}`);
    //         for(let i = 0; i<data.length; i++ ){
    //             // console.log(`loop ${i}`);
    //             // console.log(data[i].fields.name);
    //             // console.log(data[i].fields.name === name);
    //             if(data[i].fields.name === name){
    //                 let thisCard = new Card;
    //                 thisCard.name = data[i].fields.name;
    //                 thisCard.friends = data[i].fields.friends;
    //                 sortedData.links.push(thisCard);                    
    //             }
    //         }
   
    // });
    // console.log(`returning sorted data:`);
    // //console.log(sortedData);
    // return sortedData;
}




app.get('/card/:cardID', async (req, res) => {
    // console.log(`card request recived!`);
    // console.log(req.params);
    // let requestedID = req.params.cardID; 
    // console.log(`going to get from airtable`);
    // let myData = await goGetFromAirtable();
    // console.log(`complete`);
    // console.log(`sorting data`);
    // let mySortedData = await sortMyData(myData, requestedID);
    // console.log(`complete`);
    // console.log(mySortedData);
    // let myJsonString = JSON.stringify(mySortedData);
    // console.log(`sending response`);
    // let myResponse = "This string is the response";
    // console.log(myResponse);
    // res.send(myJsonString);
  });






//this serves up the contents of the public folder on load
app.use(express.static('public'));


//this sets the app listening. 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

