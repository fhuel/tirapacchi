class Crow {
   
    constructor(game, group){
        this.game = game;
        this.group = group;
        this.crowSpeed = 130;

        this.crowSprite = this.game.add.sprite(48, 40, 'crow');
        this.group.add(this.crowSprite);
        
        this.crowSprite.reset(this.game.world.width, Math.random()*this.game.world.height);
        
        this.crowSprite.body.velocity.x = -this.crowSpeed * this.game.speed;
        this.crowSprite.body.velocity.y =  ((Math.random()*50)-25) * this.game.speed;
        // this.crowSprite.body.immovable = true;

        this.anim = this.crowSprite.animations.add('fly');
        this.anim.play(12, true);
        
        this.crowSprite.checkWorldBounds = true;
        this.crowSprite.outOfBoundsKill = true;

        this.group.add(this.crowSprite);
    }

    spawn(){

    }
}
 
export default Crow;