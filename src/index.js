import Titles from 'states/Titles';
import GameState from 'states/GameState';
import GameOver from 'states/GameOver';



class Game extends Phaser.Game {

	constructor() {
		super(960, 540, Phaser.AUTO, 'content', null);
		// super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content');
		this.state.add('Titles', Titles, false);
		this.state.add('GameState', GameState, false);
		this.state.add('GameOver', GameOver, false);
		this.state.start('Titles');
	}

}



new Game();
