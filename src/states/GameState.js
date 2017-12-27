import Moon from 'objects/Moon';
import Cloud from 'objects/Cloud';
import Mountains from 'objects/Mountains';
import Houses from 'objects/Houses';
import Roofs from 'objects/Roofs';
import Santa from 'objects/Santa';
import Crow from 'objects/Crow';
import Chimney from 'objects/Chimney';
import Box from 'objects/Box';

class GameState extends Phaser.State {
	
	preload(){
		/** Preload Require Asstes */
		this.game.load.image('sky', 'assets/xmas-sky.png');
		this.game.load.image('moon', 'assets/moon.png');
		this.game.load.image('cloud1', 'assets/cloud1.png');
		this.game.load.image('cloud2', 'assets/cloud2.png');
		this.game.load.image('cloud3', 'assets/cloud3.png');
		this.game.load.image('mountains', 'assets/mountains_test.png');
		this.game.load.image('houses', 'assets/houses.png');
		this.game.load.spritesheet('chimney', 'assets/chimney.png', 76, 120, 6);
		this.game.load.image('roofs', 'assets/roofs.png');
		this.game.load.spritesheet('santa', 'assets/santa.png', 134, 48, 7, 0, 10);
		this.game.load.image('magicParticle', 'assets/magicParticle.png', 16, 16);
		this.game.load.spritesheet('crow', 'assets/crow.png', 48, 40, 4);
		this.game.load.spritesheet('box1', 'assets/box1.png', 32, 32, 8);
		this.game.load.spritesheet('box2', 'assets/box2.png', 32, 32, 8);
		this.game.load.spritesheet('box3', 'assets/box3.png', 32, 32, 8);
		this.game.load.image('snowflake', 'assets/snowflake_50.png', 16, 16);

		/** Preload Font Loader */
		// this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.game.load.bitmapFont('myfont', 'assets/font/font.png', 'assets/font/font.fnt');

		/** Preload Sounds */
		// this.game.load.audio('tune', ['assets/sounds/xmas_songs_arcade_punk_remix.mp3','assets/sounds/8bp038-05-bit_shifter-let_it_snow.ogg']);
		this.game.load.audio('tune', 'assets/sounds/xmas_songs_arcade_punk_remix.mp3');
		this.game.load.audio('collect', 'assets/sounds/collect.mp3');
		this.game.load.audio('death', 'assets/sounds/death.mp3');
	}

	create() {

		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.game.scale.startFullScreen();
		// this.game.scale.setShowAll();
		// this.game.scale.refresh();


		this.game.score = 0;
		this.game.speed = 1;
		this.game.maxSpeed = 8;
		this.game.acceleration = 1.0005;
		//
		this.windSeed = 0;
		this.updateWindInterval = 4 * 60;

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		/* ======================================================== */
		/* ===========	Attach Elements to the Stage 	=========== */
		/* ======================================================== */

		// Sky -------------------------------------------------------
		this.game.stage.backgroundColor="#222233";
		this.game.add.image( 0, 0, 'sky');
		
		// Mooon -----------------------------------------------------
		this.moon = new Moon(this.game);

		
		// Mountains -------------------------------------------------
		this.mountains = new Mountains(this.game);

		// Clouds -----------------------------------------------------
		this.clouds = this.game.add.group();

		
		// Houses ----------------------------------------------------
		this.houses = new Houses(this.game);

		
		// Chimneys --------------------------------------------------
		this.chimneys = this.game.add.group();
		this.game.physics.enable(this.chimneys, Phaser.Physics.ARCADE);
		this.chimneys.enableBody = true;

		
		// Roofs -----------------------------------------------------
		this.roofs = new Roofs(this.game);
		
		
		// Santa -----------------------------------------------------
		this.santa = new Santa(this.game);
		this.santa.sprite.name = 'santa';
		this.santa.spawn();


		

		// Crows -----------------------------------------------------
		this.crows = this.game.add.group();
		this.game.physics.enable(this.crows, Phaser.Physics.ARCADE);
		this.crows.enableBody = true;


		// Boxes -----------------------------------------------------
		this.boxes = this.game.add.group();
		this.game.physics.enable(this.boxes, Phaser.Physics.ARCADE);
		this.boxes.enableBody = true;

		
		// Snow -----------------------------------------------------
		this.snow_emitter = this.game.add.emitter(this.game.world.centerX, 0, 1000);
		this.snow_emitter.makeParticles('snowflake', [0, 1, 2, 3, 4, 5]);
		this.snow_emitter.maxParticleScale = 0.8;
		this.snow_emitter.minParticleScale = 0.2;
		this.snow_emitter.setYSpeed(100, 400);
		this.snow_emitter.gravity = 0;
		this.snow_emitter.width = this.game.world.width;
		this.snow_emitter.minRotation = 10;
		this.snow_emitter.maxRotation = 50;		
		this.snow_emitter.start(false, 5000, 10, 0);




		// Score Text
		this.scoreLabel = this.game.add.bitmapText(this.game.world.width -20, 16, 'myfont', '-30', 16);
		this.scoreLabel.anchor.x = 1;


		// Sounds
		this.tune = this.game.add.audio('tune', 0.5, true);
		this.tune.allowMultiple = false;
		this.collectSound = this.game.add.audio('collect');
		this.collectSound.allowMultiple = false;
		this.deathSound = this.game.add.audio('death');
		this.deathSound.allowMultiple = false;
		
		this.tune.play();


		// Call
		this.addControls();

	}

