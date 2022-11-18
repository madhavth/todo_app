import './Todo.css';

export default function Todo(props) {
    return (
        <div className='Todo'>
            <text>{props.todo.title}</text>
            <text>{props.todo.description}</text>
            <text>{props.todo.done}</text>
        </div>
    );
}