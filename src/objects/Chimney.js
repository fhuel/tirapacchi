class Chimney {
   
    constructor(game, group){
        this.game = game;
        this.group = group;
        // this.chimneySpeed = 120;
        this.chimneySpeed = 2;

        this.chimney = this.game.add.sprite(228, 240, 'chimney');
        this.group.add(this.chimney);
        
        this.chimney.reset(this.game.world.width, this.game.world.height-(Math.random()*80)-60);
        
        // this.chimney.body.velocity.x = -this.chimneySpeed;

        // this.anim = this.chimney.animations.add('puff');
        // this.anim.play(12, false);
        this.chimney.body.setSize(72, 30, 0, 20);
        this.chimney.checkWorldBounds = true;
        this.chimney.outOfBoundsKill = true;

        

        this.group.add(this.chimney);
    }

    move(){
        console.log("muovicazzo");
        this.chimney.x -= this.speed * this.game.speed;
    }

    puff(){
        this.anim.play(12, false);
    }
}
 
export default Chimney;