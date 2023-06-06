const { MarkovMachine } = require("./markov");

describe("Markov Machine Tests", function(){


    beforeEach(function(){
        const text1 = "the cat in the hat";
        const text2 = "a b a c";
        const text3 = "a a b c";
        chain1 = {
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
        };
    
        chain2 = {
            "a": ["b", "c"],
            "b": ["a"],
            "c": [null]
        }; 
    
        chain3 = {
            "a": ["a", "b"],
            "b": ["c"],
            "c": [null]
        }; 

        mm1 = new MarkovMachine(text1)
        mm2 = new MarkovMachine(text2)
        mm3 = new MarkovMachine(text3)
    })

    test("Markov Machine Initialization",function(){
        expect(mm1).toBe(mm1)
        expect(mm1["words"] != null).toBeTruthy()
        expect(mm1["chains"] != null).toBeTruthy()
        expect(mm2).toBe(mm2)

        expect(mm2["words"] != null).toBeTruthy()
        expect(mm2["chains"] != null).toBeTruthy()
        
        expect(mm3).toBe(mm3)
        expect(mm3["words"] != null).toBeTruthy()
        expect(mm3["chains"] != null).toBeTruthy()

        expect(mm3).not.toBe(mm1)
    })

    test("makeChains function",function(){
        mm1.makeChains(mm1.words)
        expect(mm1.chains).toEqual(chain1)

        mm2.makeChains(mm2.words)
        expect(mm2.chains).toEqual(chain2)

        mm3.makeChains(mm3.words)
        expect(mm3.chains).toEqual(chain3)
    })
    
    test("randWord function",function(){
        expect(chain1["the"]).toContain(mm1.randWord(mm1.chains["the"]))
        expect(mm2.randWord(chain2["b"])).toEqual("a")
        expect(chain3["a"]).toContain(mm3.randWord(mm3.chains["a"]))
    })

    test("makeText function",function(){


        let mm1Text = mm1.makeText(5)
            mm1Text = mm1Text.split(/[ \r\n]+/)
            mm1Text = mm1Text.filter(c => c !== "")
            
        let mm2Text = mm2.makeText(10)
            mm2Text = mm2Text.split(/[ \r\n]+/)
            mm2Text = mm2Text.filter(c => c !== "")

        let mm3Text = mm3.makeText(1)
            mm3Text = mm3Text.split(/[ \r\n]+/)
            mm3Text = mm3Text.filter(c => c !== "")

        expect(mm1Text.length).toBeLessThanOrEqual(5)
        expect(mm2Text.length).toBeLessThanOrEqual(10)
        expect(mm3Text.length).toBeLessThanOrEqual(1)
        
        mm1Text.forEach(function(val){
            expect(Object.keys(chain1)).toContain(val)
        })
        mm2Text.forEach(function(val){
            expect(Object.keys(chain2)).toContain(val)
        })
        mm3Text.forEach(function(val){
            expect(Object.keys(chain3)).toContain(val)
        })
        
    })


})
