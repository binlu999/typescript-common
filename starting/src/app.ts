type outputformat='number'|'string';

function add (
    in1:number|string,
    in2:number|string,
    output:outputformat
    )
    {
    if( typeof in1 ==='number' && typeof in2 === 'number' || output==='number')
        return +in1 + +in2;
    else
        return in1.toString()+in2.toString();
}

console.log(add(23,34,'number'));
console.log(add('23',34,'number'));
console.log(add('Bin ','Lu','string'));

let combine:(in1:number,in2:number,format:outputformat)=>number|string;
combine=add;

console.log(combine(3,4,'number'));

function addandhandle(in1:number,in2:number,callback:(result:number)=>void){
    let result=in1+in2;
    callback(result);
}

addandhandle(2,3,(resutl:number)=>{
console.log("Returned")
console.log(resutl)
});

function generateError(err:string,code:number):never{
    throw {error: err, code:code};
}

//generateError("Caught error",100);