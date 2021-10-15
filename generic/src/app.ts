function mergeObj<T,U>(obj1:T,obj2:U){
    return Object.assign(obj1,obj2);
}

const newObj=mergeObj({name:"Bin",role:"Admin"},{age:32});
console.log(newObj.name);

interface lengthy{
    length:number
}
function countAndDesc<T extends lengthy>(element:T): [T, string]
{
    let desc="No elemnet found!";
    if(element.length){
        desc="Found "+element.length+ " elements!"
    }
    return [element, desc];
}

console.log(countAndDesc(['12','3']));