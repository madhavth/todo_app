import Todo from "../../Component/Todo/Todo";
import './TodoList.css';
import {useEffect, useState} from "react";
import axios from "axios";

export default function TodoList(props) {
    const [todos, setTodos] = useState([]);

    const fetchTodos = () => {
        axios.get('http://localhost:8080/todos')
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        fetchTodos();
    }, []);


    return todos.map((todo) => {
        return <Todo todo={todo}/>
    });

}