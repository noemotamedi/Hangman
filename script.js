




//Sets up the page
function setUpPage(){
    //Makes "game" class invisible
    var gameElements = document.getElementsByClassName('game').length;
    for(var i=0;i<gameElements;i++) {
        document.getElementsByClassName('game')[i].style.display = 'none';
    }
    //Makes "FrontPage" class visible
    var FrontPageElements = document.getElementsByClassName('FrontPage').length;
    for(var i=0;i<FrontPageElements;i++) {
        document.getElementsByClassName('FrontPage')[i].style.display = 'block';
    }
    //Makes "Won" and "lost"
    var wonElements = document.getElementsByClassName('Won').length;
    for(var i=0;i<wonElements;i++) {
        document.getElementsByClassName('Won')[i].style.display = 'none';
    }
    var lostElements= document.getElementsByClassName('lost').length;
    for(var i=0;i<lostElements;i++) {
        document.getElementsByClassName('lost')[i].style.display = 'none';
    }

    //Resets everything in the game
    lettersLeft=lettersInAlphabet.slice(0);
    document.getElementById('ChooseLetter').innerHTML='';
    while(guessedLetters.length>0){
        guessedLetters.pop();
    }
    lettersGotten=0;
    //Starts at 1 because of how the images are named
    missedLetters=1;
    document.getElementById('otherLetters').innerHTML='<p><u>Letters Guessed</u></p>';
    document.getElementById('Chances').innerHTML="<p><u>Chances Left</u></p><p>6</p>";
}


//Starts the game
function startGame(){
    //Sets up the "game" and gets rid of the "FrontPage"
    var FrontPageElements = document.getElementsByClassName('FrontPage').length;
    for(var i=0;i<FrontPageElements;i++) {
        document.getElementsByClassName('FrontPage')[i].style.display = 'none';
    }
    var gameElements = document.getElementsByClassName('game').length;
    for(var j=0;j<gameElements;j++) {
        document.getElementsByClassName('game')[j].style.display = 'block';
    }

    document.getElementById('HangmanImage').innerHTML="<img src='img/"+ "Hangman1" +".jpg'>";

    var difficulty=document.getElementById('chooseDifficulty').value;
    if(difficulty==1){
        word=easy[Math.floor(Math.random()*easy.length)]
    }
    if(difficulty==2){
        word=medium[Math.floor(Math.random()*easy.length)]
    }
    if(difficulty==3){
        word=hard[Math.floor(Math.random()*easy.length)]
    }
    console.log(word);

    //Sets up the word
    document.getElementById('letters').innerHTML="<p>";
    for(var k=0;k<word.length;k++){
    document.getElementById('letters').innerHTML+="_ "
    }
    document.getElementById('letters').innerHTML+="</p>";

    //Select box
    for(var i=0;i<lettersLeft.length;i++) {
        document.getElementById('ChooseLetter').innerHTML+="<option value="+lettersLeft[i]+">"+lettersLeft[i]+"</option>";
    }
}


//Plays game
function playGame(){
    //Important variables
    var letterGuessed=document.getElementById('ChooseLetter').value;
    document.getElementById('letters').innerHTML='';
    var wrongAnswer;
    var alreadyGuessed;

    //Letter guessing thing
   if(letterGuessed!=' ') {

       wrongAnswer = true;

       for (var i = 0; i < word.length; i++) {

           alreadyGuessed=false;

           //Tests for letters in the word that were already guessed
           for(var j=0;j<guessedLetters.length;j++){
               if(word[i]==guessedLetters[j]){
                   alreadyGuessed= true;
                   break;
               }
           }

            //If they guessed it right
           if (word[i] == letterGuessed) {
               document.getElementById('letters').innerHTML += word[i];
               wrongAnswer = false;
               lettersGotten+=1;
           }else{
               //puts the letters that were already there
               if(alreadyGuessed==true){
                   document.getElementById('letters').innerHTML += guessedLetters[j];
               }else{
                   document.getElementById('letters').innerHTML += '_';
               }
           }
           document.getElementById('letters').innerHTML += ' ';
           guessedLetters.push(letterGuessed);
       }
   }

   //If conditions
   if(word.length==lettersGotten){
       wonGame();
       return;
   }
   if(wrongAnswer==true){
       missedLetters+=1;
       if(missedLetters==7){
           lostGame();
           return;
       }
       document.getElementById('HangmanImage').innerHTML="<img src='img/Hangman"+ missedLetters +".jpg'>";
   }
   document.getElementById


   //Changes the select box
    var letterNumber=lettersLeft.indexOf(letterGuessed);
    lettersLeft.splice(letterNumber, 1);
    document.getElementById('ChooseLetter').innerHTML=' ';
    for(var j=0;j<lettersLeft.length;j++) {
        document.getElementById('ChooseLetter').innerHTML+="<option value="+lettersLeft[j]+">"+lettersLeft[j]+"</option>";
    }
    //Updates "otherLetters" and "Chances"
    document.getElementById('otherLetters').innerHTML+=letterGuessed+', ';
    document.getElementById('Chances').innerHTML="<p><u>Chances Left</u></p>"+ "<p>"+(7-missedLetters)+ "</p>";
}


//If they win
function wonGame(){
    //Sets up the won game stuff, room to easily add more things
    var wonElements = document.getElementsByClassName('Won').length;
    for(var k=0;k<wonElements;k++) {
        document.getElementsByClassName('Won')[k].style.display = 'block';
    }
    //Deletes game class
    var gameElements = document.getElementsByClassName('game').length;
    for(var k=0;k<gameElements;k++) {
        document.getElementsByClassName('game')[k].style.display = 'none';
    }
    document.getElementById('reStart').style.display='block';

    return;
}


//If they lose
function lostGame(){
    console.log(guessedLetters);
    //Sets up the lost game stuff, room to easily add more things
    var lostElements = document.getElementsByClassName('lost').length;
    for(var k=0;k<lostElements;k++) {
        document.getElementsByClassName('lost')[k].style.display = 'block';
    }
    //Deletes game class
    var gameElements = document.getElementsByClassName('game').length;
    for(var k=0;k<gameElements;k++) {
        document.getElementsByClassName('game')[k].style.display = 'none';
    }
    document.getElementById('reStart').style.display='block';
    if(document.getElementById('chooseDifficulty').value==1){
        document.getElementById('turnDown').style.display='none';
    }

    return;
}





































//Useful arrays
var guessedLetters=[];
var lettersLeft=[];
var lettersInAlphabet= [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//Arrays of words
var easy=['bat','dog','come','game','love','talk','cake','sand','wood','racecar','shark'];
var medium=['sexuality','quitter','lumberjack','buccaneer','treasure','baseball','diamond','computer','geography','methamphetamine','ragnorok','gravity'];
var hard=['oxymoron','onyx','renaissance','absement','quark','laxative','inflammable','pterodactyl','quasit','quarrel','quarry'];