$(document).ready(function(){

let user;
let userObj;
let currentDeck;
let deckHelper;
let tempDeckLength = 0;
let tempDeck;
let deckLength;
let study;
let selectedCards;
let key;

let currentScore = 0;
let totalScore = 0;

let now = Date.now().toString();

const renderCards = (deckId, study) => {
    currentDeck = userObj.decks[deckId];  
    authorDisplay(currentDeck)

    let cardContainer = $("<div>");
    cardContainer.addClass("card-container");
    cardContainer.attr("deck", deckId);
    $("#deck-container").append(cardContainer);

    for(i=0; i < currentDeck.cards.length; i++){
        let newCard = $("<div>");
        newCard.addClass("study-card");
        newCard.attr("id", "card-" + i);
        newCard.attr("card", i);

        if(!study){
            newCard.html('<h2 class="front-edit">' + 'Front: ' + '</h2>' + '<input type="text" class="front-text-display" value="' + currentDeck.cards[i].front + '">'
            + '<h2 class="back-edit">' + 'Back: ' + '</h2>' + '<input type="text" class="back-text-display" value="' + currentDeck.cards[i].back + '">');
        }
        else{
            newCard.html('<h2 class="front-edit">' + 'Front: ' + '</h2>' + '<p class="front-text-study">' + currentDeck.cards[i].front
            + '<h2 class="back-edit">' + 'Back: ' + '</h2>' + '<p class="back-text-study">' + currentDeck.cards[i].back);
        }
        $(".card-container").append(newCard);
        }
}

const tempRender = () => {

    let cardContainer = $("<div>");
    cardContainer.addClass("card-container");
    cardContainer.attr("deck", deckHelper);
    $("#deck-container").append(cardContainer);

    for(i=0; i < currentDeck.cards.length; i++){
        let newCard = $("<div>");
        newCard.addClass("study-card");
        newCard.attr("id", "card-" + i);
        newCard.attr("card", i);

        if(!study){
            newCard.html('<h2 class="front-edit">' + 'Front: ' + '</h2>' + '<input type="text" class="front-text-display" value="' + currentDeck.cards[i].front + '">'
            + '<h2 class="back-edit">' + 'Back: ' + '</h2>' + '<input type="text" class="back-text-display" value="' + currentDeck.cards[i].back + '">');
        }
        else{
            newCard.html('<h2 class="front-edit">' + 'Front: ' + '</h2>' + '<p class="front-text-study">' + currentDeck.cards[i].front
            + '<h2 class="back-edit">' + 'Back: ' + '</h2>' + '<p class="back-text-study">' + currentDeck.cards[i].back);
        }
        $(".card-container").append(newCard);
        }
}


const addCard = (deckId) => {

    // console.log(currentDeck);
    // console.log(deckHelper + " is the deck id");

    deckLength = parseInt(currentDeck.cards.length);

    // console.log(deckLength + " is the decklength");
    // console.log(tempDeckLength + "is the tempdecklength");

    let blankCard = {
        front: "", 
        back: "",
        points: 0,
        level: 1,
        timesSeen: now,
        created: now,
        nextUp: now
    }

    currentDeck.cards.push(blankCard);

    // console.log(tempDeck.cards + "is the temporary deck");

    let newCard = $("<div>");
    newCard.addClass("study-card");
    newCard.attr("id", "card-" + deckLength);
    newCard.html('<h2 class="front-edit">' + 'Front: ' + '</h2>' + '<input type="text" class="front-text-display" value="' + "Front" + '">'+ '<h2 class="back-edit">' + 'Back: ' + '</h2>' + '<input type="text" class="back-text-display" value="' + "Back" + '">');
    $(".card-container").append(newCard);
}

const saveDeck = () =>{

    // console.log(userObj.decks);
    // console.log(deckLength + "is length");

    for(i=0; i < currentDeck.cards.length; i++){
        let frontText = $("#card-" + i).find(".front-text-display").val();
        currentDeck.cards[i].front = frontText;
        let backText = $("#card-" + i).find(".back-text-display").val();
        currentDeck.cards[i].back = backText;
    }

    // console.log(currentDeck);
    // console.log(userObj);

    let data ={
        username: userObj.username,
        email: userObj.email,
        joined: userObj.joined,
        decks: userObj.decks
    }
    // console.log(data);
    $.ajax({
        url: '/users/' + user + '/deck',
        type: 'PUT',
        data: {
            decks: userObj.decks
        },
        success: function(data) {
          console.log('Added deck.');
        }
      });

    // let frontText = $(this).find(".front-text-display").val();
    // let backText = $(this).find(".back-text-display").val();

}

const deleteDeck = () => {
    userObj.decks.splice(deckHelper, 1);
    console.log(userObj.decks);
    let answer = confirm("Are you sure?");

    if(!answer){
        return console.log("Deletion stopped.");
    }
    $.ajax({
        url: '/users/' + user + '/deck',
        type: 'PUT',
        data: {
            decks: userObj.decks
        },
        success: function(data) {
          console.log('deleted deck.');
          window.location.href = '/mydecks';
        }
      });
}

const renderDecks = (user) => {

    for(i=0; i < user.decks.length; i++){
        let newDeckWrapper = $("<div>");
        newDeckWrapper.attr("id", "deck-wrapper-" + i);
        newDeckWrapper.attr("deck", i);
        newDeckWrapper.addClass("deck-wrapper row");
        $("#deck-container").append(newDeckWrapper);
        
        let newDeck = $("<div>");
        newDeck.attr("id", "deck-" + i);
        newDeck.addClass("deck");
        newDeck.html('<h2 class="deckname">' + user.decks[i].deckname + '</h2>' + '<p class="createdby"> by ' + user.decks[i].createdBy + '</p>');
        $("#deck-wrapper-" + i).append(newDeck);
    
        let newStudyBtn = $("<div>");
        newStudyBtn.addClass("study-btn btn btn-success");
        newStudyBtn.html("Study");
        newStudyBtn.attr("deck", i);
        $("#deck-wrapper-" + i).append(newStudyBtn);
    
        let newEditBtn = $("<div>");
        newEditBtn.addClass("edit-btn btn btn-danger");
        newEditBtn.html("Edit");
        newEditBtn.attr("deck", i);
        $("#deck-wrapper-" + i).append(newEditBtn);
      }
}

const studyDeckOptions = (deckId) => {
    currentDeck = userObj.decks[deckId];  
    authorDisplay(currentDeck);
    studyOptionsRender();

    study = true;

    let studyContainer = $("<div>");
    studyContainer.addClass("study-container");
    studyContainer.attr("deck", deckId);
    $("#deck-container").append(studyContainer);

    // let studyOptions = $("<div>");
    // studyOptions.addClass("study-options");
    // studyOptions.html('<div class="alert alert-success" role="alert">Select the cards you wish to study this session. By default, it will study your whole deck.</div>')
    // $(".study-container").append(studyOptions);

    //'<div class="row" id="numselect"><p> Number of cards to study: </p></div><div class="row"><input id="study-num" val="20"</input></div>

    renderCards(deckHelper, true);
    }

const authorDisplay = (deck) => {

    $("#mydecks").hide();
    $("#decktitle").show();
    $("#cardnum").show();
    $("#cardnum").html(deck.cards.length + " cards");
    $("#decktitle").html(deck.deckname);

}

const editNavDisplay = (deck) => {

    $('#create-deck-btn').hide();
    $('#add-card-btn').show();
    $('#save-deck-btn').show();
    $('#share-deck-btn').show();
    $('#del-card-btn').show();
    $('#go-back-btn').show();
    $('#delete-deck').show();
    $('.deck-wrapper').remove();

}

const studyOptionsRender = () =>{
    $('#create-deck-btn').hide();
    $('#start-study-btn').show();
    $('#go-back-btn').show();

}

const studyRender = () => {
    $('.study-container').remove();
    $('.card-container').remove();
    $('#go-back-btn').hide();
    $('#start-study-btn').hide();
    $('#cardnum').hide();
    studyStart();
}

const studyCardRender = () => {

    let studyContainer = $("<div>");
    studyContainer.addClass("study-container");
    studyContainer.attr("deck", deckHelper);
    $("#card-study-area").append(studyContainer);

    let cardDisplay = $("<div>");
    cardDisplay.attr("id", "card-display");
    $(".study-container").append(cardDisplay);

}

const studyStep = () => {

    console.log(totalScore);

    $("#cardnum").html(selectedCards.length + " cards left!");
    console.log(selectedCards);
    $("#next-card").hide();
    $("#card-display").html('');

    if(selectedCards.length === 0){
        $("#card-display").html("All finished!")
        $("#go-back-btn").show();
        return console.log("done")
    }

    $("#study-known").show();
    $("#study-unknown").show();

    key = selectedCards.shift();
    console.log(key + " is the key");
    $("#card-display").html('<h3 id="front-card">' + currentDeck.cards[key].front + '</h3>');
    // selectedCards.splice(key, 1);

}

const studyShowAnswer = () => {
    console.log(selectedCards);
    $("#study-known").hide();
    $("#study-unknown").hide();
    $("#next-card").show();
    $("#card-display").html('<h3 id="front-card">' + currentDeck.cards[key].front + '</h3><br>' 
                        +   '<h3 id="back-card">' + currentDeck.cards[key].back) + '</h3>';

}



const studyStart = () => {

    let currentScore = 0;
    let totalScore = 0;

    $("#decktitle").remove();
    $("#cardnum").show();
    $("#score").show();

    selectedCards = [];

    for(i=0; i < currentDeck.cards.length; i++){
        if($("#card-0").hasClass("study-card")){
            console.log("HEYYYYY")
         }
     }


    if(selectedCards.length == 0){
        for(i=0; i < currentDeck.cards.length; i++){
            selectedCards.push(i);
        }
        console.log(selectedCards + "selected");
        studyCardRender();
        studyStep();
    }
    else{
        studyCardRender();
        studyStep();
    }
}

//grab user data
$.get('/session', function(data) {
   user = data;
})

//initial deck render
$.get('/getuserdecks', function(data){
    userObj = data;
    renderDecks(userObj);
})


//on click functions

$("body").on("click", ".study-btn", function(){
    deckHelper = $(this).attr("deck");
    studyDeckOptions(deckHelper);
  $('.deck-wrapper').remove();
  });

$("body").on("click", ".edit-btn", function(){
    deckHelper = $(this).attr("deck");
    editNavDisplay();
    renderCards(deckHelper);
  })

$("body").on("click", "#add-card-btn", function(){
    addCard();
  })

  $("body").on("click", "#delete-deck", function(){
    deleteDeck();
  })

$("body").on("click", "#save-deck-btn", function(){
    saveDeck();
  })

  $("body").on("click", "#start-study-btn", function(){
    studyRender();
  })

$("body").on("click", "#study-known", function(){
    currentDeck.cards[key].points++;
    studyShowAnswer();
    currentScore++;
    totalScore++;
    $("#score").html(currentScore + " out of " + totalScore + " - " + (currentScore/totalScore * 100).toString().substring(0,4) + "%");

})

$("body").on("click", "#study-unknown", function(){
    console.log(selectedCards.length);
    selectedCards.push(key);
    studyShowAnswer();
    totalScore++;
    $("#score").html(currentScore + " out of " + totalScore);
    $("#score").html(currentScore + " out of " + totalScore + " - " + (currentScore/totalScore * 100).toString().substring(0,4) + "%");
})

$("body").on("click", "#next-card", function(){
    studyStep();
})

$("body").on("click", ".study-card", function(){

        let id = $(this).attr("card");
        console.log("study card" + id);
        if($(this).hasClass("selected")){
            $(this).removeClass("selected")
        }
        else{
            $(this).addClass("selected")
        }
    }
  );


  $("body").on("click", "#del-card-btn", function(){
        for(i=0; i < currentDeck.cards.length; i++){
           if($("#card-" + i).hasClass("selected")){
               console.log(i + " has been selected");
               currentDeck.cards.splice(i, 1);
               console.log(currentDeck);
               $("#card-" + i).remove();
            }
        }
    }
);







});
