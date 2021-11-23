import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import SignInOutContainer from '../../containers/index';


describe("The Login Page", () => {

    test("should render the login page", () => {
        const {getByTestId} = render(<SignInOutContainer></SignInOutContainer>);
        expect(getByTestId("LoginTest")).toBeInTheDocument();
    })

})