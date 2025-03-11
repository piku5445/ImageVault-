import React, { useState } from 'react'
import { createContext } from 'react'
export const AppContext = createContext()
const Appcontext = (props) => {
    const BackendUrl=import.meta.env.VITE_APP_BACKEND_URL
    const{isLoggedin,setIsLoggedin}=useState(false)
    const{userData,setuserData}=useState(false)
    const value={
BackendUrl,
isLoggedin,setIsLoggedin,
userData,setuserData
    }
  return (
    <div>
        <AppContext.Provider value={{}}>
            {props.children}
            </AppContext.Provider>
    </div>
  )
}

export default Appcontext