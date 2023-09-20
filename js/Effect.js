class Effect extends UIBlock
{
  constructor(config)
  {
    super();
    this.scene = config.scene;
    let key = 'effect' + config.effectNumber;
    let animKey = 'animKey' + config.effectNumber;

    if(!this.scene.anims.anims.has(animKey))
    {
      this.scene.anims.create({
        key: animKey,
        frames: this.scene.anims.generateFrameNumbers(key),
        frameRate: 32,
        repeat: false
      });
    }

    this.effectImage = this.scene.add.sprite(0, 0, key);
    this.add(this.effectImage);
    this.effectImage.play(animKey);
    this.effectImage.on('animationcomplete', this.destroyMe, this);
  }

  static preload(scene, effectNumber)
  {
    let key = 'effect' + effectNumber;
    let path = 'images/effects/' + effectNumber + '.png';
    scene.load.spritesheet(key, path, {frameWidth: 100, frameheight: 100});
  }

  destroyMe()
  {
    this.destroy();
  }
}