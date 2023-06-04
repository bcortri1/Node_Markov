/** Textual markov chain generator */
const fs = require("fs")


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {}
    this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

makeChains(words) {
    for (let i = 0; i < words.length; i++){
        if (this.chains[words[i]]){
            let cArr = new Set(this.chains[words[i]])
            cArr.add(words[i+1])
            this.chains[words[i]] = Array.from(cArr)
        }
        else{
            if (words[i+1] === undefined){
                this.chains[words[i]] = [null]
            }
            else{
                this.chains[words[i]] = [words[i+1]]
            }
        }
    }
  }


  //return random word from array
  randWord(words){
    let randSet = new Set(words);
    let randArr = Array.from(randSet);
    return randArr[Math.floor(Math.random() * randArr.length)];
  }

  /** return random text from chains */

    makeText(numWords = 100) {
        let text = "";
        let currWord = this.randWord(this.words)
        text = text + " " + currWord
        for (let i = 0; i < numWords-1; i++){
            let rand = this.randWord(this.chains[currWord])
            if (rand === null){
                return text;
            }
            text = text + " " + rand;
            currWord = rand;
        }
        return text;
    }
}



exports.MarkovMachine = MarkovMachine;
