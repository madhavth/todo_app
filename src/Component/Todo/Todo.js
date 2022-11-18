import './Todo.css';
import {CircularProgress, Fab} from "@mui/material";
import axios from "axios";
import {useState} from "react";

export default function Todo(props) {

    const [deleteInProgress, setDeleteInProgress] = useState(false);

    const deleteTodo = (id) => {
        setDeleteInProgress(true);
        axios.delete('http://localhost:8080/todos/' + id).then((response) => {
            props.fetchTodoHandler();
        }).catch((error) => {
            console.log(error.message);
            setDeleteInProgress(false);
        });
    };

    return (
        <div className={props.selected ? 'Todo Selected' : 'Todo'} onClick={props.onClick}>
            <text>Title: {props.todo.title}</text>
            <text>Description: {props.todo.description}</text>
            <text>Done: {props.todo.done + ""}</text>

            <div className={'FabDiv'}><Fab className={'Fab'} onClick={() => {
                if(!deleteInProgress) {
                    deleteTodo(props.todo.id);
                }
            }}>
                { deleteInProgress? <CircularProgress/> : '-'}
            </Fab>
            </div>
        </div>
    );
}