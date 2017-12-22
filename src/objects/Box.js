class Box {
   
    constructor(game, group, x, y){
        this.game = game;
        this.group = group;
        this.boxSpeed = -200;


        this.box = this.game.add.sprite(x, y, 'box');
        this.game.physics.enable( this.box, Phaser.Physics.ARCADE);
        this.group.add(this.box);
        
        // this.box.reset(150, 150,);
        
        this.box.body.velocity.y = this.boxSpeed;
        this.box.body.gravity.y = 800;
        this.box.body.allowGravity = true;

        this.anim = this.box.animations.add('roll');
        this.anim.play(12, true);
        
        this.box.checkWorldBounds = true;
        this.box.outOfBoundsKill = true;

        this.group.add(this.box);
    }

}
 
export default Box;