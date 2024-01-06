import { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { server } from '../main'
import { toast } from 'react-hot-toast'
import { useStore } from '../utils/store'

const Login = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useStore()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(
                `${server}/users/login`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to='/' />

    return (
        <div className='m-auto mt-24 w-2/4 rounded-3xl bg-gradient-to-br from-[rgb(255,255,255,0.2)] to-transparent p-6'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-transparent'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    name='username'
                    id='username'
                    autoComplete='on'
                    required
                    className='rounded-3xl border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    name='password'
                    id='password'
                    autoComplete='on'
                    required
                    className='rounded-3xl border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                />
                <div className='flex items-center justify-between px-4'>
                    <Link
                        to='/register'
                        className='text-center text-white transition-opacity hover:opacity-70'>
                        Create an Account
                    </Link>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-fit rounded-xl border-[1px] bg-transparent bg-white px-3 py-2 text-xl text-black transition-opacity hover:opacity-70'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
