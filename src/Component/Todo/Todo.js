import './Todo.css';
import {CircularProgress, Fab} from "@mui/material";
import axios from "axios";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

const TODO_STATES = {
    deleting: 'deleting', updating: 'updating', editing: 'editing', 'initial': 'initial'
};

export default function Todo(props) {

    const [todoState, setTodoState] = useState({});
    const formRef = useRef();

    const [todo, setTodo] = useState(props.todo);

    const deleteTodo = (id) => {
        setTodoState({state: TODO_STATES.deleting});
        axios.delete('http://localhost:8080/todos/' + id).then((response) => {
            props.fetchTodoHandler();
        }).catch((error) => {
            console.log(error.message);
            setTodoState({state: TODO_STATES.initial});
        });
    };

    const gotoEditState = () => {
        setTodoState({state: TODO_STATES.editing});
    };

    const getTodo = (id) => {
        axios.get('http://localhost:8080/todos/' + id).then((response) => {
            setTodo(response.data);
        }).catch((error) => {
            console.log(error.message)
        });
    }

    const updateTodo = (id) => {
        const data = formRef.current;
        console.log('updating todo with id ', id);
        const todo = {
            title: data.title.value,
            description: data.description.value,
            done: data.done.checked
        };
        axios.put('http://localhost:8080/todos/' + id, todo).then((response) => {
            getTodo(id);
            setTodoState({state: TODO_STATES.initial});
        });
    };

    useLayoutEffect(() => {
        if (todoState.state === TODO_STATES.editing) {
            formRef.current.title.value = todo.title;
            formRef.current.description.value = todo.description;
            formRef.current.done.checked = todo.done;
        }

    }, [todoState.state]);


    const isEditState = todoState.state === TODO_STATES.editing;

    return (<div onClick={props.onClick}>
        <form ref={formRef} className={props.selected ? 'Todo Selected' : 'Todo'}>
            {isEditState ? <input name={'title'}/> : <text>Title: {todo.title}</text>}
            {isEditState ? <input name={'description'}/> :
                <text>Description: {todo.description}</text>}
            {isEditState ? <input name={'done'} type='checkbox'/> :
                <text>Done: {todo.done + ""}</text>}

            <div className={'FabDiv'}><Fab className={'Fab'} onClick={() => {
                if (todoState.state !== TODO_STATES.deleting) {
                    deleteTodo(todo.id);
                }
            }}>
                {todoState.state === TODO_STATES.deleting ? <CircularProgress/> : '-'}
            </Fab>
                <Fab onClick={
                    () => {
                        if (todoState.state === TODO_STATES.editing) {
                            updateTodo(todo.id);
                        } else {
                            gotoEditState();
                        }
                    }
                }>
                    {
                        todoState.state === TODO_STATES.editing? 'done' : 'edit'
                    }
                </Fab>
            </div>
        </form>
    </div>);
}