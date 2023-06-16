import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/auth'
import toast from 'react-hot-toast'

const Navigate = () => {
  const logOut = useAuthStore(state => state.logOut)
  const isAdmin = useAuthStore(state => state.isAdmin)
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut()
    toast.success('Log out successfuly')
    navigate('/')
  }

  return (
        <>
          <div className="navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid">
            <span className="navbar-brand">My Bookie</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
               <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to={'../home'}>Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'../players'}>Players</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'../teams'}>Teams</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'../sports'}>Sport</Link>
                    </li>
                    {(isAdmin)
                      ? <li className="nav-item">
                      <Link className="nav-link" to={'../users'}>Users</Link>
                    </li>
                      : null}

                    <li className="nav-item"><button className="btn btn-warning" onClick={() => handleLogOut()}>Log out</button></li>
                    </ul>
               </div>
            </div>
          </div>
        </>
  )
}

export default Navigate
