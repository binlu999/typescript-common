import _ from 'lodash';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator'

//import * from 'class-tran'

import {Product} from './product'

declare var global_cnt:any;
console.log("Application starting");
console.log(_.shuffle([3,4,5,3,8,0,6,11]));
console.log(global_cnt);

const product=new Product("boos",12.22);
console.log(product.printInfo());

const plist=[
    {
        title:"book-1",
        price:11.11
    },
    {
        title:"book-2",
        price:11.12
    },
    {
        title:"book-3",
        price:11.13
    }
];

const products=plist.map((p)=>{
    return new Product(p.title,p.price)
});

for(const p of products){
    console.log("loop "+p.printInfo());
}

products.map((p)=>{
    console.log("map "+p.printInfo());
    return p;
});

const ps= plainToClass(Product,plist);

for(const p of ps){
    console.log("TRANS "+p.printInfo());
}

const p1=new Product('ewwe',12);
validate(p1).then(errors=>{
    if(errors.length>0){
        console.log("VALIDATION ERROR");
        console.log(errors);
        console.log("VERR: "+p1.printInfo());
    }else{
        console.log("VALIDATION GOOD");
        console.log("VGOOD: "+p1.printInfo());
    }
});
console.log("VAL: "+p1.printInfo());
