import React from "react";
import {Todo} from '../Todo.modules';
import './TodoList.css'

interface TodoProp{
    items:Todo[];
    onDeleteTodo:(id:string)=>void;
}
const TodoList:React.FC<TodoProp> = (prop)=>{
    return <ul>
        {prop.items.map(item => 
        <li key={item.id}>
            <span>{item.text}</span>
            <span><button onClick={prop.onDeleteTodo.bind(null,item.id)}>Delete</button></span>    
        </li>
        )}
    </ul>
};

export default TodoList;