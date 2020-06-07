import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import Reactions from './Reactions'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function Words(props) {
    // const [words, setWords] = useState([])
    const deleteWord = async(wordID) => {
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("teenLongToken")}`
            }
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER}/pendingWords/myWords/${wordID}`, config)
        console.log('res====', res)
        if(res.status===204){
            props.getWords()
        }
    }

    const renderWord = () => {
            return props.words? props.words.map(el => 
        (<Card className="col my-4" key={el._id}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div className="">
                        <Link to={`/search/${el.word}`} className="word">{el.word}</Link>
                    </div>
                    {!el.isApproved? 
                    <div className="float-right trash" onClick={()=>deleteWord(el._id)}>
                        <i class="far fa-trash-alt"></i></div>
                    : ""}
                </Card.Title>
                <Card.Text className="py-2">
                    <div>{props.isSearch && props.words.indexOf(el)===0? 
                    <small className="topDef p-2">ĐƯỢC ƯA THÍCH NHẤT</small> : ''}</div>
                </Card.Text>
                <Card.Text>
                {el.definition}
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
        : <div className="loader"></div>
    }

    return (
        <div>
            {props.words? renderWord(): <div className="loader"></div>}
        </div>
    )
}
