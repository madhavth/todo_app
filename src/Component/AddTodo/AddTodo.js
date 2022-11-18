import './AddTodo.css';
import {useRef} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function AddTodo() {
    const formRef = useRef();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const todo = {
            title: formRef.current.title.value,
            description: formRef.current.description.value,
            done: formRef.current.done.checked
        };

        if (!todo.title) {
            alert('title cant be empty !!!');
            return;
        }

        if (!todo.description) {
            alert('description cant be empty !!!');
            return;
        }

        axios.post('http://localhost:8080/todos', todo)
            .then((response) => {
                navigate('/');
            })
            .catch((e) => {
                console.log(e.message);
            });

    };

    return (<div>
        <form ref={formRef} className={'addTodo'}>
            <label>Title</label>
            <input name={'title'}/>
            <label>Description</label>
            <input name={'description'}/>
            <label>Done</label>
            <input name={'done'} type={'checkbox'}/>
        </form>
        <button onClick={onSubmit}>Submit</button>
    </div>);
}