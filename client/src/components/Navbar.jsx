import axios from 'axios'
import { Link } from 'react-router-dom'
import { server } from '../main'
import { useStore } from '../utils/store'
import { toast } from 'react-hot-toast'
import { FiLogOut, FiHome } from 'react-icons/fi'

const Navbar = () => {
    const { user, setUser, isAuthenticated, setIsAuthenticated, loading, setLoading } = useStore()

    const handleLogout = async () => {
        setLoading(true)
        try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            })

            toast.success('Logged Out Successfully')
            setIsAuthenticated(false)
            setLoading(false)
            setUser({})
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        }
    }

    return (
        <nav className='flex items-center bg-zinc-900 px-14 py-3 text-gray-200'>
            <div className='mr-auto'>
                <h1 className='text-4xl'>Todo App</h1>
            </div>
            <div>
                <ul className='flex gap-10 text-2xl'>
                    {user?.role === 'admin' && (
                        <li>
                            <button>
                                <Link to='/dashboard'>Dashboard</Link>
                            </button>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <button>
                                <Link to='/'>
                                    <FiHome />
                                </Link>
                            </button>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className='flex items-center justify-center'>
                            <button onClick={handleLogout} disabled={loading}>
                                <FiLogOut />
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
