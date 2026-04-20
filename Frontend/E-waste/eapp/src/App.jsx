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
import SellDevice from './features/selldevice/SellDevice';
import Categories from './features/categories/Categories';
import TrackingPage from './features/selldevice/TrackingPage';
import Orders from './features/orders/Orders';
import FindUs from './features/branches/FindUs';
import ContactUs from './features/contact/ContactUs';
import CartItems from './features/cart/CartItems';
import TechStore from './features/techstore/TechStore';
import PaymentPage from './features/techstore/PaymentPage';
import UserProfile from './features/userProfile/UserProfile';
import PointsPage from './features/points/PointsPage';
import AdminDashboard from './features/dashboard/AdminDashboard';
import AddBranches from './features/branches/AddBranches';
import AddContacts from './features/contact/AddContacts';
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
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
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
                  <ProtectedRoute allowedRoles={['Admin']}>
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
                  <ProtectedRoute allowedRoles={['Admin']}>
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
                  <Route path='/cartItems' 
                 element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <CartItems/>
                  </ProtectedRoute>
                }/>
                  <Route path='/store' 
                 element={
                  <ProtectedRoute>
                    <TechStore/>
                  </ProtectedRoute>
                }/>
                  <Route path='/payment' 
                   element={
                  <ProtectedRoute>
                    <PaymentPage/>
                  </ProtectedRoute>
                }/>
               <Route path='/points' 
                   element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <PointsPage/>
                  </ProtectedRoute>
                }/> 
                <Route path='/dashboard' 
                   element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <AdminDashboard/>
                  </ProtectedRoute>
                }/>
                 <Route path='/addbranches' 
                   element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <AddBranches/>
                  </ProtectedRoute>
                }/>
                <Route path='/addcontacts' 
                   element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <AddContacts/>
                  </ProtectedRoute>
                }/>
    </Routes>
    </div>
  )
}

export default App
