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

    return (
        <div>
            
            {props.user ? <div className="d-flex justify-content-center mt-5">
                <div className="col-md-6 col-sm-12">
                    <UserStats user={props.user} />

                    <Link to="/myProfile/pendingWords">
                        <Button variant="warning" className="mr-2" >
                            Từ chờ duyệt <i class="fas fa-search"></i></Button>
                    </Link>
                    <Link to="/myProfile/approvedWords">
                    <Button variant="success" >
                        Từ được đăng <i class="fas fa-search"></i></Button>
                    </Link>
                </div>
            </div>
            : <div className="loader"></div>}
        </div>
    )
}