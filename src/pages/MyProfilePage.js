import React, { useState, useEffect } from 'react'
import UserStats from '../components/UserStats'
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
                    {props.user ? <div><div>{props.user.name}</div>
                        <UserStats user={props.user} />
                        <Button variant="warning" className="mr-2" onClick={() => getWords('allMyPending')}>
                            Từ chờ duyệt <i class="fas fa-search"></i></Button>
                        <Button variant="warning" onClick={() => getWords('allMyApproved')}>
                            Từ được đăng <i class="fas fa-search"></i></Button>
                    </div> : ""}


                    <Words words={words} key={key} setWords={setWords} getWords={getWords} />

                    <div className="d-flex justify-content-center">
                        <Pagination className="pagination m-5 p-5"
                            prevPageText='prev'
                            nextPageText='next'
                            firstPageText='first'
                            lastPageText='last'
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={totalResult}
                            onChange={(pageNumber) => handlePageChange(pageNumber)}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}