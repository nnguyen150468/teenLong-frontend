import React, {useState, useEffect} from 'react'
import PendingWords from '../components/PendingWords'
import ApprovedWords from '../components/ApprovedWords'
import UserStats from '../components/UserStats'

export default function MyProfilePage(props) {
    const [pendingWords, setPendingWords] = useState([])
    const [approvedWords, setApprovedWords] = useState([])

    useEffect(() => {
        getWordsByUser()
    }, [])

    const getWordsByUser = async()=>{
        console.log('props in getWords', props)
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
                setPendingWords(data.pendingWords)
                setApprovedWords(data.approvedWords)
            }
        }

    return (
        <div>
            My Profile
            {props.user? props.user.name : ""}
            <UserStats user={props.user} />
            {pendingWords? <PendingWords pendingWords={pendingWords} /> : ""}
            {approvedWords? <ApprovedWords approvedWords={approvedWords} /> : ""}
        </div>
    )
}
