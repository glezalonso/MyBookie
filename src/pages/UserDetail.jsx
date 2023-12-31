import React, { useEffect, useState } from 'react'
import { getUser } from '../services/users'
import { toast, Toaster } from 'react-hot-toast'
import { Spinner } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUser(userId)
      .then(data => setUser(data.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <h2 className="h2">{user?.fullName}</h2>

        </>
  )
}

export default UserDetail
