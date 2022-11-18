import logo from './logo.svg';
import './App.css';
import TodoList from "./Container/TodoList/TodoList";
import Todo from "./Component/Todo/Todo";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import AboutMe, {Test1} from "./Component/About/AboutMe";
import AddTodo from "./Component/AddTodo/AddTodo";
import NotFound from "./Component/NotFound/NotFound";

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
                    <Route path='' element={<TodoList/>}/>
                    <Route path={'about'} element={<AboutMe/>}>
                        <Route path={'test'} element={<Test1/>}/>
                    </Route>
                    <Route path={'/todos/add'} element={<AddTodo/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
