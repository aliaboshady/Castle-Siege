class SceneSettings extends Phaser.Scene
{
  constructor()
  {
    super('SceneSettings');
  }
  
  create()
  {
    this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 11});

    this.titleBack = this.add.image(0, 0, 'titleBack');
    this.titleBack.setOrigin(0, 0);
    this.titleBack.displayWidth = game.config.width;
    this.titleBack.displayHeight = game.config.height;

    this.buttonSound = new TextButton({scene: this, callback:this.SFXToggle, callbackScope: this, key: 'green', text: 'SFX ON', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(60, this.buttonSound);

    this.buttonMusic = new TextButton({scene: this, callback:this.musicToggle, callbackScope: this, key: 'green', text: 'Music ON', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(93, this.buttonMusic);

    this.buttonBack = new TextButton({scene: this, callback:this.goBack, callbackScope: this, key: 'orange', text: 'Back', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(170, this.buttonBack);

    //this.aGrid.showNumbers();

    model.sfxOn ? this.buttonSound.setText('SFX ON') : this.buttonSound.setText('SFX OFF');
    model.musicOn ? this.buttonMusic.setText('Music ON') : this.buttonMusic.setText('Music OFF');
  }

  SFXToggle()
  {
    model.sfxOn = !model.sfxOn;
    model.sfxOn ? this.buttonSound.setText('SFX ON') : this.buttonSound.setText('SFX OFF');
  }
  
  musicToggle()
  {
    model.musicOn = !model.musicOn;
    model.musicOn ? this.buttonMusic.setText('Music ON') : this.buttonMusic.setText('Music OFF');
    model.musicOn ? model.audioManager.playBackgroundMusic() : model.audioManager.stopBackgroundMusic();
  }

  goBack()
  {
    this.scene.start('SceneTitle');
  }
}