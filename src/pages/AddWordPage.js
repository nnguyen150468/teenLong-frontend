import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { uploadFile } from 'react-s3';

const configurations = {
    bucketName: 'teen-long',
    dirName: 'teen-long01',
    region: 'ap-southeast-1',
    accessKeyId: process.env.AMZ_KEY,
    secretAccessKey: process.env.AMZ_SECRET,
}

export default function AddWordPage() {
    const [input, setInput] = useState({
        word: "",
        definition: "",
        example: ""
    })

    const [warning, setWarning] = useState(null)
    const [inputStyle, setInputStyle] = useState(null)
    const [newWord, setNewWord] = useState(null)

    const [file, setFile] = useState(null)


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        
    }

    const getInput = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            submitInput()
        }
    }

    // const onChangeHandler = e => {
    //     setFile(e.target.files[0])
    // }

    const submitFile = () => {
        const file = document.getElementById('uploadForm').files[0]
        uploadFile(file, configurations)
        .then(data => console.log('data',data))
        .catch(err => console.error(err))
    }

    const submitInput = async () => {
        const file = document.getElementById('uploadForm').files[0]
        console.log('file in submit==', file)
        uploadFile(file, configurations)
            .then(data => console.log('data',data))
            .catch(err => console.error(err))

        
        // const token = localStorage.getItem("teenLongToken")
        // const config = {
        //     method: "POST",
        //     body: JSON.stringify(input),
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     }
        // }
        // const res = await fetch(`${process.env.REACT_APP_SERVER}/addNewWord`, config)
        // const data = await res.json()
        // if (data.status === "success") {
        //     setNewWord(data.data)
        // }
        // console.log('data ====', data)
    }

    return (
        <div className="d-flex justify-content-center">
            {!newWord ?
                <Form 
                // onSubmit={getInput} 
                onSubmit={submitFile}
                // onChange={handleChange}
                // onChange={e=>onChangeHandler(e)}
                >
                    <Form.Group controlId="formBasicWord">
                        <Form.Label>Word</Form.Label>
                        <Form.Control required type="text" name="word" placeholder="Word"
                            value={input.word} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDefinition">
                        <Form.Label>Definition</Form.Label>
                        <Form.Control required as="textarea" name="definition" placeholder="definition"
                            value={input.email} />
                        {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicExample">
                        <Form.Label>Example</Form.Label>
                        <Form.Control required as="textarea" name="example" placeholder="example"
                            value={input.example} />
                        {/* <Form.Text className="text-danger">
                    {warning}
                </Form.Text> */}
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicPassword">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" name="tags" placeholder="tags"
                    value={input.password2}  />
                <Form.Text className="text-danger">
                    {warning}
                </Form.Text>
            </Form.Group> */}

                    <Form.Group>
                        <Form.Label>Upload photo (Optional)</Form.Label>
                        <Form.Control type="file" name="file" id="uploadForm" accept="image/jpg, image/png, image/jpeg, image/gif" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
             </Button>
                </Form>
                : <div>Your new word has been submitted. Let's hope it gets approved!</div>}
        </div>
    )
}
