import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // let auth = localStorage.getItem('token')
    let auth = true
    return(
        auth ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes