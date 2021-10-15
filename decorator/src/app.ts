function Logger(ele:Function) {
    console.log(ele);
}

@Logger
class Person {
    name:string;
    constructor(){
        this.name="ne clas";
        console.log("Construcing a persiom");
    }
}

new Person();