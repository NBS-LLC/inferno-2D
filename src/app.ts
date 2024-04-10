import { Game, Scene } from "phaser";

import GameConfig = Phaser.Types.Core.GameConfig;
import Polygon = Phaser.GameObjects.Polygon;
import Color = Phaser.Display.Color;
import Text = Phaser.GameObjects.Text;

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    init,
    preload,
    create,
    update,
  },
};

const game = new Game(config);
let debugging: boolean = false;
let player: Polygon;
let fpsText: Text;
let pointerText: Text;

function init(this: Scene) {
  this.input.keyboard.addKey("esc").on("down", handleRestart.bind(this));

  this.input.keyboard
    .addKey("backtick")
    .on("down", () => (debugging = !debugging));
}

function preload(this: Scene) {
  // TODO: Preload scene data.
}

function create(this: Scene) {
  const background = this.add.graphics();
  const bgGradient = getDayGradient();
  background.fillGradientStyle(
    bgGradient[0],
    bgGradient[1],
    bgGradient[2],
    bgGradient[3],
    1,
  );
  background.fillRect(0, 0, 800, 600);

  player = this.add.polygon(
    100,
    400,
    getPlayerVertices(),
    Color.GetColor(110, 110, 110),
  );

  fpsText = this.add.text(16, 32, "", { fontSize: "16px", color: "#FFF" });
  pointerText = this.add.text(16, 48, "", { fontSize: "16px", color: "#FFF" });
}

function update(this: Scene) {
  fpsText.setText(debugging ? getFPSDetails() : "");
  pointerText.setText(debugging ? getPointerDetails(this) : "");
}

function getDayGradient(): number[] {
  return [0x0288d1, 0x288d1, 0xacf0f2, 0xacf0f2];
}

function getPlayerVertices(): number[][] {
  // 0,0 is top,left
  // Positive x = right
  // Positive y = down
  // Vertices need to be clockwise

  return [
    [0, 0],
    [40, 10],
    [0, 20],
  ];
}

function getFPSDetails(): string {
  return "FPS: " + game.loop.actualFps.toFixed(2);
}

function getPointerDetails(scene: Scene): string[] {
  const pointer = scene.input.activePointer;
  return ["x: " + pointer.x, "y: " + pointer.y];
}

function handleRestart(this: Scene) {
  debugging = false;
  this.scene.restart();
}
