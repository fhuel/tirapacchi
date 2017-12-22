class Titles extends Phaser.State {
	preload(){
		/** Preload Require Asstes */
		this.game.load.image('titles', 'assets/titles.png');
		
	}
	create() {
		// this.game.state.start("Main");

		//Enable Arcade Physics

		this.game.add.image( 0, 0, 'titles');

		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		this.game.input.onDown.add(()=>{
			

			// if (this.game.scale.isFullScreen)
			// {
			// 	this.game.scale.stopFullScreen();
			// }
			// else
			// {
			// 	this.game.scale.startFullScreen(false);
			// }
			
			
			this.state.start('GameState')
		});
	}

}

export default Titles;
