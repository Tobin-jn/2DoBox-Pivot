var arrIdeas = [];
var counter = 0;
var savedIdeas = [];

function submitIdea(event) {
  event.preventDefault();
  var title = $('#title-input').val();
  var body = $('#body-input').val(); 
  var idea = new Idea(title, body);
  savedIdeas.push(idea);
  storeIdeas()
  newIdeaCard(idea);
}

function storeIdeas() {
  var storedIdeas = JSON.stringify(savedIdeas);
  localStorage.setItem('ideas', storedIdeas);
}

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill' || quality;
}

function newIdeaCard(ideaObj) {
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

var localStoreCard = function() {
  var cardString = JSON.stringify(cardObject());
  localStorage.setItem('card' + numCards  , cardString);
}

// $.each(localStorage, function(key) {
//   var cardData = JSON.parse(this);
//   numCards++;
//   $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

$('.save-btn').on('click', submitIdea);

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