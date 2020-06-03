import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import Reactions from './Reactions'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function Words(props) {
    // const [words, setWords] = useState([])

    const renderWord = () => {
            return props.words? props.words.map(el => 
        (<Card className="col my-4" key={el._id}>
            <Card.Body>
                <Card.Title><Link to={`/search/${el.word}`} className="word">{el.word}</Link></Card.Title>
                <Card.Text className="py-2">
                    {el.definition}
                    <div>{props.isSearch && props.words.indexOf(el)===0? 'TOP DEFINITION' : ''}</div>
                </Card.Text>
                <Card.Text className="font-italic">
                    {el.example}
                </Card.Text>
                <Card.Text>
                <Card.Img variant="top" src={el.image} />
                <small className="font-weight-bold">
                    Đăng bởi {el.user?<Link to={`/users/${el.user._id}`}> 
                    {el.user.name} </Link>: "anonymous"} 
                     <Moment format="DD/MM, YYYY">{el.createdAt}</Moment></small>
            
                </Card.Text>
                {/* <Button variant="primary">Like</Button>
                <Button variant="primary">Dislike</Button> */}
                
                {el.isApproved? <Reactions key={props.key} word={el._id}  likes={el.reactions.likes} dislikes={el.reactions.dislikes} getWords={props.getWords} />: ""}
            </Card.Body>
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
