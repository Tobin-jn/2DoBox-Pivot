
//Event Listener
$('.save-btn').on('click', submitIdea);

//Submit an idea
function submitIdea(event) {
  event.preventDefault();
  console.log('Test click');
  var idea = newIdea();
  console.log(idea);
  newIdeaCard(idea.title, idea.body, idea.id, idea.currentQuality);
}

//Make an object
function newIdea() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        id: Date.now(),
        currentQuality: "swill"
    };
}

//Make new card
function newIdeaCard(title, body, id, quality) {
 
  var newCard = `<div id="${id}" class="card-container">
              <h2 class="title-of-card">${title}</h2>
              <button class="delete-button"></button>
              <p class="body-of-card">${body}</p>
              <button class="upvote"></button>
              <button class="downvote"></button>
              <p class="quality"> quality: <span class="qualityVariable">${quality}</span></p>
              <hr>
            </div>`;
  console.log(newCard);
  var cardContainer = $('.bottom-box');
  cardContainer.prepend(newCard);
};


// create an array that all data will be saved in
function initialArray() {
  var newArray = [];
  return newArray
}

//push newIdea object into array
function updateArray() {
  var savedIdea = newIdea()
  var ideaArray = initialArray()
  ideaArray.push(savedIdea)
  storeIdeas();
  return
}

//push array into Local Storage
function storeIdeas() {
  var storedIdeas = JSON.stringify(updateArray);
  localStorage.setItem('ideas', storedIdeas);
}






var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

$.each(localStorage, function(key) {
    var cardData = JSON.parse(this);
    numCards++;
    $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
});



$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       return false;
    };  

    numCards++;
    $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
    localStoreCard();
    $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      










