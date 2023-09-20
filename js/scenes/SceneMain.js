class SceneMain extends Phaser.Scene
{
  constructor()
  {
    super('SceneMain');
  }
  
  create()
  {
    this.blockGroup = this.physics.add.group();
    this.arrowGroup = this.physics.add.group();
    this.arrowCount = 10;
    this.targetSpeed = 100;
    this.arrowSpeed = -250;
    this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
    this.score = 0;

    this.back = this.add.image(0, 0, 'back');
    this.back.displayHeight = game.config.height;
    this.back.displayWidth = game.config.width;
    this.back.setOrigin(0, 0);
    
    this.wall = this.add.image(0, 0, 'wall');
    Align.scaleToGameW(this.wall, 1);
    this.wall.setOrigin(0.5, 0);
    this.wall.x = game.config.width / 2;
    this.wall.y = 40;

    this.target = this.physics.add.sprite(0, 0, 'target');
    this.target.setVelocityX(this.targetSpeed);
    this.target.setImmovable();
    this.aGrid.placeAtIndex(16, this.target);
    Align.scaleToGameW(this.target, 0.2);

    this.input.on('pointerdown', this.addArrow, this);
    this.physics.add.collider(this.target, this.arrowGroup, this.onHitTarget, null, this);
    this.physics.add.collider(this.arrowGroup, this.blockGroup, this.onHitBlock, null, this);

    this.arrowIcon = this.add.image(0, 0, 'arrow');
    Align.scaleToGameW(this.arrowIcon, 0.02);
    this.aGrid.placeAtIndex(99, this.arrowIcon);

    this.arrowCountText = this.add.text(0, 0, this.arrowCount, {color: '#000000', fontSize: game.config.width / 20});
    this.arrowCountText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(100, this.arrowCountText);
    
    this.scoreIcon = this.add.image(0, 0, 'target');
    Align.scaleToGameW(this.scoreIcon, 0.08);
    this.aGrid.placeAtIndex(109, this.scoreIcon);

    this.scoreText = this.add.text(0, 0, this.score, {color: '#000000', fontSize: game.config.width / 20});
    this.scoreText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(108, this.scoreText);

    //this.aGrid.showNumbers();
  }

  update()
  {
    if(this.target.x > game.config.width)
    {
      this.target.setVelocityX(-this.targetSpeed);
    }
    else if(this.target.x < 0)
    {
      this.target.setVelocityX(this.targetSpeed);
    }

    this.arrowGroup.children.iterate(function(child){
      if(child && child.y < 0)
      {
        this.destroyArrow(child);
      }
    }.bind(this));

    this.blockGroup.children.iterate(function(child){
      if(child)
      {
        if(child.x < 0)
        {
          child.setVelocityX(this.targetSpeed);
        }
        else if(child.x > game.config.width)
        {
          child.setVelocityX(-this.targetSpeed);
        }
      }
    }.bind(this));
  }

  addArrow(pointer)
  {
    if(this.arrowCount <= 0) return;

    this.arrowCount--;
    this.arrowCountText.setText(this.arrowCount);
    let arrow = this.physics.add.sprite(0, 0, 'arrow');
    Align.scaleToGameW(arrow, 0.025);
    this.arrowGroup.add(arrow);
    this.aGrid.placeAtIndex(93, arrow);
    arrow.x = pointer.x;
    arrow.setVelocityY(this.arrowSpeed);

    const randomSound = Math.round(Math.random()) + 1;
    model.audioManager.playSound('swish' + randomSound);
  }

  onHitTarget(target, arrow)
  {
    model.audioManager.playSound('hit');
    this.destroyArrow(arrow);
    this.targetSpeed += 5;
    this.score++;
    this.scoreText.setText(this.score);

    const effect = new Effect({scene: this, effectNumber: model.effectArrowHit});
    effect.x = this.target.x;
    effect.y = this.target.y;

    switch (this.score) {
      case 10:
        this.addBlock(66);
        break;
      case 20:
        this.addBlock(44);
        break;
      case 30:
        this.addBlock(22);
        break;
      default:
        break;
    }
  }

  addBlock(pos)
  {
    const block = this.physics.add.sprite(0, 0, 'block');
    this.blockGroup.add(block);
    block.setVelocityX(this.targetSpeed);
    Align.scaleToGameW(block, 0.1);
    this.aGrid.placeAtIndex(pos, block);
    block.setImmovable();
  }

  onHitBlock(arrow, block)
  {
    this.destroyArrow(arrow);
  }

  destroyArrow(arrow)
  {
    arrow.destroy();
    if(this.arrowCount == 0 && this.arrowGroup.children.entries.length == 0)
    {
      if(this.checkWin())
      {
        this.doWin();
      }
      else
      {
        this.doLose();
      }
    }
  }

  checkWin()
  {
    return this.score > 0;
  }

  doWin()
  {
    const explosionEffect = new Effect({scene: this, effectNumber: model.effectExplosion});
    explosionEffect.x = this.wall.x + 3;
    explosionEffect.y = this.wall.y + 40;
    model.audioManager.playSound('boom');
    this.tweens.add({targets: this.wall, duration: 2000, alpha: 0});

    this.time.addEvent({delay: 3000, callback: this.doLose, callbackScope: this, loop: false});
  }

  doLose()
  {
    model.audioManager.stopBackgroundMusic();
    this.scene.start('SceneOver');
  }
}