import React from 'react'
import { useAuth } from '../Context/authContext'
import { Navigate } from 'react-router-dom' 

const CheckPermissionPage = ({children}) => {
  const { currentUser } = useAuth()
  if(currentUser){
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default CheckPermissionPage
  