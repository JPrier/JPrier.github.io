// Main will call all needed update calls to game and to display

/// FUNCTIONS

let keyPress = function(event) {
  controller.keyPress(event.type, event.keyCode);
  //game.map.objects[0].color == "white" ?  game.map.objects[0].color = "blue" : game.map.objects[0].color = "white";
};

let resize = function(event) {
  display.resize(document.documentElement.clientWidth,
                 document.documentElement.clientHeight,
                 scale);
  //display.drawObject();
};

let render = function() {

  //TODO draw game map (static objects in map array)
  display.drawMap(game.map);
  //TODO draw objects (players, npcs, etc)
  if (game.player) {
    display.drawObject(game.player);
  }
  for (let i = 0; i < game.npcs.length; i++) {
    display.drawObject(game.npcs[i]);
  }

  display.render();
};

let update = function() {

  //TODO: if controller active change game state

  game.update();

  // TODO: add a condition to stop the engine (an end goal parameter)
};

/// OBJECTS
const mainSetup = function(gameSettings) {
  //INIT
  console.log(gameSettings);
  game = new Game(gameSettings);
  display = new Display(document.querySelector("canvas"), "black");
  engine = new Engine(1000/30, update, render);

  let controls = [function() {game.controllerUp()},
                  function() {game.controllerDown()},
                  function() {game.controllerLeft()},
                  function() {game.controllerRight()}];
  controller = new Controller(controls);

  // START

  game.setup(300);

  window.addEventListener("keydown", keyPress);
  window.addEventListener("resize", resize);

  resize();
  engine.start();
}

let game = undefined;
let display = undefined;
let engine = undefined;
let controller = undefined;
let scale = 1; //Scale of the game canvas (1 will fill the full view)