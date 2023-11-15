export class soundEffect{
    constructor(){}
    
    attackEffect(){
       const sound = new Howl({
        src: ['/assets/music/action-sounds/attack.wav'],
        volume: 1,
        loop: false,
       })

       sound.play();
    }    
    shieldEffect(){
       const sound = new Howl({
        src: ['/assets/music/action-sounds/shield.wav'],
        volume: 1,
        loop: false,
       })

       sound.play();
    }    
    buffEffect(){
       const sound = new Howl({
        src: ['/assets/music/action-sounds/buff.wav'],
        volume: 1,
        loop: false,
       })

       sound.play();
    }    
    debuffEffect(){
       const sound = new Howl({
        src: ['/assets/music/action-sounds/debuff.wav'],
        volume: 1,
        loop: false,
       })

       sound.play();
    }    
    healEffect(){
       const sound = new Howl({
        src: ['/assets/music/action-sounds/heal.wav'],
        volume: 1,
        loop: false,
       })

       sound.play();
    }    
}