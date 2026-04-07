import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
   const { token, role } = useSelector((state) => state.auth); 
     if (!token) {
     return <Navigate to="/register" replace />
    }
   /*   if (allowedRoles && !allowedRoles.includes(role)) { 
        return <Navigate to="/home" replace />;
    }  */
    return children;
};

export default ProtectedRoute;