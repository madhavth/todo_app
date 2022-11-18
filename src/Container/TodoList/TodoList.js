import Todo from "../../Component/Todo/Todo";
import './TodoList.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";

export default function TodoList(props) {
    const [todosState, setTodosState] = useState({
        'state': 'fetching',
        'data': [],
        message: ''
    });

    const fetchTodos = () => {
        axios.get('http://localhost:8080/todos')
            .then((response) => {
                setTodosState({
                    'state': 'done',
                    'data': response.data
                });
            })
            .catch((error) => {
                console.log(error.message);
                setTodosState({
                    'state': 'error',
                    'message': `${error.message}`
                })
            });
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    if (todosState.state === 'fetching') {
        return <CircularProgress/>;
    }
    
    if(todosState.state === 'error') {
        return <div>
            <div><text>{todosState.message}</text></div>
            <button>retry</button>
        </div>;

    }

    if (todosState.data.length === 0) {
        return <NoTodosAddedYet/>
    }

    const todosList = todosState.data.map((todo) => {
        return <Todo todo={todo}/>
    });
    
    return (<div className={'todoList'}>
        {todosList}
    </div>);

}

function NoTodosAddedYet() {
    return (<div className={'noTodo'}>
        No todos added yet!!!
    </div>);
}