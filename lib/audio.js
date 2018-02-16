class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    };
    this.stop = function(){
      this.sound.pause();
    };
  }
}

export default Sound;
