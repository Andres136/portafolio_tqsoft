import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute(){
  const isAuth = !!localStorage.getItem('access')
  return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
}