function add2 (n1:number, n2:number){
    return n1+n2;
}

enum Role {ADMIN,READONLY,AUTHOR};

const person : {
    name:string;
    age:number;
    hobby:string[];
    role:Role;
} = {
    name:"bin",
    age:12,
    hobby:['house','yard'],
    role:Role.ADMIN
}

console.log(person.hobby.length);
for (const h of person.hobby){
    console.log( h.toUpperCase() )
}


if (person.role === Role.ADMIN){
    console.log('Admin');
    console.log(Role.ADMIN);
}
console.log(person.name)