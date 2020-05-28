import React from 'react'
import Words from '../components/Words'

export default function HomePage(props) {
    return (
        <div>
            <div className="d-flex">
                <div className="col-3"></div>
                <div className="col-6">
                    <Words />
                </div>
            </div>
        </div>
    )
}
