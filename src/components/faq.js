import React from 'react'
import Navbar from './Navbar'

export default function faq() {

    return (
        <div data-testid="faq_test">
            <Navbar/>
                <head>
                    <title>FAQ</title>
                </head>
                <h1>Frequently Asked Questions</h1>
                <pre>
            <b>Q:</b> What is the purpose of this website?
            <b>A:</b> To help users create and display a family tree.
                </pre>
                <pre>
            <b>Q:</b> Does this website collect any of my personal information?
            <b>A:</b> We do store personal information so that it can be accessed by you, the user, at a future time.
                </pre>
                <pre>
            <b>Q:</b> Does this website mine any of my personal data?
            <b>A:</b> No.
                </pre>
                <pre>
            <b>Q:</b> What do I do if something goes wrong with the website?
            <b>A:</b> If you encounter any potential errors, or the website acts in a way you were not expecting, please contact us at <a href="mailto:CS321.DL5.Group4@gmail.com">CS321.DL5.Group4@gmail.com</a>
                </pre>
        </div>
    )
}
