import React from 'react'
import Navbar from './Navbar'

export default function about() {

    return (
        <div>
            <Navbar/>
            <head>
                <title>About Us</title>
            </head>
            <body>
                <h1>About Us</h1>
                <p>
                    This website was developed by three undergraduate students from George Mason University Oaan Rana, Tejul Maan, and Dmitrii Korennoi. This was initially done as part of a semester-long project for one of their Computer Science classes: CS 321. Despite this website's academic and minimalistic origins, we hope to share the benefits of this software we have designed with users like you.
                </p>
                <p>
                    In the future, we hope to maintain and expand this webpage's capabilities.
                </p>
                <p>
                    If you need to contact us regarding this website, please send an email to 
                    <a href="mailto:CS321.DL5.Group4@gmail.com">CS321.DL5.Group4@gmail.com</a>
                </p>
            </body>
        </div>
    )
}
