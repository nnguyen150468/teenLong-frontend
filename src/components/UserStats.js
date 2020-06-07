import React from 'react'
import YoungBuff from '../images/youngbuff.svg'
import HighestScorer from '../images/highest-scorer-badge.svg'
import MostContribute from '../images/most-contribute-badge.svg'

export default function UserStats(props) {
    return (
        <div>
            <div className="row mb-5" inline={true}>
                <img src={YoungBuff} />
                <h1 className="ml-5 mt-5">{props.user.name}</h1>
            </div>
            <div className="row d-flex justify-content-around">
                <div className="row">
                    <i className="fas fa-star fa-2x star mr-2"></i>
                    <h4>Điểm: {props.user.scores}</h4>
                </div>
                <div className="row">
                    <i class="far fa-comment-alt fa-2x wordCount mr-2"></i>
                    <h4>Số từ: {props.user.wordCount}</h4>
                </div>
            </div>
            <div className="row d-flex justify-content-center  mt-5">
                <div className="">
                    <img className="honorsBadges mr-3" src={HighestScorer} />
                </div>
                <div className="">
                    <img className="honorsBadges" src={MostContribute} />
                </div>
            </div>
        </div>
    )
}