	update(){
		
		// Update Game speed
		if (this.game.speed < this.game.maxSpeed){
			this.game.speed = this.game.speed * this.game.acceleration;
		}	

		// Update Score
		this.game.score += 0.1;
		this.scoreLabel.text =  Math.floor(this.game.score);
		
		/* ========================================================= */
		/* =============	Update Sprites Positions	============ */
		/* ========================================================= */

		if(this.santa.isRising){
			this.santa.increaseVerticalVelocity();
			this.santa.sprinkleMagic();
		}
		
		this.moon.move();
		this.mountains.move();
		this.houses.move();
		this.roofs.move();
		
		// this.chimneys.callAll('chimney.move', this); // <- does not work
		this.chimneys.forEach((chimney)=>{
			// chimney.move();
			chimney.x -= 1.2 * this.game.speed;
		}, this);

		this.clouds.forEach((cloud)=>{
			cloud.x -= 0.05 * this.game.speed;
		}, this);

		
		/* ======================================================== */
		/* ================	  Spawn new Sprites	  ================= */
		/* ======================================================== */
		if(Math.random()<.001){
			this.addCloud(this.game, this.clouds);
		}

		if(Math.random()<.005){
			this.addCrow(this.game, this.crows);
		}

		if(Math.random()<.005){
			this.addChimney(this.game, this.chimneys);
		}
		


		/* ======================================================== */
		/* ===============	 Check for Collisions	 ============== */
		/* ======================================================== */
	
		// Santa crushes into crows
		this.game.physics.arcade.overlap(this.santa.sprite, this.crows, this.gameOver, null, this);

		// Box goes in the chimney
		this.game.physics.arcade.overlap(this.boxes, this.chimneys, this.boxIn, null, this);


	

		if (this.windSeed === this.updateWindInterval)
		{
			this.changeWindDirection();
			this.updateWindInterval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
			this.windSeed = 0;
		}
	


	}

	addControls(){
		
		if( Phaser.Device.touch ){
			this.game.input.onDown.add(this.onTapDown, this);
			this.game.input.onUp.add(this.onTapUp, this);
			// this.game.input.onUp.add(this.santa.setFalling, this.santa);
		}else{
			this.game.input.onDown.add(this.santa.setRising, this.santa);
			this.game.input.onUp.add(this.santa.setFalling, this.santa);

			this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.spacebar.onDown.add(this.newBox, this);
		}
		


		// this.game.input.onDown.add(this.santa.sprinkleMagic, this.santa);
		
		
		
		
		
 
	}
	

	onTapDown(pointer, doubleTap){
		
		if(pointer.positionDown.x < this.world.width/2)
		{
			this.newBox();
		}else{
			this.santa.setRising();
		}
	}
	onTapUp(pointer, doubleTap){
		
		if(pointer.positionDown.x < this.world.width/2)
		{
			// DO NOTHING
		}else{
			this.santa.setFalling();
		}
	}
	
	changeWindDirection() {

		let multi = Math.floor((this.maxWind + 200) / 4);
		let	frag = (Math.floor(Math.random() * 100) - multi);
		this.maxWind = this.maxWind + frag;
	
		if (this.maxWind > 200) this.maxWind = 150;
		if (this.maxWind < -200) this.maxWind = -150;

		this.setXSpeed(this.snow_emitter, this.maxWind);
	
	}

	setXSpeed(emitter, max) {

		emitter.setXSpeed(max - 20, max);
		emitter.forEachAlive(this.setParticleXSpeed, this, max);
	
	}
	
	setParticleXSpeed(particle, max) {
	
		particle.body.velocity.x = max - Math.floor(Math.random() * 30);
	
	}
	
	addCloud(game, clouds){
		new Cloud(game, clouds);
	}

	addCrow(game, crows){
		new Crow(game, crows);
	}

	addChimney(game, chimneys){
		new Chimney(game, chimneys);
	}

	newBox(){
		new Box(this.game, this.boxes, this.santa.sprite.x-30, this.santa.sprite.y-20);
	}

	boxIn(box, chimney){
		box.kill();
		this.collectSound.play();
		this.game.score += 100;
    	let anim = chimney.animations.add('puff');
        anim.play(12, false);
		//this.game.state.restart();
	}

	gameOver(){
		// console.log('morto');
		this.tune.stop();
		this.deathSound.play();
		this.game.state.start('GameOver');
	}

	render() {

		//this.game.debug.bodyInfo(this.santa.sprite, 16, 24);
	
		// this.game.debug.body(this.santa.sprite);

		// this.crows.forEach((crow)=>{
		// 	this.game.debug.body(crow);
		// }, this);

		// this.chimneys.forEach((chimney)=>{
		// 	this.game.debug.body(chimney);
		// }, this);
	
	}

}

export default GameState;