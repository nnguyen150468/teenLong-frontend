import React, {useState, useEffect} from 'react'
import UserStats from '../components/UserStats'
import Words from '../components/Words'
import Pagination from "react-js-pagination";

export default function MyProfilePage(props) {
    const [words, setWords] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalResult, setTotalResult] = useState(1)
    const [user, setUser] = useState(null)

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

    const getWords = async()=>{
            const res = await fetch(`${process.env.REACT_APP_SERVER}/users/me?page=${activePage}`, config)
            const data = await res.json()
            if(data.status==="success"){
                console.log('success my profile', data)
                setWords(data.data)
                setUser(data.user)
            }
        }

        // pagination
    const handlePageChange = async (pageNumber)=> {
        setActivePage(pageNumber);
        console.log(`active page is ${pageNumber}`);

        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/me?page=${pageNumber}`, config);
        const data = await res.json();
        console.log('paginated data:', data);
        setWords(data.data)
        setTotalResult(data.totalResult)
    }

    return (
        <div>
            My Profile
            {props.user? props.user.name : ""}
            <UserStats user={props.user} />
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
