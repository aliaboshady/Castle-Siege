class CircleTimer extends UIBlock
{
  constructor(config)
  {
    super();
    this.count = 100;
    this.duration = 3;
    this.scene = config.scene;
    this.graphics = this.scene.add.graphics();
    this.setPercentage(100);
    this.add(this.graphics);
  }

  start()
  {
    this.timer = this.scene.time.addEvent({delay: (this.duration / this.count) * 1000, callback: this.tick, callbackScope: this, loop: true});
  }

  tick()
  {
    this.count--;
    this.setPercentage(this.count);

    if(this.count <= 0)
    {
      this.stop();

      if(this.scope)
      {
        this.fun.call(this.scope);
      }
      else
      {
        this.fun.call();
      }
    }
  }

  stop()
  {
    this.timer.remove();
  }

  reset()
  {
    this.count = 100;
    this.stop();
    this.start();
  }

  setPercentage(percentage)
  {
    let rad = (percentage / 100) * 360;
    this.graphics.clear();
    this.graphics.fillStyle(0xffffff, 0.5);
    this.graphics.slice(0, 0, game.config.width * 0.1, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(rad));
    this.graphics.fillPath();
  }

  setCallback(fun, scope=null)
  {
    this.fun = fun;
    this.scope = scope;
  }
}