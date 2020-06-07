import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BuffFilter1stChar from '../images/filter-1st-char.svg'
import title from '../images/text.svg'

export default function Filter1stCharHeader(props) {
    const [keyWord, setKeyWord] = useState(null)
    const word = useParams().character

    console.log('word', word)

    const getKeyWord = (e) => {
        e.preventDefault();
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
    }

    const handleChange = (e) => {
        setKeyWord(e.target.value)
    }

    return (
        <div className="bg-dark py-5">
            <div className="row d-flex justify-content-center ">
                <img src={BuffFilter1stChar} className="col-md-4 col-sm-0 bannerImage"/>
                <div className="col-md-8 col-sm-10">
                    <div className="speech-bubble display-4 mt-5 ml-5 text-center">Chữ cái đầu là  <span className="font-weight-bold">
                        {word==="*"? "kí tự đặc biệt" : `${word.toUpperCase()}`}</span></div>
                </div>
            </div>
        </div>
    )
}
