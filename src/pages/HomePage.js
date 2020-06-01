import React, {useState} from 'react'
import Words from '../components/Words'
import Header from '../components/Header'

export default function HomePage(props) {
    const [words, setWords] = useState([])
    return (
        <div>
            <Header words={words} setWords={setWords} />
            <div className="d-flex">
                <div className="col-3"></div>
                <div className="col-6">
                    <Words words={words} setWords={setWords} />
                </div>
            </div>
        </div>
    )
}
