console.log("My Service | SOF")

const myService = {
    world:"world",
    hello:()=>{return "hello"},
    helloWorld:function(){return `${this.hello()} ${this.world}`}
};

console.log("My Service | EOF")