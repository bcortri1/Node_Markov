/** Command-line tool to generate Markov text. */
const fs = require('fs');
const { MarkovMachine } = require('./markov.js');
const axios = require('axios');


let arg1 = process.argv[2];
let arg2 = process.argv[3];

function fileMakeText(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        else{
            let mm = new MarkovMachine(data);
            console.log("...Generating Text from URL...")
            console.log(mm.makeText())
        }
    });
}

async function webMakeText(url){
    try{
        const response = await axios.get(url);
        let mm = new MarkovMachine(response.data);
        console.log("...Generating Text from URL...")
        console.log(mm.makeText())
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}


if (arg1==="file"){
    fileMakeText(arg2)
}

else if (arg1 ==="url"){
    webMakeText(arg2)
}

else{
    console.log("Valid text type not selected")
    console.log("Valid text types are the following: url, file")
    console.log("Example Command: node makeText.js url http://www.example.com")
}