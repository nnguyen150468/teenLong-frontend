import React from 'react'

export default function UserStats(props) {
    return (
        <div>
            <div>Points: {props.user.scores}</div>
            <div>Words contributed: {props.user.wordCount}</div>
        </div>
    )
}
