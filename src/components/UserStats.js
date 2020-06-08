import React from 'react'
import YoungBuff from '../images/youngbuff.svg'
import HighestScorer from '../images/highest-scorer-badge.svg'
import MostContribute from '../images/most-contribute-badge.svg'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


export default function UserStats(props) {
    return (
        <div className="bg-dark text-white">
            <div className="row mb-5">
                <img src={YoungBuff} className="ml-5 mt-3 d-none d-md-block"/>
                <div className=" col">
                    <h1 className="ml-5 mt-5">{props.user.name}</h1>
                    <div className="d-flex">
                        <div className="row mx-5">
                            <i className="fas fa-star fa-2x star mr-2"></i>
                            <h4>Điểm: {props.user.scores}</h4>
                        </div>
                        <div className="row">
                            <i class="far fa-comment-alt fa-2x wordCount mr-2"></i>
                            <h4>Số từ: {props.user.wordCount}</h4>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="row d-flex ml-5  mt-5 pb-3">
                <Tippy content="Nhiều bình chọn nhất" placement="bottom">
                    <img className="honorsBadges mr-4" src={HighestScorer} />
                </Tippy>
                <Tippy content="Nhiều từ nhất" placement="bottom">
                    <img className="honorsBadges" src={MostContribute} />
                </Tippy>
            </div>
        </div>
    )
}
