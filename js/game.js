/// <reference path="../phaser.d.ts" />

let game;
let model;

window.addEventListener('load', () => {
  const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 480,
    height: 640,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [SceneLoad, SceneTitle, SceneInstructions, SceneSettings, SceneMain, SceneOver],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
  };

  model = new Model();
  game = new Phaser.Game(config)
});
