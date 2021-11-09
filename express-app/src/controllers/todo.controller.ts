import { RequestHandler } from "express";
import Todo from "../moduls/todo";
const TODOS:Todo[]=[];

export const createTodo:RequestHandler=(req,res,next)=>{
    const text=(req.body as {text:string}).text;
    const newTodo=new Todo(Math.random().toString(),text);
    TODOS.push(newTodo);
    res.status(201).json({
        status:'Success',
        todo:newTodo
    })
};

export const getTodos:RequestHandler=(req, res, next)=>{
    res.status(202).json({
        todos:TODOS
    }
    );
};

export const updateTodo:RequestHandler<{id: string}>=(req,res,next)=>{
    const todoId=req.params.id;
    const updatedText=(req.body as {text:string}).text;
    const index=TODOS.findIndex(todo=> todo.id===todoId);

    if(index<0){
        throw new Error('Could not find Todo!');
    }

    TODOS[index]=new Todo(todoId,updatedText);
    res.status(202).json({
        status:'Success',
        updatedTodo:TODOS[index]
    });
};

export const deleteTodo:RequestHandler<{id:string}>=(req,res,next)=>{
    const id=req.params.id;
    const index=TODOS.findIndex(todo=>todo.id===id);
    console.log("Deleting");
    if(index<0){
        throw new Error("Could not find");
    }
    TODOS.splice(index,1);
    res.status(204).json({
        status:"success",
        message:"Deletetd"
    })
};