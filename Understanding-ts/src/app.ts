console.log("welcome!");
const person = {
    namme:"John",
    age:23
}

const p2=person;

p2['age']=67;

console.log(person);

console.log(p2);

const p3={...person};
p3['age']=13;
console.log(person);

console.log(p2);
console.log(p3);

function add (...numbers:number[]){
    return numbers.reduce((currtBalue,currentNumber)=>{
        return currtBalue + currentNumber;
    },0);
}

console.log(add(1,2,3,4,5));
const user={
    username:'Max',
    age:23
};

const {username,age}=user;

console.log(username,age,user);