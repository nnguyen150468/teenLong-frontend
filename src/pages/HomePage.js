import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Words from '../components/Words'
import Header from '../components/Header'
import Pagination from "react-js-pagination";
import MostPost from '../components/MostPost'

export default function HomePage() {
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)
    const [mostPost, setMostPost] = useState(null)

    useEffect(() => {
        getWords()
        
    }, [])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const getWords = async () => {

        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/?page=${activePage}`, config)
        const data = await res.json()
        console.log('data', data)
        setWords(data.data)
        setTotalResult(data.totalResult)
        getMostPost()
    }

    const getMostPost = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/mostPost`, config)
        
        const data = await res.json()
        if(data.status==="success"){
            setMostPost(data.data)
        }
    }

    // pagination
    const handlePageChange = async (pageNumber)=> {
        setActivePage(pageNumber);
        console.log(`active page is ${pageNumber}`);

        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/?page=${pageNumber}`, config);
        const data = await res.json();
        console.log('paginated data:', data);
        setWords(data.data)
        setTotalResult(data.totalResult)
    }


    return (
        words?
        <div>
            <Header words={words} setWords={setWords}/>
            <div className="d-flex justify-content-center">
                <div className="col-lg-5 col-md-6">
                    
                    <Words words={words}  setWords={setWords} getWords={getWords}/>
                   {!words ? <div className="loader"></div> : ""}
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
                <div className="col-md-2 mt-4 d-none d-lg-block">
                    {/* <div className="row">
                        <div className="plus-container mr-3">
                            <i class="fa fa-plus" aria-hidden="true"></i>   
                        </div>
                        <div className="d-flex align-items-center font-weight-bold">THÊM TỪ MỚI</div>
                    </div> */}
                    <Link to="/addWord">
                        <div className="add-new-word p-3 d-flex justify-content-around">
                            <i class="fa fa-plus" aria-hidden="true"></i> <span>THÊM TỪ MỚI</span>
                        </div>
                    </Link>
                    <div className="mt-3">
                        <span className="add-word-description">Teen Lóng được xây dựng bởi chính bạn! </span>
                    </div>
                    <div>
                        {mostPost? <MostPost mostPost={mostPost} /> : <div className="loader"></div>}
                    </div>
                </div>
            </div>
        </div> : <div className="loader"></div>
    )
}
