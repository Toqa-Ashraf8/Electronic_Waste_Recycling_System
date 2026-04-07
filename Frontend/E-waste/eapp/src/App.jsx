import './App.css'
import Header from './layouts/Header'
import { Navigate, Route,Routes } from 'react-router-dom'
import Register from './features/auth/Register'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGlobalError } from './redux/global/uiSlice';
import { toast, ToastContainer } from 'react-toastify';
import Home from './features/home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './features/auth/Login';
function App() {
 const {globalError,globalMessage}=useSelector((state)=>state.ui);
 const {token}=useSelector((state)=>state.auth);
 const dispatch=useDispatch();

useEffect(() => {
    if (globalError) {
      toast.error(globalMessage || "Server error occurred",);
      dispatch(clearGlobalError());
    }
  }, [globalError, globalMessage, dispatch]);

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
      {token && <Header />}
    <Routes>
       <Route path="/" element={<Navigate to="/login" replace />} />  
       <Route path='/register'element={<Register/>}/>
       <Route path='/login'element={<Login/>}/>
      <Route path='/home' 
      element={
        <ProtectedRoute>
           <Home/>
        </ProtectedRoute>
      }/>
    </Routes>
    </div>
  )
}

export default App
