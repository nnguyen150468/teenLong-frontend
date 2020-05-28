import React from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function Header() {
    return (
        <div>
            <Form inline className="col-12 d-flex justify-content-center ">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 col-6" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}
