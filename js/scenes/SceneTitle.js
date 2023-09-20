class SceneTitle extends Phaser.Scene
{
  constructor()
  {
    super('SceneTitle');
  }
  
  create()
  {
    this.titleBack = this.add.image(0, 0, 'titleBack');
    this.titleBack.setOrigin(0, 0);
    this.titleBack.displayWidth = game.config.width;
    this.titleBack.displayHeight = game.config.height;

    model.audioManager.playBackgroundMusic();

    this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
    
    this.titleText = this.add.text(0, 0, 'CASTLE\nSIEGE', {fontSize: game.config.width / 5, color: '#ff0000'});
    
    this.buttonInstructions = new TextButton({scene: this, callback:this.showInstructions, callbackScope: this, key: 'green', text: 'How To Play', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(51, this.buttonInstructions);
    
    this.buttonStart = new TextButton({scene: this, callback:this.startGame, callbackScope: this, key: 'red', text: 'Start Game', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(73, this.buttonStart);
    
    this.buttonSettings = new TextButton({scene: this, callback:this.showSettings, callbackScope: this, key: 'orange', text: 'Settings', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(95, this.buttonSettings);
    
    //this.aGrid.showNumbers();
  }

  showInstructions()
  {
    this.scene.start('SceneInstructions');
  }
  
  startGame()
  {
    this.scene.start('SceneMain');
  }

  showSettings()
  {
    this.scene.start('SceneSettings');
  }
}