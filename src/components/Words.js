import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import Reactions from './Reactions'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function Words(props) {
    // const [words, setWords] = useState([])
    const [userName, setUserName] = useState('haha')

    useEffect(() => {
        getWords()
    }, [])

    const getWords = async () => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/`, config)
        const data = await res.json()
        props.setWords(data.data)
    }




    const renderWord = () => {
            return props.words? props.words.map(el => 
        (<Card className="col my-4" key={el._id}>
            <Card.Body>
                <Card.Title>{el.word}</Card.Title>
                <Card.Text>
                    {el.definition}
                    {/* <div>{props.words.indexOf(el)===0? 'TOP DEFI' : ''}</div> */}
                </Card.Text>
                <Card.Text className="font-italic">
                    {el.example}
                </Card.Text>
                <Card.Img variant="top" src={el.image} />
                {/* <Button variant="primary">Like</Button>
                <Button variant="primary">Dislike</Button> */}
                <Reactions word={el._id} likes={el.reactions.likes} dislikes={el.reactions.dislikes} getWords={getWords} />
            </Card.Body>
            
                <small className="text-muted">
                    By {el.user?<Link to={`/users/${el.user._id}`}> 
                    {el.user.name} </Link>: "anonymous"} 
                    on <Moment format="MMMM DD, YYYY">{el.createdAt}</Moment></small>
            
        </Card>)
        )
        : <div>Loading...</div>
    }

    return (
        <div>
            {renderWord()}
        </div>
    )
}
