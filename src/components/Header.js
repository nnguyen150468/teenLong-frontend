import React, {useState} from 'react'
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
        } else {
            search()
        }
    }

    const search = async() => {
        const config = {
            method: "POST",
            body: JSON.stringify({"word": keyWord}),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/search`, config)
        const data = await res.json()
        console.log('data from search ==', data)
        if(data.status==="success"){
            props.setWords(data.data)
        }
    }

    const handleChange = (e) => {
        setKeyWord(e.target.value)
    }

    return (
        <div>
            <Form inline className="col-12 d-flex justify-content-center" onSubmit={getKeyWord} onChange={handleChange} >
                <FormControl type="text" placeholder="Search" className="mr-sm-2 col-6" />
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
        </div>
    )
}
