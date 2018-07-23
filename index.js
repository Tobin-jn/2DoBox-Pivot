var arrIdeas = [];
var counter = 0;
//Event Listener
$('.save-btn').on('click', submitIdea);

//Submit an idea
function submitIdea(event) {
  event.preventDefault();
  var title = $('#title-input').val();
  var body = $('#body-input').val();

  //this instantiates a new idea from our constructor function
  // we pass in the title and body 
  var idea = new Idea(title, body);
  arrIdeas.push(idea);
  console.log(arrIdeas);
  // we pass the newly created "idea" object to newIdeaCard function
  newIdeaCard(idea);
}

// function constructor -- creates a new object.
function Idea(title, body, quality) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = 'swill' || quality;;
}

//Make new card
function newIdeaCard(ideaObj) {
    //since we passed in the idea object we can use the values from it
    //using dot notation
  var newCard = `<div id="${ideaObj.id}" class="card-container">
              <h2 class="title-of-card">${ideaObj.title}</h2>
              <button class="delete-button"></button>
              <p class="body-of-card">${ideaObj.body}</p>
              <button class="upvote"></button>
              <button class="downvote"></button>
              <p class="quality"> quality: <span class="qualityVariable">${ideaObj.quality}</span></p>
              <hr>
            </div>`;
  var cardContainer = $('.bottom-box');
  cardContainer.prepend(newCard);
};

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       return false;
    };  
    // numCards++;
    // $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
    // localStoreCard();
    // $('form')[0].reset();
});

function qualityCycle(event) {
    var qualityTypes = ['swill', 'plausible', 'genius'];
    var qualityVar = $(event.target).parent().find('span');
    if (counter < 2 && $(event.target).hasClass('upvote')) {
      counter++;
    } else if (counter > 0 && $(event.target).hasClass('downvote')) {
      counter --;
    }
    qualityVar.text(qualityTypes[counter]);
}

$(".bottom-box").on('click', qualityCycle);

// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
      










