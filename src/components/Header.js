import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

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
        <div>
            <Form inline className="col-12 d-flex justify-content-center" onSubmit={getKeyWord} onChange={handleChange} >
                <FormControl type="text" placeholder="Search" className="mr-sm-2 col-6" />
                <Link to={`/search/${keyWord}`}>
                    <Button variant="outline-success" type="submit">Search</Button>
                </Link>
            </Form>
        </div>
    )
}
