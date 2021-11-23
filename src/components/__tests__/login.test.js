import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import SignInOutContainer from '../../containers/index';
import { AuthProvider } from '../../contexts/AuthContext';

describe("The Login Page", () => {

    test("should render the login page", () => {
        const {getByTestId} = render(<AuthProvider>
            <SignInOutContainer></SignInOutContainer></AuthProvider>);
        expect(screen.getByTestId("LoginTest")).toBeInTheDocument();
    });

    test("The submit button when no information is in should provide a message", () => {
        const {getByTestId} = render(<SignInOutContainer></SignInOutContainer>);
        fireEvent.click(getByTestId("LoginButton"));
        expect(screen.getByTestId("login")).toHaveTextContent("Please fill out this field.");
    });
});