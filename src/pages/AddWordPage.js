import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddWordPage(props) {
    const [input, setInput] = useState({
        word: "",
        definition: "",
        example: "",
        image: ""
    })

    const user = localStorage.getItem("teenLongToken")

    const [warning, setWarning] = useState(null)
    
    const [newWord, setNewWord] = useState(null)

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const uploadFile = async() => {
        const selectedFile = document.getElementById('upload_form').files[0]
        if(!selectedFile){
            submitInput()
        } else {
            var formdata = new FormData();
            formdata.append("image", selectedFile);
            const res = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_KEY}`
                },
                body: formdata
            });
            
            if(res.ok){
                const data = await res.json();
                console.log('data====',data)
                if(data.success){
                    input.image = data.data.link
                    submitInput()
                } else {
                    console.log("cannot upload because of", data.message)
                }
            } else {
                alert("cannot upload")
            }
        }
    }

    const getInput = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!user){
            setWarning(<h6 className="text-danger">Đăng nhập đã bạn ơi vội vàng làm chi</h6>)
            return
        }

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            uploadFile();
        }
    }


    const submitInput = async () => {
    
        console.log('input====', input)
        const token = localStorage.getItem("teenLongToken")
        const config = {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER}/addNewWord`, config)
        const data = await res.json()
        if (data.status === "success") {
            setNewWord(data.data)
            setLoading(false)
        }
        console.log('data new Word====', data)
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            {!newWord?
                <Form 
                    onSubmit={getInput} 
                    onChange={handleChange}
                >
                    <h1>Tạo từ mới </h1>
                    <h6 className="mb-4">Hoặc định nghĩa mới cho từ cũ</h6>
                    
                    {warning}
                    {loading? <div className="loader"></div> : ""}

                    <Form.Group controlId="formBasicWord">
                        <Form.Label>Từ <span className="text-danger">*</span></Form.Label>
                        <Form.Control required type="text" name="word" placeholder="trẩu tre"
                            value={input.word} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDefinition">
                        <Form.Label>Định nghĩa <span className="text-danger">*</span></Form.Label>
                        <Form.Control required as="textarea" name="definition" placeholder="các bạn trẻ tràn đầy nhiệt huyết và năng động như con trâu"
                            value={input.email} />
                        {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicExample">
                        <Form.Label>Ví dụ <span className="text-danger">*</span></Form.Label>
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
                        <Form.Label>Upload ảnh (Không bắt buộc)</Form.Label>
                        <Form.Control type="file" id="upload_form" name="image" accept="image/jpg, image/png, image/jpeg, image/gif" />
                    </Form.Group>


                    <Button variant="warning button" type="submit">
                        Tạo từ mới
                    </Button>
                    
               
                </Form>
                : <div>Từ của bạn đã được tạo. Hi vọng sẽ qua vòng kiểm duyệt!</div>}
        </div>
    )
}
