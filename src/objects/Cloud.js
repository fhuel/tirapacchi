class Cloud {
   
    constructor(game, group){
        this.game = game;
        this.group = group;
        this.cloudSprite = game.add.sprite( this.game.world.width, Math.random()*this.game.world.height, 'cloud'+Math.ceil(Math.random()*3));
        console.log('cloud'+Math.ceil(Math.random()*3));
        this.group.add(this.cloudSprite);
        this.speed = 0.05;
        this.movement = 0;
    }
    // move(){
    //     this.cloudSprite.x -= (this.speed/10)* (Math.sin(this.movement)*10);
    //     this.movement += 0.001;
        
    //     this.cloudSprite.y -= this.speed;
    // }
}
 
export default Cloud;