import React from "react";
import "../App.css";
import { Card } from "react-bootstrap";

export default function About(){

    return<div style={{marginTop: '2rem'}}>
    <Card style={{ maxWidth: '50rem', minWidth: '30rem', margin: '0 auto' }}>
        <div className='text-center'>
            <Card.Header><h3>About</h3></Card.Header>

            <p><br/>A basic <b>"Book Lister"</b> app created according to provided specifications.</p>
            <p>Features functionality for <b>CRUD</b> operations, but there is room for extensibility here (<b>eg.</b> search list, sort list, handle possible errors, database integration, save list to local state)</p>
            <p>Created using REACT and Express.</p>
            <p>HTTP requests are handled using the "Fetch API" though another option might be "axios."</p>
            <p>I appreciate the opportunity to participate in this assignment, and I hope to hear back! I am a constant learner, and if given the opportunity, I will always deliver code that is on spec, with beautiful design principles.</p>
            <p>If you would like to see another example of my front-end work, or just learn a bit about who I am, please take a look at <a href="https:/www.frankbotos.ca" target="_blank">my website</a></p>
            <p>Thanks! And enjoy browsing the application/code!</p>
            <br/>


        </div>
    </Card>
    </div>
}