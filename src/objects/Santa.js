class Santa {
   
    constructor(game){
        this.game = game;
        this.isRising = false;
        this.sprite = game.add.sprite( 100, 160, 'santa');
    }

    spawn(){
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.enableBody = true; 
        this.sprite.body.gravity.y = 1000;
        this.sprite.body.velocity.y = -10;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(100, 40, 0, 10);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.anim = this.sprite.animations.add('ride');
        this.anim.play(25, true);
        
        // Attach magic emitter
		this.magic_emitter = this.game.add.emitter(0, 0, 1000);
        this.magic_emitter.makeParticles('magicParticle');
		this.magic_emitter.maxParticleScale = 0.4;
		this.magic_emitter.minParticleScale = 0.1;
        this.magic_emitter.setXSpeed(-600, 1);
        this.magic_emitter.gravity = 200;
        // this.magic_emitter.blendMode = Phaser.blendModes.ADD;
        this.magic_emitter.setAlpha(0.2, 0.4);
		this.magic_emitter.width = 100;
		this.magic_emitter.minRotation = 10;
		this.magic_emitter.maxRotation = 50;		
        
    }

    setRising(){
        this.isRising = true;
    }
 
    setFalling(){
        this.isRising = false;
    }

    increaseVerticalVelocity(){
        this.sprite.body.velocity.y -= 50;
    }

    sprinkleMagic(){
        this.magic_emitter.emitX = this.sprite.x ;
        this.magic_emitter.emitY = this.sprite.y + 25;;
        this.magic_emitter.start(true, 1000, null, 5);
    }

    isOutOfBounds(){
 
        let position = this.sprite.body.position.y;
 
        return position > this.game.world.height || position < 0;
 
    }

    
}
export default Santa;