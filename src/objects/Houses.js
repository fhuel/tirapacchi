class Houses {
   
    constructor(game){
        this.game = game;
        this.sprite = game.add.sprite( 0, this.game.world.height-300, 'houses');
        this.speed = 0.8;
    }
    move(){
        this.sprite.x -= this.speed * this.game.speed ;

        if (this.sprite.x <= -(this.sprite.width-this.game.world.width)) {
            this.sprite.x = 0;
        }
    }
}
 
export default Houses;