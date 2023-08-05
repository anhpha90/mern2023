import React from 'react'
import {Route, Redirect, Navigate, RouterProvider} from 'react-router-dom'
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Dasboard from '../../views/Dasboard'
import About from '../../views/About'
import NavbarMenu from '../layout/NavbarMenu'


const ProtectedRoute = ({children}) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

    if (authLoading)
    return (
        <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
        </div>
    )

    return isAuthenticated ?  (<><NavbarMenu/>{children}</>) : <Navigate to="/login" />;
}
export default ProtectedRoute

