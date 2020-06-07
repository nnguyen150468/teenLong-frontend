import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Filter1stCharHeader from '../components/Filter1stCharHeader'
import Pagination from "react-js-pagination";
import Words from '../components/Words'

export default function FilterByFirstCharPage() {
    const params = useParams()
    console.log('params', params.character)
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)

    const [warning, setWarning] = useState(null)

    useEffect(() => {
        setWarning(null)
        getWords()
    }, [params.character])

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const getWords = async () => {
        setActivePage(1)
        const res = await fetch(`${process.env.REACT_APP_SERVER}/words/filter/${params.character}?page=${1}`, config)
        const data = await res.json()
        console.log('data===', data)
        if(data.totalResult > 0){
            console.log('totalResult is >0', data.totalResult)
            setWords(data.data)
        } else if(data.totalResult===0){
            console.log('totalResult is', data.totalResult)
            setWarning(<div>Không tìm thấy kết quả cho chữ cái này :(</div>)
        }
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


    return (words?
        <div>
            <Filter1stCharHeader words={words} setWords={setWords}/>
            <div className="d-flex justify-content-center">
            
            <div className="col-md-6">
                    {!words? <div className="loader"></div> : ""}
                    <Words words={words} setWords={setWords} getWords={getWords}/>
                    <h2 className="mt-5">{warning}</h2>
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
        : <div className="loader"></div>
    )
}
