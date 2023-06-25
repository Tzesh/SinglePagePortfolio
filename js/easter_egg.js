// ugurdindar.com - easter egg
// just click on the 'Tzesh' logo to activate easter egg

var myAudio = document.getElementById("easterAudio");
var isPlaying = false;
myAudio.volume = 0.10;

function togglePlay() {
    if (isPlaying) {
        myAudio.pause();
    } else {
        myAudio.play();
    }
};

$(function() {
    $('.avatar').hover(function() {
      $('.hidden-text').css('visibility', 'visible');
    }, function() {
      $('.hidden-text').css('visibility', 'hidden');
    });
  });

myAudio.onplaying = function () {
    isPlaying = true;
};

myAudio.onpause = function () {
    isPlaying = false;
};