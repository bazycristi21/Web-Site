let life = document.getElementById("lifes");


class Lifes{
    constructor(game)
    {
        this.image = life;
        this.game = game;
    }
    draw(ctx)
    {
        if(this.game.nr_players == 1)
        {
            let cnt=0;
            for(cnt;cnt<this.game.paddle1.lives;cnt++)
                ctx.drawImage(this.image, 10+30*cnt, 10, 20, 20);
        }
        else{
            let cnt=0;
            for(cnt;cnt<this.game.paddle1.lives;cnt++)
                ctx.drawImage(this.image, 10+30*cnt, 10, 20, 20);
            cnt=0;
            for(cnt;cnt<this.game.paddle2.lives;cnt++)
                ctx.drawImage(this.image, 770 - 30*cnt, 10, 20, 20);
        }
       
    }
    update(deltaTime)
    {
        return 0;
    }
}
export { Lifes };