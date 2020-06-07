import React,{useEffect, useState} from 'react'
import UserStats from '../components/UserStats'
import Words from '../components/Words'
import Pagination from "react-js-pagination";

export default function MyApprovedWords(props) {
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)

    useEffect(() => {
        getWords()
    }, [])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("teenLongToken")}`
        }
    }

    const getWords = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/allMyApproved?page=${activePage}`, config)
        const data = await res.json()
        setWords(data.data)
        setTotalResult(data.totalResult)
    }

    // pagination
    const handlePageChange = async (pageNumber)=> {
        setActivePage(pageNumber);
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/allMyApproved?page=${pageNumber}`, config);
        const data = await res.json();
        setWords(data.data)
        setTotalResult(data.totalResult)
    }


    return (
        <div>
            
            <div className="d-flex justify-content-center">
                {props.user? 
                <div className="col-6 mt-5">
                    
                    <UserStats user={props.user} />
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
                </div> : <div className="loader"></div>}
            </div>
        </div>
    )
}
