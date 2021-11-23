import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import login from '../login';
import home from '../home';
import { AuthProvider } from '../../contexts/AuthContext';
import CreateTrees from "../CreateTrees";

describe("The Create Tree Page", () => {

    test("should render create tree page", () => {
        const {getByTestId} = render(
        <AuthProvider>
            <CreateTrees></CreateTrees>
        </AuthProvider>);
        expect(screen.getByTestId("CreateTreesTest")).toBeInTheDocument();
    });

    test("Upon click of add person, shows pop-up", () => {
        const {getByTestId} = render(
            <AuthProvider>
                <CreateTrees></CreateTrees>
            </AuthProvider>);
        fireEvent.click(getByTestId("add_person"));
        expect(screen.getByTestId("add_person_form")).toBeEnabled();
    });

    test("Go Back Home", () => {
        const {getByTestId} = render(
            <AuthProvider>
                <CreateTrees></CreateTrees>
            </AuthProvider>);
        fireEvent.click(getByTestId("goHome"));
        expect(screen.getByTestId("homeTest")).toBeInTheDocument();
    });

    test("Show the Family Tree Name popup", () => {
        const {getByTestId} = render(
            <AuthProvider>
                <CreateTrees></CreateTrees>
            </AuthProvider>);
        fireEvent.click(getByTestId("openName"));
        expect(screen.getByTestId("openNameTest")).toBeInTheDocument();
    });

    test("Show the Family Tree Name popup", () => {
        const {getByTestId} = render(
            <AuthProvider>
                <CreateTrees></CreateTrees>
            </AuthProvider>);
        fireEvent.click(getByTestId("openName"));
        expect(screen.getByTestId("openNameTest")).toBeInTheDocument();
    });

});