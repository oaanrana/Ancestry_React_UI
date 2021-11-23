import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import SignInOutContainer from '../../containers/index';
import { AuthProvider } from '../../contexts/AuthContext';

describe("The Sign Up Page", () => {

    test("should render the sign up page", () => {
        const {getByTestId} = render(<AuthProvider>
            <SignInOutContainer></SignInOutContainer></AuthProvider>);
        expect(getByTestId("LoginTest")).toBeInTheDocument();
    });

    test("The submit button when no information is in should provide a message", () => {
        const {getByTestId} = render(<SignInOutContainer></SignInOutContainer>);
        fireEvent.click(getByTestId("LoginButton"));
        expect(getByTestId("login")).toHaveTextContent("Please fill out this field.");
    });

});