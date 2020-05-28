import React, { useState } from 'react'


export default function TestAddImg() {
    const uploadFile = async(e) => {
        e.preventDefault();
        const selectedFile = document.getElementById('upload_form').files[0]
        var formdata = new FormData();
        formdata.append("image", selectedFile);
        const res = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_KEY}`
            },
            body: formdata
        });
        console.log('res===== upload', res)
        if(res.ok){
            const data = await res.json();
            console.log('data====',data)
            if(data.success){
                console.log('fetch new API')
            } else {
                console.log("cannot upload because of", data.message)
            }
        } else {
            alert("cannot upload")
        }
    }


    const submitFile = () => {

    }
    return (
        <div>
            <form onSubmit={uploadFile}>
                <input type="file" name="image" id="upload_form" />
                <button onClick={submitFile}>Submit</button>
            </form>
        </div>
    )
}
