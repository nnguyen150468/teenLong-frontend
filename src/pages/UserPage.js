import React, {useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import UserStats from '../components/UserStats'
import ApprovedWords from '../components/ApprovedWords'
import Header from '../components/Header'
import Words from '../components/Words'
import Pagination from "react-js-pagination";

export default function UserPage(props) {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        getUser()
        getWords()  
    }, [])

    const getUser = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/${params.userID}`, config)
        const data = await res.json()
        if(data.status==="success"){
            console.log('success user!', data)
            setUser(data.data)
        }
    }

    const getWords = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/${params.userID}/words/?page=1`, config)
        const data = await res.json()
        if(data.status==="success"){
            console.log('success!')
            setWords(data.data)
            setTotalResult(data.totalResult)
        }
    }

    // pagination
    const handlePageChange = async (pageNumber)=> {
        setActivePage(pageNumber);
        console.log(`active page is ${pageNumber}`);

        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/${params.userID}/words/?page=${pageNumber}`, config);
        const data = await res.json();
        console.log('paginated data:', data);
        setWords(data.data)
        setTotalResult(data.totalResult)
    }

    return (
        <div>
            <Header words={words} setWords={setWords}/>
            
            
            <div className="d-flex">
                <div className="col-3"></div>
                <div className="col-6">
                {user? user.name: ""}
            {user? <UserStats user={user} /> : ""}


                    <Words words={words}  setWords={setWords} getWords={getWords}/>
                   
                   <div className="d-flex justify-content-center">
                    <Pagination className="pagination m-5 p-5"
                        prevPageText='prev'
                        nextPageText='next'
                        firstPageText='first'
                        lastPageText='last'
                        activePage={activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={totalResult}
                        onChange={(pageNumber)=>handlePageChange(pageNumber)}
                        itemClass="page-item"
                        linkClass="page-link"
                        />
                        </div>
                </div>
            </div>
        </div>
    )
}
