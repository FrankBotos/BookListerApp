import React from "react";
import "../App.css";

import { useEffect } from "react";
import { useState } from "react";

import { Table, Button, Modal } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Home(){
    const [books, setBooks] = useState([]);


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    //simliar to componentdidmount, this react hook is perfect for api call
    useEffect(() => {
        /*async function fetchData(){
        var url = process.env.REACT_APP_API_URL + '/books/getall';
        
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setBooks(data);
        }

        fetchData();*/

        const url = process.env.REACT_APP_API_URL + '/books/getall';
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                //console.log(json);
                setBooks(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        


        fetchData();

      },[setBooks]);
      
    const deleteBook = (bookid) => {

        


        fetch(process.env.REACT_APP_API_URL + '/books/getall/' + bookid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({id: bookid})
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))


        return (
            console.log("delete:" + bookid)
        );
    }

      
      

      /*var generateList = books.map(
        function(b){
          return <div key={b.id}>
              asdfsaf
          </div>
            
               
        }
      )*/

    const generateList = books.map((d) => (


        <tr key={d.id}>
            <td >{d.id}</td>
            <td >{d.title}</td>
            <td >{d.author}</td>
            <td >{d.year}</td>
            <td>
            
            <Link to={"/EditBook?id=" + d.id}><Button className="btn btn-warning" style={{marginRight: '1rem'}}>Edit Book</Button></Link>
                <Button className="btn btn-danger"  onClick={()=> {
                setModalData(d);
                setModalIsOpen(true);
              }}>Delete Book</Button>
                
            </td>
            
        </tr>
        
        
        
    ));


    



      return (
          <div>

              
              <div className="text-center">
              <Link to="/AddNew">
                  <Button variant='outline-primary' size='lg' style={{margin: '1rem'}}>Add New Book</Button>
              </Link>
              </div>
              
              
                  
                 
              

              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>#id</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Year</th>
                          <th className="text-muted"><b>Actions</b></th>
                      </tr>
                  </thead>
                  <tbody>

                      {/*JSON.stringify(books)*/}
                      {books?generateList : false}

                  </tbody>
              </Table>

              <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} style={{paddingTop: '15rem'}}>
                  <Modal.Body>
                  <div className="text-center">
                  <h4 className='text-muted'>You are about to delete:</h4> <h2>"{modalData.title}"</h2><hr/>
                      <p>Are you sure you want to delete this book?</p>
                      <Button className="btn btn-success" style={{margin: '0.25rem'}} onClick={() => {deleteBook(modalData.id); setModalIsOpen(false);window.location.reload(false);}}>Confirm</Button>
                     <Button className="btn btn-warning" style={{margin: '0.25rem'}} onClick={() => setModalIsOpen(false)}>Cancel</Button>
                  </div>
                  </Modal.Body>

                  

              </Modal>

              


        </div>
      )

}