import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BuffSearch from '../images/buff-search.svg'
import title from '../images/text.svg'

export default function SearchResultHeader(props) {
    const [keyWord, setKeyWord] = useState(null)
    const word = useParams().keyWord

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
        <div className="row d-flex justify-content-center bg-dark py-5 homeHeader">

            <img src={BuffSearch} className="col-md-4 col-sm-0 bannerImage"/>
            <div className="col-md-8 col-sm-8">
                {/* <img src={title} className="col-5"/>
                <h2 className="text-white pl-2 slogan py-3">Ngôn ngữ từ cộng đồng</h2>
            <Form inline className="col-9 d-flex justify-content-center" onSubmit={getKeyWord} onChange={handleChange} >
                <FormControl type="text" placeholder=" Từ còn théc méc" className="mr-sm-2 col form-control" />
                <Link to={`/search/${keyWord}`}>
                    <Button variant="warning" type="submit">Tìm <i class="fas fa-search"></i></Button>
                </Link>
            </Form> */}
            <div className="speech-bubble display-4 mt-5 ml-5">Tìm từ  <span className="font-weight-bold">"{word.trim()}"</span></div>
            </div>
            
        </div>
    )
}
