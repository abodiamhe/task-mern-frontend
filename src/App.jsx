import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; //to be able to show the toast message
import 'react-toastify/dist/ReactToastify.css'; //Toastify css

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alltasks" element={<TaskList />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
