import {Routes, Route, BrowserRouter, useNavigate, useRouteMatch} from 'react-router-dom';
import {Link} from "@mui/material";

export default function AboutMe(props) {
    const navigate = useNavigate();

    return (<div>
        <h1>Madhav Thapa</h1>
        <Link to={'test'}>go to test 1</Link>
        
    </div>);
}

export function Test1() {
    return (<div>
        Test 1
    </div>);
}

export function Test2() {
    return (<div>
        Test 2
    </div>);
}

export function Test3() {
    return (<div>
        Test 3
    </div>);
}