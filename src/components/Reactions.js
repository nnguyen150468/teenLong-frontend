import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'

export default function Reactions(props) {
    const likeWord = async(wordID) => {
        const body = {
            "reaction": "like"
        }
        const token = localStorage.getItem("teenLongToken")
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/${props.word}/react`, config)
        const data = await res.json()
        console.log('data like dislike===', data)
        if(data.status==="success"){
            console.log('about to get words')
            props.getWords()
        }
    }

    const dislikeWord = async(wordID) => {
        const body = {
            "reaction": "dislike"
        }
        const token = localStorage.getItem("teenLongToken")
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/${props.word}/react`, config)
        const data = await res.json()
        console.log('data like dislike===', data)
        if(data.status==="success"){
            console.log('about to get words')
            props.getWords()
        }
    }

    return (
        <div >
            <Button variant="warning mr-2" className="button col-2" onClick={()=>likeWord(props.word)}><i class="far fa-thumbs-up"></i> {props.likes}</Button>
            <Button className="button col-2 dislikeButton" onClick={()=>dislikeWord(props.word)}><i class="far fa-thumbs-down"></i> {props.dislikes}</Button>
        </div>
    )
}
