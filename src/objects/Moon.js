class Moon {
   
    constructor(game){
        this.game = game;
        this.moonSprite = game.add.sprite( this.game.world.width - 150, 350, 'moon');
        this.speed = 0.05;
        this.movement = 0;
    }
    move(){
        this.moonSprite.x -= (this.speed/10)* (Math.sin(this.movement)*10);
        this.movement += 0.001;
        
        this.moonSprite.y -= this.speed;
    }
}
 
export default Moon;