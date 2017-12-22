class GameOver extends Phaser.State {
	preload(){
		/** Preload Require Asstes */
		this.game.load.image('titles', 'assets/gameover.png');
		
	}
	create() {
		// this.game.state.start("Main");

		//Enable Arcade Physics

		this.game.add.image( 0, 0, 'titles');

		// Score Text
		this.scoreLabel = this.game.add.bitmapText(this.game.world.width/2, this.game.world.height/2+40, 'myfont', '-30', 40);
		this.scoreLabel.anchor.x = 0.5;
		this.scoreLabel.text =  Math.floor(this.game.score);

		this.game.input.onDown.add(()=>{this.state.start('GameState')});
	}

}

export default GameOver;
