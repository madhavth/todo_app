import logo from './logo.svg';
import './App.css';
import TodoList from "./Container/TodoList/TodoList";
import Todo from "./Component/Todo/Todo";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import AboutMe from "./Component/About/AboutMe";
import AddTodo from "./Component/AddTodo/AddTodo";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header className={'headers'}>
                    <Link to={'/'}>
                        <text>Todos</text>
                    </Link>
                    <Link to={'/about'}>
                        <text>About</text>
                    </Link>
                    
                    <Link to={'/todos/add'}>
                        <text>Add Todo</text>
                    </Link>
                    
                </header>

                <Routes>
                    <Route path='/' element={<TodoList/>}/>
                    <Route path={'/about'} element={<AboutMe/>}/>
                    <Route path={'/todos/add'} element={<AddTodo/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
