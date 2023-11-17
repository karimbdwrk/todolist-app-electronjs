import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { getToken } from '../helpers'

const HomePage = () => {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useAuthContext()
  const jwt = getToken()

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/users/me?populate=*', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      const dataJson = await response.json()
      setLists(dataJson.todolists)
      setLoading(false)
      console.log(dataJson.todolists)
    } catch (error) {
      console.error('Erreur API :', error)
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Hello {user?.username}</h1>
      <div className="lists">
        {user &&
          lists.map((list, id) => (
            <Link to={`/todolist/${list.id}`}>
              <div key={id} className="card">
                <h3>{list.title}</h3>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default HomePage
