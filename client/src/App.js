
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/register/Register';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home></Home>}/>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>}/>
      </Routes>
    </BrowserRouter>

   
  );
}

export default App;
