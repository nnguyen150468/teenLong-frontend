import React, {useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import ApprovedWords from '../components/ApprovedWords'


export default function UserPage(props) {
    console.log(window.location)
    const params = useParams()
    const [user, setUser] = useState(null)
    const [words, setWords] = useState([])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        getUser()
        getWords()  
    }, [])

    const getUser = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/${params.userID}`, config)
        const data = await res.json()
        if(data.status==="success"){
            console.log('success user!')
            setUser(data.data)
        }
    }

    const getWords = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/${params.userID}/words`, config)
        const data = await res.json()
        if(data.status==="success"){
            console.log('success!')
            setWords(data.data)
        }
    }

    return (
        <div>
            {user? user.name: ""}
            <ApprovedWords approvedWords={words} />
        </div>
    )
}
