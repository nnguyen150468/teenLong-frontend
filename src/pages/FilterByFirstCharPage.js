import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/Header'
import Pagination from "react-js-pagination";
import Words from '../components/Words'

export default function FilterByFirstCharPage() {
    const params = useParams()
    console.log('params', params.character)
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)

    useEffect(() => {
        getWords()
    }, [params.character])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const getWords = async () => {
        
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/filter/${params.character}?page=${activePage}`, config)
        const data = await res.json()
        console.log('data===', data)
        setWords(data.data)
        setTotalResult(data.totalResult)
    }

    // pagination
    const handlePageChange = async (pageNumber)=> {
        setActivePage(pageNumber);
        console.log(`active page is ${pageNumber}`);

        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/filter/${params.character}?page=${pageNumber}`, config);
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
                    <Words words={words} setWords={setWords} getWords={getWords}/>
                   
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
