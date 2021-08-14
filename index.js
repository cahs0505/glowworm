let app;

window.onload = () =>{

    //Create a Pixi Application
    app = new PIXI.Application(document.body.clientWidth, document.body.clientWidth);

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    // let gw = new Glowworm()

    PIXI.loader
        .add("glowworm.png")
        .add("forest.jpg")
        .load(setup);

    
    
}

function setup(){
    let bg = new PIXI.Sprite(PIXI.loader.resources["forest.jpg"].texture)
    app.stage.addChild(bg)


    let glowworms = []
    let num = 500

    for (let i=0; i<num;i++){
        let gw = new Glowworm()
        glowworms.push(gw)
        app.stage.addChild(gw.graphics)
    }

    app.ticker.add(delta=>{
        for(let i=0; i<num; i++){
            glowworms[i].update(delta)
        }
    })
    
}


function Glowworm(){

    let self = this;

    self.x = Math.random()*app.renderer.width;
    self.y = Math.random()*app.renderer.height;
    self.angle = Math.random()*Math.PI;
    self.speed = 0.8;
    self.turn = (Math.random()-0.5)*0.1;
    self.brightness = Math.random();

    //init
    self.graphics = new PIXI.Sprite(PIXI.loader.resources["glowworm.png"].texture);
    let g = self.graphics;
    g.scale.set(0.01);
    
    
    
    self.update = (delta) =>{
        self.x = self.x + delta * self.speed * Math.cos(self.angle)
        self.y = self.y + delta * self.speed * Math.sin(self.angle)

        self.angle += self.turn;

        if(Math.random()<0.05){
            self.turn = (Math.random()-0.5)*0.1;
        }
        
        
        g.x = self.x;
        g.y = self.y;
        g.alpha = self.brightness;
        
    }

    
    self.update(0)


}


