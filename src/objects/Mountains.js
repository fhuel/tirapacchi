class Mountains {
   
    constructor(game){
        this.game = game;
        this.sprite = game.add.sprite( 0, this.game.world.height-340, 'mountains');
        this.speed = 0.05;
    }
    move(){
        this.sprite.x -= this.speed * this.game.speed;

        if (this.sprite.x <= -(this.sprite.width-this.game.world.width)) {
            this.sprite.x = 0;
        }
    }
}
 
export default Mountains;