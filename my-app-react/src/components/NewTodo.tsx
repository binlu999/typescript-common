import React,{useRef} from "react";
import './NewTodo.css';

type NewTodoProps = {
    onAddTodo:(text:string)=>void;
}
const NewTodo:React.FC<NewTodoProps> = (props) => {
    const textInputRef=useRef<HTMLInputElement>(null);
    const todoSunbmitHandler = (event:React.FormEvent)=>{
        event.preventDefault();
        const enteredText=textInputRef.current!.value;
        console.log(`Entered: ${enteredText}`);
        props.onAddTodo(enteredText);
    }
return <form onSubmit={todoSunbmitHandler}>
    <p>Enter new todo</p>
    <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
    </div>
    <button type="submit">ADD TODO</button>
</form>
};

export default NewTodo;