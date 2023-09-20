class TextButton extends UIBlock
{
  constructor(config)
  {
    super();
    this.scene = config.scene;
    this.background = this.scene.add.image(0, 0, config.key);
    this.background.setInteractive();
    this.background.on('pointerdown', this.pressed, this);
    this.add(this.background);
    Align.scaleToGameW(this.background, config.scale);

    if(config.callback)
    {
      this.callback = config.callback;
    }

    if(config.callbackScope)
    {
      this.callbackScope = config.callbackScope;
    }

    if(!config.scale)
    {
      config.scale = 0.5;
    }

    if(!config.textScale)
    {
      config.textScale = 3;
    }

    if(!config.textColor)
    {
      config.textColor = '#ffffff';
    }

    this.textField = this.scene.add.text(0, 0, config.text, {fontSize: game.config.width / config.textScale, color: config.textColor});
    this.textField.setOrigin(0.5, 0.5);
    this.add(this.textField);
  }

  pressed()
  {
    if(this.callback && this.callbackScope)
    {
      this.callback.call(this.callbackScope);
    }
    else
    {
      this.callback.apply();
    }
  }

  setText(text)
  {
    this.textField.text = text;
  }
}