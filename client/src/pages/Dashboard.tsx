import { FC, useEffect, useRef, useState } from 'react'
import { useStore } from '../utils/store'
import axios from 'axios'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AdminUserInfo from '../components/AdminUserInfo'
import Loader from '../components/Loader'
import { server } from '../main'
import { useFetchGet } from '../utils/useFetch'

const Dashboard: FC = () => {
    const { setUser, setIsAuthenticated, isAuthenticated } = useStore()
    const [refresh, setRefresh] = useState<boolean>(false)
    const navigate: NavigateFunction = useNavigate()

    const { error, loading, data }: TFetchGetUsers = useFetchGet('/admin/getAllUsers', refresh)

    if (error.error) toast.error(error.message)

    const effectRun = useRef<boolean>(false)

    useEffect(() => {
        let isMounted: boolean = true
        const controller: AbortController = new AbortController()
        const signal: AbortSignal = controller.signal

        if (effectRun.current) {
            axios
                .get<TFetchGetUser>(`${server}/users/me`, {
                    withCredentials: true,
                    signal,
                })
                .then((res) => {
                    isMounted && setUser(res.data.user)
                    isMounted && setIsAuthenticated(true)
                })
                .catch((err) => {
                    setUser(null)
                    navigate('/login')
                    setIsAuthenticated(false)
                    toast.error(err.message)
                })
        }

        return () => {
            isMounted = false
            controller.abort()
            effectRun.current = true
        }
    }, [isAuthenticated])

    const handleUserDelete = async (id: string) => {
        try {
            const { data } = await axios.delete<TBasicRes>(`${server}/admin/delete/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            const err = error as IAxiosErrorResponse
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className='w-full p-8'>
            {loading ? (
                <Loader />
            ) : (
                <div className='flex flex-col gap-4 text-center text-2xl'>
                    <div className='relative grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.1fr] items-center rounded-lg bg-[rgb(255,255,255,0.5)] px-2 py-2'>
                        <p>User</p>
                        <p>No. of Tasks</p>
                        <p>Role</p>
                        <p>Created On</p>
                        <p>Mutations</p>
                    </div>
                    {data.users?.map((user) => (
                        <AdminUserInfo
                            key={user?._id}
                            user={user}
                            handleUserDelete={handleUserDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default Dashboard
