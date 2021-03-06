import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import searchImg from '../images/search.svg'
import title from '../images/text.svg'

export default function Header(props) {
    const [keyWord, setKeyWord] = useState(null)


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
        <div className="d-flex justify-content-center bg-dark py-5 homeHeader">
            <img src={searchImg} className="col-4 bannerImage d-none d-md-block"/>
            <div className="col-md-8 col-sm-10">
                <img src={title} className="col-5"/>
                <h2 className="text-white pl-2 slogan py-3">Ngôn ngữ từ cộng đồng</h2>
            <Form inline className="col-md-9 col-sm-12 d-flex justify-content-center" onSubmit={getKeyWord} onChange={handleChange} >
                <FormControl type="text" placeholder=" Từ còn théc méc" className="mr-sm-2 col form-control" />
                <Link to={`/search/${keyWord}`}>
                    <Button variant="warning" type="submit">Tìm <i class="fas fa-search"></i></Button>
                </Link>
            </Form>
            </div>
            
        </div>
    )
}
