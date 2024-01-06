import { useState, useEffect } from 'react'
import axios from 'axios'
import { server } from '../main'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import TodoItem from '../components/TodoItem'
import { useStore } from '../utils/store'
import { useFetchGet } from '../utils/useFetch'
import isValid from '../utils/isValidInput'

const Home = () => {
    const { setUser, setIsAuthenticated, isAuthenticated } = useStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [refresh, setRefresh] = useState(false)

    const { error, data: tasksData } = useFetchGet('/task/my', refresh)

    useEffect(() => {
        setTasks(tasksData.tasks)
    }, [tasksData])

    if (error.error) toast.error(error.message)

    const handleUpdate = async (id) => {
        const todos = tasks
        setTasks((prev) => {
            return prev.map((task) =>
                task._id === id ? { ...task, isCompleted: !task.isCompleted } : task,
            )
        })
        try {
            const { data } = await axios.put(`${server}/task/${id}`, {}, { withCredentials: true })
            toast.success(data.message)

            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            setTasks(todos)
            toast.error(error.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        setTasks((prev) => {
            return prev.filter((task) => task._id !== id)
        })
        try {
            const { data } = await axios.delete(`${server}/task/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            setTasks(tasks)
            toast.error(error.response.data.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(isValid(title, description))
        if (!isValid(title, description)) {
            return toast.error('Title Or Description cannot be Empty or Contain only a Whitespace')
        }

        const todos = tasks
        setLoading(true)
        setTasks((prev) => [
            ...prev,
            {
                _id: prev.length + 1,
                title,
                description,
                isCompleted: false,
                handleUpdate: () => {},
                handleDelete: () => {},
            },
        ])

        try {
            const { data } = await axios.post(
                `${server}/task/new`,
                {
                    title,
                    description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            toast.success(data.message)
            setLoading(false)
            setTitle('')
            setDescription('')
            setRefresh((prevVal) => !prevVal)
        } catch (error) {
            toast.error(error.response.data.message)
            setTasks(todos)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${server}/users/me`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user)
                setIsAuthenticated(true)
                setLoading(false)
            })
            .catch((err) => {
                setUser({})
                setIsAuthenticated(false)
                setLoading(false)
            })
    }, [])

    if (!isAuthenticated) return <Navigate to='/login' />

    return (
        <>
            <div className='m-auto mt-24 w-2/4 rounded-3xl bg-gradient-to-br from-[rgb(255,255,255,0.2)] to-transparent p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-transparent'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        name='title'
                        id='title'
                        autoComplete='on'
                        required
                        className='rounded-3xl border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                    />
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        name='description'
                        id='description'
                        autoComplete='on'
                        required
                        className='rounded-3xl border-[1px] border-[rgb(255,255,255,0.2)] bg-transparent p-3 text-2xl text-white outline-none'
                    />

                    <button
                        type='submit'
                        disabled={loading}
                        className='m-auto w-fit rounded-xl border-2 bg-white px-3 py-2 text-xl text-black'>
                        Add Task
                    </button>
                </form>
            </div>
            <section className='scrollbar m-auto mt-10 flex max-h-[250px] w-1/2 flex-col items-center gap-3 overflow-y-auto overflow-x-hidden pr-3 text-white'>
                {tasks?.map((task) => (
                    <TodoItem
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        desc={task.description}
                        isCompleted={task.isCompleted}
                        loading={loading}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ))}
            </section>
        </>
    )
}
export default Home
