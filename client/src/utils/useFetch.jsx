import { useState, useEffect } from 'react'
import axios from 'axios'
import { server } from '../main'

export const useFetchGet = (endpoint, refresh = true) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState({
        error: false,
        message: '',
    })

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${server}${endpoint}`, {
                withCredentials: true,
            })
            .then((res) => {
                setLoading(false)
                setData(res.data)
                setError({
                    error: false,
                    message: '',
                })
            })
            .catch((err) => {
                setData([])
                setLoading(false)
                setError({
                    error: true,
                    message: err.message,
                })
            })
    }, [refresh])

    return { error, loading, data }
}
