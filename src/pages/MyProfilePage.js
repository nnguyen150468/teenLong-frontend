import React, { useState, useEffect } from 'react'
import UserStats from '../components/UserStats'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Words from '../components/Words'
import Pagination from "react-js-pagination";

export default function MyProfilePage(props) {
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1);
    const [key, setKey] = useState(null)
    // useEffect(() => {
    //     getWords()
    // }, [])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("teenLongToken")}`
        }
    }

    const getWords = async (keyW) => {
        setKey(keyW)
        console.log('key', key)

        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/${keyW}?page=${activePage}`, config)
        const data = await res.json()
        if (data.status === "success") {
            console.log('data my pro5', data)
            setWords(data.data)
            setTotalResult(data.totalResult)
        }
    }

    // pagination
    const handlePageChange = async (pageNumber) => {
        setActivePage(pageNumber);
        console.log(`active page is ${pageNumber}`);

        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/${key}?page=${pageNumber}`, config);
        const data = await res.json();
        console.log('paginated data:', data);
        setWords(data.data)
        setTotalResult(data.totalResult)
    }

    return (
        <div>
            
            <div className="d-flex">
                <div className="col-3"></div>
                <div className="col-6">
                    {props.user ? 
                    <div>
                        <div>{props.user.name}</div>
                        <UserStats user={props.user} />
                        <Link to="/myProfile/pendingWords">
                            <Button variant="warning" className="mr-2" onClick={() => getWords('allMyPending')}>
                                Từ chờ duyệt <i class="fas fa-search"></i></Button>
                        </Link>
                        <Link to="/myProfile/approvedWords">
                        <Button variant="warning" onClick={() => getWords('allMyApproved')}>
                            Từ được đăng <i class="fas fa-search"></i></Button>
                        </Link>
                    </div> : ""}


                    <Words words={words} key={key} setWords={setWords} getWords={getWords} />

                    <div className="d-flex justify-content-center">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}