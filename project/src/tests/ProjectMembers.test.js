import React from 'react';
import { createContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProjectMembers from '../components/ProjectMembers';
import {AuthContext} from '../context/AuthContext'
import { MemoryRouter } from 'react-router-dom';
// import { AuthContextProvider } from '../context/AuthContext';

describe('ProjectMembers component', () => {
    let mockProject, mockProjectId, mockUser;
    const AuthContextProvider = ({ children, value }) => {
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    }

    beforeEach(() => {
        mockProject = { assignedUsersList: [
            { id: '123', photoURL: 'path/to/photo', displayName: 'John Doe' },
            { id: '456', photoURL: 'path/to/photo', displayName: 'Jane Smith' }
        ]};
        mockProjectId = 'abc';
        mockUser = { uid: '123' };
    });

    it('renders without crashing', () => {
        const { container } = render(
        <AuthContextProvider value={{ user: mockUser }}>
        <MemoryRouter>
        <ProjectMembers project={mockProject} projectid={mockProjectId} />
        </MemoryRouter>
        </AuthContextProvider>);
        expect(container).toBeTruthy();
    });

    it('renders the correct number of project members', () => {
        const { getAllByTestId } = render(
        <AuthContextProvider value={{ user: mockUser }}>
        <MemoryRouter>
        <ProjectMembers project={mockProject} projectid={mockProjectId} />
        </MemoryRouter>
        </AuthContextProvider>);
        expect(getAllByTestId('project-member')).toHaveLength(2);
    });

    

    it('does not render a "Add member" button if user is not the creator of the project', () => {
        mockUser.uid = '789';
        const { queryByText } = render(
            <AuthContextProvider value={{ user: mockUser }}>
            <MemoryRouter>
            <ProjectMembers project={mockProject} projectid={mockProjectId} user={mockUser} />
            </MemoryRouter>
            </AuthContextProvider>);
        expect(queryByText('Add member')).toBeNull();
    });

    
});