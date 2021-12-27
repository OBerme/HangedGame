//Created by Óscar Bermejo Domínguez
const DEBUG = true;
const showCreator = true;

const maxButtonsRow = 7;
const maxFailsPossible = 6;
const possibleWords = ["potatoe", "spongebob", "squid", "letter", "message", "flipflop", "trush", "ceil"];
const hangedCartoon = 
"|__"+
"\n  o" +
"\n /|\\" + 
"\n / \\";

var letterButtons = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var chosenWord = "";//The next word that contains the hanged
let rightWords; //array than will contains the words that the user has suceeded
let stepCost; //Cost that will be applied to represent the cartoon in the input
let lettersCount = 0; //Count of the letters finided in the game
let buttons; //Array with the buttons of the game

//Inputs
var chosenWordInput = document.getElementById("chosenWordInput");

//Texts areas that will contains the information of the progres of the user
var wordsUsedTextArea = document.getElementById("wordsUsedTextArea");
var cartoonTextArea = document.getElementById("cartoonTextArea");wonText

var wonTextInput = document.getElementById("wonText");
var failTextInput = document.getElementById("failText");

let fails = 0; //count of fails of the user

function init(){
    createKeyBoard();
    chosseTheNextWord();
    calculateStepCost();


    wonTextInput.value = "0";
    failTextInput.value = "0";
    
    if(showCreator){
        console.log(" ");
        console.log("Created by Óscar Bermejo " + 
        "\nFinished date " + finishedDate + 
        "\nTime taked " + timeCost)
    }    
}

//Calculates the step cost if the users fails one letter
function calculateStepCost(){
    stepCost = Math.ceil( hangedCartoon.length / maxFailsPossible);
    if(DEBUG){
        console.log("StepCost: " + stepCost);
    }
}



///Letters methods or logic of the game
function checkHasLetter(letter){
    if(fails != maxFailsPossible){
        if(chosenWord.includes(letter)){
            showLetter(letter);
            if(lettersCount >= rightWords.length){
                if(DEBUG)
                    console.log("GAME!");
                wonTextInput.value =  (parseInt(failTextInput.value)+1) +"";
            }
        }
        else{
            showStepAhanged();
            fails++;
            if(fails >= maxFailsPossible){
                failTextInput.value =  (parseInt(failTextInput.value)+1) +"";
                if(DEBUG){
                    console.log("game over");
                }
            }
            if(DEBUG){
                console.log("Fail" + fails); 
            }
        }
        wordsUsedTextArea.innerHTML = wordsUsedTextArea.value + " "+ letter;
    }
    else{
        clearGame();
    }
    
        
    
    
}

//Check if the chosenWord contains more than one letter inside it 
// and it represents the letters inside the input 
function showLetter(letter){
    var arrayLetters = chosenWord.split(letter);

    //If the word contains more than one letter
    let lettersFounded = arrayLetters.length-1;
    if(lettersFounded > 1){
        lettersCount += lettersFounded;
        let indexNextLetter = 0;
        for(let i = 0; i < lettersFounded; i++){
            //Check the next letters in front the actual indexLetter
            indexNextLetter = chosenWord.indexOf(letter, 
                i != 0 ? ++indexNextLetter : indexNextLetter); //Check the nexts words in front of the actual letter
            rightWords[indexNextLetter] = letter;
            
        }
    }
    else{
        var indexLetter = chosenWord.indexOf(letter, 0);
        rightWords[indexLetter] = letter;
        lettersCount++;
    }
    if(DEBUG){
        console.log("RightWords: "  +rightWords);
    }
    viewWordChossen(rightWords);
}

function showStepAhanged(){
    cartoonTextArea.innerHTML += getNextFailString(fails);;

    if(fails >= maxFailsPossible-1 ){
        cartoonTextArea.innerHTML += "\nGAME OVER";
    }
}

function getNextFailString(fail){
   return hangedCartoon.substring(fail*stepCost,  (fail*stepCost)+stepCost) ;
}

///Creates the buttons logic and the keyboard of the player
function createKeyBoard(){
    var buttonCount = 0;
    var letters = letterButtons.split("");
    buttons = new Array(letters.length);
    
    for (var i = 0; i < letters.length; i++) {
        let newButton = createLetterButton(letters[i]);
        buttons[i] = newButton;
        document.body.appendChild(newButton);
        
        if(++buttonCount > maxButtonsRow){
            document.body.appendChild(document.createElement("br"));
            buttonCount = 0;
        };
     }
}


function createLetterButton(letter){
    var button = document.createElement("button");
    button.innerHTML = letter;
    button.name = "button" +letter;
    button.onclick = function() {
        onButtonClick(button, letter);
    }
    return button;
    
}

function onButtonClick(button, letter){
    button.disabled = true;
    checkHasLetter(letter);
    
}

///Creates the next word that will be show
function chosseTheNextWord(){
    var indexWordChossen = Math.floor(Math.random() * possibleWords.length);
    
    chosenWord = possibleWords[indexWordChossen].toUpperCase();
    rightWords = new Array( chosenWord.length );

    viewWordChossen(rightWords);

    if(DEBUG){
        console.log("RightWords: " + rightWords);
        console.log("ChosenWord:" + chosenWord);
    }
    
}




function viewWordChossen(rightWords){
    chosenWordInput.value = createStringFormatWord(rightWords);
}

function createStringFormatWord(rightWords){
    var format = "";
    for(var i = 0; i < rightWords.length; i++){
        let nextWord = rightWords[i];
        
        format += nextWord != null ? nextWord : "_" +  " ";
    }
    return format;
}


function clearGame(){
    fails = 0;

    wordsUsedTextArea.innerHTML =  "";
    cartoonTextArea.innerHTML =  "";
    buttons.forEach(button => {
        if(button.disabled)
            button.disabled = false;
    });
    chosenWordInput.value = "";
    chosseTheNextWord();
}

const finishedDate = "27/12/2021";
const timeCost = "6 hours";

init();

