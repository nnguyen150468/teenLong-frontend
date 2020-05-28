import React from 'react'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default function ApprovedWords(props) {
    const renderApprovedWords = () => {
        return props.approvedWords.map(el => (<Card className="col my-4" key={el._id}>
            <Card.Body>
                <Card.Title>{el.word}</Card.Title>
                <Card.Text>
                    {el.definition}
                </Card.Text>
                <Card.Text className="font-italic">
                    {el.example}
                </Card.Text>
                <Card.Img variant="top" src={el.image} />
                <Button variant="primary">Like</Button>
            </Card.Body>
        
            <small className="text-muted">
                    By {el.user?<Link to={`/users/${el.user._id}`}> 
                    {el.user.name} </Link>: "anonymous"} 
                    on <Moment format="MMMM DD, YYYY">{el.createdAt}</Moment></small>

        </Card>)

        )
    }
    return (
        <div>
            Approved Words
            {renderApprovedWords()}
        </div>
    )
}
