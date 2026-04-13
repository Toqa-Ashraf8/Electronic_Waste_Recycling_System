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
import UserProfile from './features/userProfile/userProfile';
import SellDevice from './features/selldevice/SellDevice';
import Categories from './features/categories/Categories';
import TrackingPage from './features/selldevice/TrackingPage';
import Orders from './features/orders/Orders';
import FindUs from './features/branches/FindUs';
import ContactUs from './features/contact/ContactUs';
import OrdersGallery from './features/orders/OrdersGallery';
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
                <Route path='/userprofile' 
                element={
                  <ProtectedRoute>
                    <UserProfile/>
                  </ProtectedRoute>
                }/>  
                <Route path='/sell-your-device' 
                element={
                  <ProtectedRoute>
                    <SellDevice/>
                  </ProtectedRoute>
                }/>
                <Route path='/add-categories' 
                element={
                  <ProtectedRoute>
                    <Categories/>
                  </ProtectedRoute>
                }/>
                  <Route path='/tracking-requests' 
                element={
                  <ProtectedRoute>
                    <TrackingPage/>
                  </ProtectedRoute>
                }/> 
                <Route path='/orders' 
                element={
                  <ProtectedRoute>
                    <Orders/>
                  </ProtectedRoute>
                }/>
                <Route path='/findus' 
                element={
                  <ProtectedRoute>
                    <FindUs/>
                  </ProtectedRoute>
                }/>
                 <Route path='/contactus' 
                element={
                  <ProtectedRoute>
                    <ContactUs/>
                  </ProtectedRoute>
                }/>
                  <Route path='/gallery' 
                element={
                  <ProtectedRoute>
                    <OrdersGallery/>
                  </ProtectedRoute>
                }/>
    </Routes>
    </div>
  )
}

export default App
