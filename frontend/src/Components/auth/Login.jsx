import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../features/auth/authAction'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [data, setdata] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, user, message } = useSelector((state) => state.auth)

  const handleUpdate = (e) => {
    e.preventDefault()
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const dis = await dispatch(signIn(data))
  }
  useEffect(() => {
    if (message) {
      if (user?.status === 0) {
        toast.error(message, { theme: 'colored' })
      } else {
        toast.success(message, { theme: 'colored' })
      }
    }
  }, [user])
  useEffect(() => {
    if (user?.status === 3) {
      navigate('/Home')
    }
  }, [user, navigate])
  return (
    <>
      <div className='signUp'>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1 className='h1 signUp-h1'>Login</h1>
            {loading && <h1>LOADING.......</h1>}
            {error && <p>{message}</p>}
            <input type="email" name='email' className='input signUp-input' placeholder='Enter your Email' onChange={handleUpdate} />
            <input type="password" name='password' className='input signUp-input' placeholder='Enter your Password' onChange={handleUpdate} />
            <button className='btn signIn-btn' type='submit'>{loading ? "Logging..." : "Login"}</button>
            <p>not have an account <Link to='/Register'>Click here</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
