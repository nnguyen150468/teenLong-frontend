import React from 'react'
import {Link} from 'react-router-dom'
import MostContribute from '../images/most-contribute-badge.svg'

export default function MostPost(props) {
    console.log('props.mostPost', props.mostPost)
    const renderMostPost = () => {
        return props.mostPost.map(el => 
            <div className="d-flex justify-content-between">
                <Link to={`/users/${el._id}`}>
                <div className="font-weight-bold">{el.name}</div>
                </Link>
                <div>{el.wordCount}</div>
            </div>)
    }
    
    return (
        props.mostPost? <div className="mt-5 bg-white p-3">
            <div>
             <div className="font-weight-bold mb-3">Nhiều từ nhất</div>
             <div className="text-center my-4">
                 <img src={MostContribute}  className="w-75"/>
            </div>
             </div>
            {renderMostPost()}
        </div>
        : <div className="loader"></div>
    )
}
