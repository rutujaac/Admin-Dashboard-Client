import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {

    const [records, setRecords] = useState([])
    const context = useContext(UserContext)

    useEffect(async () => {
        await axios.get("http://localhost:3000/records/get", {
            headers: {
              'Authorization': `token ${context.token}`
            }
          })
        .then(result => {
                setRecords(result.data)
        
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div>
           <table className="table">
               <thead className="thead-dark">
                   <tr className="record-row color-title">
                        <th scope="col" className="header-title">Sr. No.</th>
                        <th scope="col" className="header-title">Database ID</th>
                        <th scope="col">Location</th>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Severity</th>
                        <th scope="col"></th>
                   </tr>
               </thead>
               <tbody>
                    {records.map((record, key) => {
                        {console.log(record._id)}
                        return (
                            <tr class="record-row" key={key}>
                            <th scope="row">{key+1}</th>
                            <th scope="row">{record._id}</th>
                            <td>{record.location}</td>
                            <td>{record.date}</td>
                            <td>{record.severity}</td>
                            <td></td>
                            </tr>
                        )   
                    })}
                </tbody>
           </table>
        </div>
    )
}

export default Home
