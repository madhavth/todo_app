import Todo from "../../Component/Todo/Todo";
import './TodoList.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function TodoList(props) {
    const [todosState, setTodosState] = useState({
        'state': 'fetching', 'data': [],
    });

    const [selectedTodo, setSelectedTodo] = useState(null);

    const fetchTodos = () => {
        axios.get('http://localhost:8080/todos')
            .then((response) => {
                setTodosState({
                    'state': 'done', 'data': response.data
                });
            })
            .catch((error) => {
                console.log(error.message);
                setTodosState({
                    'state': 'error', 'message': `${error.message}`, data: []
                });
            });
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    function onClickHandler(todo) {
        setSelectedTodo(todo);
    }

    if (todosState.state === 'fetching') {
        return <CircularProgress/>;
    }

    if (todosState.state === 'error') {
        return <div>
            <div>
                <text>{todosState.message}</text>
            </div>
            <button>retry</button>
        </div>;

    }

    if (todosState.data.length === 0) {
        return <NoTodosAddedYet/>
    }

    const todosList = todosState.data.map((todo) => {
        return <div key={todo.id}><Todo todo={todo} selected={selectedTodo && selectedTodo.id === todo.id}
                                        fetchTodoHandler={() => {
                                            fetchTodos();
                                        }}
                                        onClick={onClickHandler}/></div>;
    });

    return (<div className={'todoList'}>
        {todosList}
    </div>);

}

function NoTodosAddedYet() {
    const navigate = useNavigate();

    return (<div className={'noTodo'}>
        No todos added yet!!!
        <div onClick={
            () => {
                navigate('todos/add');
            }
        } className={'AddTodoHere'}>
            click here to add
        </div>
    </div>);
}