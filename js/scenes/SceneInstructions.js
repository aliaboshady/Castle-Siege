class SceneInstructions extends Phaser.Scene
{
  constructor()
  {
    super('SceneInstructions');
  }
  
  create()
  {
    this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 11});

    this.titleBack = this.add.image(0, 0, 'titleBack');
    this.titleBack.setOrigin(0, 0);
    this.titleBack.displayWidth = game.config.width;
    this.titleBack.displayHeight = game.config.height;

    this.sampleImage = this.add.image(0, 0, 'sample');
    Align.scaleToGameW(this.sampleImage, 0.5);
    this.aGrid.placeAtIndex(60, this.sampleImage);
    
    this.text1 = this.add.text(0, 0, 'Shoot the target\nas many times as you can.\nTry to destroy the castle!!', {color: '#ffffff', stroke: '#000000', strokeThickness: 4, fontSize: game.config.width / 28});
    this.text1.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(137, this.text1);

    this.buttonBack = new TextButton({scene: this, callback:this.goBack, callbackScope: this, key: 'green', text: 'Back', scale: 0.45, textScale: 20, textColor: '#000000'});
    this.aGrid.placeAtIndex(170, this.buttonBack);

    //this.aGrid.showNumbers();
  }

  goBack()
  {
    this.scene.start('SceneTitle');
  }
}