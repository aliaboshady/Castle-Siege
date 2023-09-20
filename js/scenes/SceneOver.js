class SceneOver extends Phaser.Scene
{
  constructor()
  {
    super('SceneOver');
  }
  
  create()
  {
    this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 11});

    this.titleBack = this.add.image(0, 0, 'titleBack');
    this.titleBack.setOrigin(0, 0);
    this.titleBack.displayWidth = game.config.width;
    this.titleBack.displayHeight = game.config.height;
    
    this.buttonPlayAgain = this.add.image(0, 0, 'buttonPlayAgain');
    this.buttonPlayAgain.setInteractive();
    this.buttonPlayAgain.on('pointerdown', this.playAgain, this);
    Align.center(this.buttonPlayAgain);

    this.buttonBack = new TextButton({scene: this, callback:this.mainMenu, callbackScope: this, key: 'orange', text: 'Main Menu', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(170, this.buttonBack);

    //this.aGrid.showNumbers();
  }

  playAgain()
  {
    model.audioManager.playBackgroundMusic();
    this.scene.start('SceneMain');
  }

  mainMenu()
  {
    model.audioManager.playBackgroundMusic();
    this.scene.start('SceneTitle');
  }
}