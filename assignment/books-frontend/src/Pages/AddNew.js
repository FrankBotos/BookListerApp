import React from "react";
import "../App.css";

import { useState } from "react";

import { Card } from "react-bootstrap";

import {  useNavigate } from "react-router-dom";

export default function AddNew() {
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');

    const navigate = useNavigate();
  



    const handleSubmit = (e) => {
        e.preventDefault();//preventing refresh on submit


        const data = JSON.stringify({
            id: id,
            title: title,
            year: year,
            author: author
            
        });




        

        //console.log(data);

        const url = process.env.REACT_APP_API_URL + '/books/getall/';
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(response => response)
            .then(data => {
                //console.log('Success:', data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });




    };





    return (
    <>
    <br/>
            <Card style={{ maxWidth: '50rem', minWidth: '30rem', margin: '0 auto' }}>
                <br /><br /><h3 className="text-center">Add New Book</h3><br />

                <form onSubmit={handleSubmit}>

                    




                    <div className='text-center' style={{ width:'25rem', margin: '0 auto' }}>
                        

                    <div className='form-group'>
                    <label><h5>Title:</h5></label>
                    <input
                        type="text"
                        className= "form-control text-center"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br/><br/>
                    </div>


                    <div className='form-group'>
                    <label><h5>ID:</h5></label>
                    <input
                        type="number"
                        className= "form-control text-center"
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    /><br/><br/>
                    </div>


                    <div className='form-group'>
                    <label><h5>Release Year:</h5></label>
                    <input
                        type="number"
                        className= "form-control text-center"
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    /><br/><br/>
                    </div>


                    <div className='form-group'>
                    <label><h5>Author:</h5></label>
                    <input
                        type="text"
                        className= "form-control text-center"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    </div>


                    <button className='btn btn-primary btn-lg' style={{margin: '3rem'}}>Add Book</button>
                    </div>

                    
                </form>
                
            </Card>

    </>
    )
}