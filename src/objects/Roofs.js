class Roofs {
   
    constructor(game){
        this.game = game;
        this.sprite = game.add.sprite( 0, this.game.world.height-160, 'roofs');
        this.speed = 1.2;
    }
    move(){
        this.sprite.x -= this.speed * this.game.speed;
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.enableBody = true;

        
        if (this.sprite.x <= -(this.sprite.width-this.game.world.width)) {
            this.sprite.x = 0;
        }
    }
}
 
export default Roofs;
