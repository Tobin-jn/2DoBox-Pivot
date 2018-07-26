var counter = 0;
var savedIdeas = [];

$(document).ready(function() { 
  if (localStorage === null) {
    return false;
  } else {
    persistCards();
  }
});

function clearInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
}

function deleteCard(event) {
  var deleteBtn = $(event.target).parent().find('.delete-button')
  var cardId = $(event.target).parent().attr('id');
  deleteBtn.parent().remove();
  var newArray = savedIdeas.filter(function(idea) {  
    return idea.id != cardId;
  });
  savedIdeas = newArray;
  storeIdeas(newArray);
}

function editIdea(event) {
  var cardId = $(event.target).parent().attr('id');
  var body = $(event.target).parent().find('.body-of-card'); 
  var title = $(event.target).parent().find('h2');
  body.css("text-decoration", "none");
  title.css("text-decoration", "none");
  for (var i in savedIdeas) {
    if (savedIdeas[i].id == cardId) {
      savedIdeas[i].title = title.text();
      savedIdeas[i].body = body.text();
      savedIdeas[i].status = '';
      storeIdeas(savedIdeas);
    }
  }  
}

function Idea(title, body, quality, status) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill' || quality;
  this.status = '' || status;
}

function newIdeaCard(ideaObj) {
  var newCard = `<section id="${ideaObj.id}" class="card-container">
              <h2 onmouseout="editIdea(event)" contenteditable class="title-of-card ${ideaObj.status}">${ideaObj.title}</h2>
              <button class="delete-button"></button>
              <p onmouseout="editIdea(event)" contenteditable class="body-of-card ${ideaObj.status}">${ideaObj.body}</p>
              <button class="quality-btns upvote"></button>
              <button class="quality-btns downvote"></button>
              <button class="finish-btn">done</button>
              <p class="quality"> quality: <span class="qualityVariable">${ideaObj.quality}</span></p>
              <hr>
            </section>`;
  var cardContainer = $('.bottom-box');
  cardContainer.prepend(newCard);
};

function persistCards() {
  var storedCards = localStorage.getItem('ideas');
  var parsedCards = JSON.parse(storedCards);
  parsedCards.forEach(function(idea) {
    savedIdeas.push(idea);
    newIdeaCard(idea);
  });
}

function searchCards() {
  var input = document.getElementById('search-input');
  var inputValue = input.value.toUpperCase();
  var section = document.querySelector('.bottom-box');
  var cards = section.querySelectorAll('.card-container');
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
      cards[i].style.display = '';      
    } else {
      cards[i].style.display = 'none';
    }
  }
}

function storeIdeas(idea) {
  var storedIdeas = JSON.stringify(idea);
  localStorage.clear();
  localStorage.setItem('ideas', storedIdeas);
}

function submitIdea(event) {
  event.preventDefault();
  var title = $('#title-input').val();
  var body = $('#body-input').val(); 
  var idea = new Idea(title, body);
  savedIdeas.push(idea);
  storeIdeas(savedIdeas);
  newIdeaCard(idea);
  clearInputs();
}

function strikeComplete(event) {
  var cardId = $(event.target).parent().attr('id');
  var body = $(event.target).parent().find('.body-of-card'); 
  var title = $(event.target).parent().find('h2');
  body.css("text-decoration", "line-through");
  title.css("text-decoration", "line-through");
  for (var i in savedIdeas) {
    if (savedIdeas[i].id == cardId) {
      savedIdeas[i].title = title.text();
      savedIdeas[i].body = body.text();
      savedIdeas[i].status = 'finished';
      storeIdeas(savedIdeas);
    }
  }  
}

function qualityCycle(event) {
  var cardId = $(event.target).parent().attr('id');
  var qualityTypes = ['swill', 'plausible', 'genius'];
  var qualityVar = $(event.target).parent().find('span');
  if (counter < 2 && $(event.target).hasClass('upvote')) {
    counter++;
    qualityVar.text(qualityTypes[counter]);
  } else if (counter > 0 && $(event.target).hasClass('downvote')) {
    counter --;
    qualityVar.text(qualityTypes[counter]);
  }
  for (var i in savedIdeas) {
    if (savedIdeas[i].id == cardId) {
      savedIdeas[i].quality = qualityVar.text();
      storeIdeas(savedIdeas);
    }
  }
}

$(".bottom-box").on("click", function() {
  if ($(event.target).hasClass("delete-button")) {
    deleteCard(event);
  }
  if ($(event.target).hasClass("quality-btns")) {
    qualityCycle(event);
  }
  if ($(event.target).hasClass('finish-btn')) {
    strikeComplete(event);
  }
});

$('.bottom-box').on("keyup", function(event) {
  if (event.keyCode === 13) {
    editIdea(event);
  }
});

$('.save-btn').on('click', submitIdea);

$("#search-input").on('keyup', searchCards);


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
