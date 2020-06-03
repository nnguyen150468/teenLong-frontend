import React, {useState, useEffect} from 'react'
import UserStats from '../components/UserStats'

export default function MyProfilePage(props) {

    useEffect(() => {
    }, [])

        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("teenLongToken")}`
            }
        }
        
            const res = await fetch(`${process.env.REACT_APP_SERVER}/words/allMyWords`, config)
            const data = await res.json()
            if(data.status==="success"){
            }
        }

    return (
        <div>
            My Profile
            {props.user? props.user.name : ""}
            <UserStats user={props.user} />
    
        </div>
    )
}