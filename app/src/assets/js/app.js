$('.button').on('click', function () {
  let randHex = '#'+Math.floor(Math.random()*16777215).toString(16);
  $('.app').css('background',randHex);
});

function calcRandX() {
  var bodyWidth = document.body.clientWidth;
  var randPosX = Math.floor((Math.random()*bodyWidth));
  return randPosX;
}

function calcRandY() {
  var bodyHeight = document.body.clientHeight;
  var randPosY = Math.floor((Math.random()*bodyHeight));
  return randPosY;
}

function posTitle() {
  $('h1').css('left', calcRandX());
  $('h1').css('top', calcRandY());
};

function posButton() {
  $('.button').css('left', calcRandX());
  $('.button').css('top', calcRandY());
};

function posLink() {
  $('a').css('left', calcRandX());
  $('a').css('top', calcRandY());
};

posLink();
posButton();
posTitle();
