import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import SignInOutContainer from '../../containers/index';
import { AuthProvider } from '../../contexts/AuthContext';

describe("The Navbar", () => {

    test("The Navigation Bar should be rendering", () => {
        const {getByTestId} = render(<AuthProvider>
            <Home></Home></AuthProvider>);
        expect(screen.getByTestId("LoginTest")).toBeInTheDocument();
    });

    test("Should render the FAQ page", () => {
        const {getByTestId} = render(<AuthProvider>
            <Home></Home></AuthProvider>);
        fireEvent.click(getByTestId("FAQs"));
        expect(screen.getByTestId("faq_test")).toBeInTheDocument();
    });

    test("Should render the FAQ page", () => {
        const {getByTestId} = render(<AuthProvider>
            <Home></Home></AuthProvider>);
        fireEvent.click(getByTestId("About Us"));
        expect(screen.getByTestId("about_test")).toBeInTheDocument();
    });

});