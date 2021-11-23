import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import SignInOutContainer from '../../containers/index';
import { AuthProvider } from '../../contexts/AuthContext';
import CreateTrees from "../CreateTrees";

describe("The Home Page", () => {

    test("should render home page", () => {
        const {getByTestId} = render(
        <AuthProvider>
            <Home></Home>
        </AuthProvider>);
        expect(screen.getByTestId("homeTest")).toBeInTheDocument();
    });

    test("Upon Click of the Create Trees Button, shows that page", () => {
        const {getByTestId} = render(
        <AuthProvider>
            <Home></Home>
        </AuthProvider>);
        fireEvent.click(getByTestId("create_tree_button"));
        expect(screen.getByTestId("CreateTreesTest")).toBeInTheDocument();
    });

    test("Testing Logout button", () => {
        const {getByTestId} = render(
        <AuthProvider>
            <Home></Home>
        </AuthProvider>);
        fireEvent.click(getByTestId("logoutTest"));
        expect(screen.getByTestId("LoginTest")).toBeInTheDocument();
    });
});