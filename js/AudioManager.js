class AudioManager
{
  constructor(scene)
  {
    this.scene = scene;
  }

  playSound(key)
  {
    if(!model.sfxOn) return;
    let sound = this.scene.sound.add(key);
    sound.play();
  }

  playBackgroundMusic()
  {
    if(!model.musicOn) return;
    if(this.backgroundMusic && this.backgroundMusic.isPlaying) return;

    this.backgroundMusic = this.scene.sound.add('background', {volume: 0.5, loop: true});
    this.backgroundMusic.play();
  }

  stopBackgroundMusic()
  {
    this.backgroundMusic.stop();
    this.backgroundMusic.destroy();
  }
}