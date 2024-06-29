let app = new PIXI.Application({
  width: 980,
  height: 2000,
  antialias: true,
});

document.body.appendChild( app.view );

let timer = 10, value = 0, targetClick = true, mmm, gameScene, fon,
  id, state, score, scoreBar, styler, style, gameName, message;

PIXI.loader
  .add("images/fenick.json")
  .load( setup );

function setup() {
  id = PIXI.loader.resources["images/fenick.json"].textures;

  gameScene = new PIXI.Container();
  app.stage.addChild( gameScene );

  fon = new PIXI.Sprite( id["fon.jpg"] );
  fon.anchor.set(0, 0);
  gameScene.addChild( fon );

  let gameName = new PIXI.Container();
  gameName.position.set( 225, 250 );
  gameScene.addChild( gameName );

  let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 110,
    fill: "green",
  });

  message = new PIXI.Text("МММ ИГРА", style);
  gameName.addChild( message );

  let scoreBar = new PIXI.Container();
  scoreBar.position.set( 600, 650 );
  gameScene.addChild( scoreBar );

  let bgScoreBar = new PIXI.Sprite( id["coin.png"] );
  bgScoreBar.x = 760;
  bgScoreBar.y = 650;
  bgScoreBar.scale.set(0.26);
	gameScene.addChild( bgScoreBar );

  let styler = new PIXI.TextStyle({
		fontFamily: "Arial",
		fontSize: 100,
		fill: "white",
	});

  score = new PIXI.Text( "0", styler );
  score.x = -score.width / 2;
	score.y = -score.height / 2 - 1;
	scoreBar.addChild( score );

  mmm = new PIXI.Sprite( id["Hardbas.png"] );
  mmm.x = gameScene.width / 2;
	mmm.y = 1400;
  mmm.interactive = true;
  mmm.buttonMode = true;
  mmm.on("pointerdown", handlerClick);
  gameScene.addChild( mmm );

  state = play;
  app.ticker.add( delta => gameLoop( delta ) );
}

function gameLoop(delta) {
    state( delta );
}

function play() {
    if ( timer == 0 ) {
        targetClick = true;

        mmm.scale.set(1.05);

          } else if ( timer > 0 ) {
        timer--;
    }
}

function handlerClick () {
    if ( targetClick ) {
        value++;
        score.text = value;

        score.x = -score.width / 2;
    		score.y = -score.height / 2;

        mmm.scale.set(1);

        targetClick = false;

        timer = 10;
    }
}
