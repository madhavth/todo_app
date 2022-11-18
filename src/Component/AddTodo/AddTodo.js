import './AddTodo.css';
import {useRef} from "react";

export default function AddTodo() {
    const formRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
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
        <button onSubmit={onSubmit}>Submit</button>
    </div>);
}