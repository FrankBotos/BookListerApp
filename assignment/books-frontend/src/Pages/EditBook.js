import React from "react";
import "../App.css";

import { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import {  useNavigate } from "react-router-dom";

export default function EditBook() {

    const [book, setBook] = useState("");

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');


    var x = window.location.search;
    var params = new URLSearchParams(x);

    const navigate = useNavigate();

    //steps to take 
    //1. fetch data by id, save in state
    //2. set form default values to book values
    //3. handle input, update book via fetch
    //4. redirect to home

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + '/books/getall/' + params.get('id');
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                //console.log(json);
                setBook(json);

                //once we have our values, remember to initialize default form values in case user submits without changing fields
                setTitle(json.title);
                setId(json.id);
                setAuthor(json.author);
                setYear(json.year);

            } catch (error) {
                console.log("error", error);
            }
        };
        


        fetchData();

      },[setBook]);

      const redirectFunc = () => {
          navigate('/');
      }

      const handleSubmit = (e) => {
        e.preventDefault();//preventing refresh on submit


        const data = JSON.stringify({
            id: id,
            title: title,
            year: year,
            author: author
            
        });




        

        //console.log(data);

        const url = process.env.REACT_APP_API_URL + '/books/getall/' + params.get('id');
        fetch(url, {
            method: 'PUT', 
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
                <br /><br /><h3 className="text-center">Edit Book with ID:({params.get('id')}) </h3><br />

                <form onSubmit={handleSubmit}>


                    <div className='text-center' style={{ width:'25rem', margin: '0 auto' }}>
                        

                    <div className='form-group'>
                    <label><h5>Title:</h5></label>
                    <input
                        type="text"
                        className= "form-control text-center"
                        required
                        defaultValue={book.title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br/><br/>
                    </div>


                    <div className='form-group'>
                    <label><h5>Release Year:</h5></label>
                    <input
                        type="number"
                        className= "form-control text-center"
                        required
                        defaultValue={book.year}
                        onChange={(e) => setYear(e.target.value)}
                    /><br/><br/>
                    </div>


                    <div className='form-group'>
                    <label><h5>Author:</h5></label>
                    <input
                        type="text"
                        className= "form-control text-center"
                        required
                        defaultValue={book.author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    </div>

                    <div style={{margin: '3rem'}}>
                    <button className='btn btn-info btn-lg' style={{marginRight: '1.5rem'}}>Update Book</button>
                    <button className='btn btn-warning btn-lg' style={{marginLeft: '1.5rem'}} onClick={redirectFunc}>Cancel</button>
                    </div>
                   

                    </div>

                    
                </form>
                
                
            </Card>

    </>











    )
}