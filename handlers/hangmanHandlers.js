const { words } = require('../data/words');

// write your handlers here...
const handleHangmanSpecificWord = (req, res)=>{ 
    const theWord = words.find((word)=>{
        return word.id ===  req.params.id;
    });

    if (theWord !== undefined)
        res.status(200).json({ status: 200, data: theWord });
    else 
        res.status(404).json({ status: 404, message: "Word not found" });
};

const handleHangmanRamdomWord = (req, res)=>{
    const wordIndex = Math.floor(Math.random() * words.length); 
    const {id, letterCount} = words[wordIndex];
    res.status(200).json({ status: 200, data: {id: id, letterCount: letterCount} });

};

const handleHangmanGuessLetter = (req, res)=>{   
    const wordIndex = words.findIndex((word)=>{
        return word.id ===  req.params.id;
    });

    if (wordIndex === -1)
      return res.status(404).json({ status: 404, message: "Word not found" });
    
    const word = words[wordIndex].word;  
    const wordArr = word.split("");

    let isLetterContain = false;  
    const resArr = wordArr.map((letter)=>{
        const isInclude = letter === req.params.letter;
        if (isInclude) {isLetterContain = true};
        return isInclude;
    });

    if (isLetterContain)
        res.status(200).json({ status: 200, data: resArr });
    else 
        res.status(404).json({ status: 404, message: "Letter not found in the word" });

};


module.exports = { handleHangmanSpecificWord,  handleHangmanRamdomWord, handleHangmanGuessLetter };