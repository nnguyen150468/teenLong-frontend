import React from 'react'
import YoungBuff from '../images/youngbuff.svg'

export default function UserStats(props) {
    return (
        <div>
            <div className="row" inline={true}>
                <img src={YoungBuff} />
                <h1 className="mt-5">{props.user.name}</h1>
            </div>
            <div className="row d-flex justify-content-around">
                <div>
                    <h4>Điểm: {props.user.scores}</h4>
                    <div className="fa-5x star">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div>
                    <h4>Số từ: {props.user.wordCount}</h4>
                    <div className="fa-5x wordCount">
                        <i class="far fa-comment-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
