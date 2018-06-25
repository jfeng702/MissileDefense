class SoundEffects {
  constructor() {
    this.gameStarted = false;
    this.effects = {
      laser: 'https://res.cloudinary.com/slicecloud/video/upload/v1529961216/laser_p9g9n9.wav',
      collision: 'https://res.cloudinary.com/slicecloud/video/upload/v1529961187/bang_f3wm7e.wav',
      barrage: 'https://res.cloudinary.com/slicecloud/video/upload/v1529964026/special_njbcei.wav'
    };
  }

  play(soundEffect) {
    if (this.gameStarted) {
      console.log(soundEffect);
      var audioContext = new AudioContext();
      var request = new XMLHttpRequest();

      request.open('GET', this.effects[soundEffect], true);
      request.responseType = 'arraybuffer';
      request.onload = function () {
        var undecodedAudio = request.response;
        audioContext.decodeAudioData(undecodedAudio, function (buffer) {
          // The contents of our mp3 is now an AudioBuffer
          var sourceBuffer = audioContext.createBufferSource();
          sourceBuffer.buffer = buffer;
          sourceBuffer.connect(audioContext.destination);
          sourceBuffer.start(audioContext.currentTime);
        });
      };
      request.send();
    }
  }
}

export default SoundEffects;
