import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Words from '../components/Words'
import Pagination from "react-js-pagination";
import SearchResultHeader from '../components/SearchResultHeader'

export default function SearchResultPage() {
  const [words, setWords] = useState([])
  const [activePage, setActivePage] = useState(1);
  const [totalResult, setTotalResult] = useState(1)
  const [isSearch, setIsSearch] = useState(false)
  
  const params = useParams()
  useEffect(() => {
    getWords()
  }, [params.keyWord])

  const config = {
    method: "POST",
    body: JSON.stringify({"word": params.keyWord}),
    headers: {
        "Content-Type": "application/json"
    }
};

  const getWords = async() => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/words/search/?page=1`, config)
    const data = await res.json()
    console.log('data from search ==', data)
    if(data.status==="success"){
        setWords(data.data)
        setIsSearch(true)
    }
}

    // pagination
    const handlePageChange = async (pageNumber)=> {
      setActivePage(pageNumber);
      console.log(`active page is ${pageNumber}`);

      const res = await fetch(`${process.env.REACT_APP_SERVER}/words/?page=${pageNumber}`, config);
      const data = await res.json();
      setWords(data.data)
      setTotalResult(data.totalResult)
  }

    return ( words?
        <div>
          
      <SearchResultHeader words={words} setWords={setWords}/>
        <div className="d-flex justify-content-center">
            
            <div className="col-md-6 col-sm-12">
                
            <Words words={words} isSearch={isSearch} setWords={setWords} getWords={getWords}/>
                
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
        </div> : <div className="loader"></div>
    )
}
