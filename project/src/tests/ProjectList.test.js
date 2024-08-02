import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Link } from 'react-router-dom'
import ProjectList from '../components/ProjectList'
import { timestamp } from '../firebase/firebase'
import {AuthContext} from '../context/AuthContext'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'

jest.mock('../components/Avatar', () => () => <div data-testid="avatar" />)



describe('ProjectList', () => {

    const AuthContextProvider = ({ children, value }) => {
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    }

    let mockProject, mockProjectId, mockUser;
   

    beforeEach(() => {
        // mockProject = { assignedUsersList: [
        //     { id: '123', photoURL: 'path/to/photo', displayName: 'John Doe' },
        //     { id: '456', photoURL: 'path/to/photo', displayName: 'Jane Smith' }
        // ]};
        // mockProjectId = 'abc';
        mockUser = { uid: '123' };
    });


  it('should display a message when there are no projects', () => {
    const { getByText } = render(
        <AuthContextProvider value={{ user: mockUser }}>
        <MemoryRouter>
    <ProjectList projects={[]} />
    </MemoryRouter>
    </AuthContextProvider>)
    expect(getByText('No projects')).toBeInTheDocument()
  })

  it('should display a list of projects', () => {
    const projects = [
      {
        id: '123',
        name: 'Test Project 1',
        dueDate: timestamp.fromDate(new Date("2018-07-22")),
        assignedUsersList: [{ id: '456', photoURL: 'test-photo-url' }],
      },
      {
        id: '789',
        name: 'Test Project 2',
        dueDate: timestamp.fromDate(new Date("2018-07-22")),
        assignedUsersList: [{ id: '101', photoURL: 'test-photo-url' }],
      },
    ]
    const { getByText, getAllByTestId } = render(
        <AuthContextProvider value={{ user: mockUser }}>
        <MemoryRouter>
    <ProjectList projects={projects} />
    </MemoryRouter>
    </AuthContextProvider>)
    expect(getByText('Test Project 1')).toBeInTheDocument()
    expect(getByText('Test Project 2')).toBeInTheDocument()
    expect(getAllByTestId('avatar').length).toBe(2)
  })

//   it('should navigate to the correct project page when a project is clicked', () => {
//     const projects = [
//       {
//         id: '123',
//         name: 'Test Project 1',
//         dueDate: timestamp.fromDate(new Date("2018-07-22")),
//         assignedUsersList: [{ id: '456', photoURL: 'test-photo-url' }],
//       },
//     ]
//     const { getByText } = render(
//         <AuthContextProvider value={{ user: mockUser }}>
//         <MemoryRouter>
//     <ProjectList projects={projects} />
//     </MemoryRouter>
//     </AuthContextProvider>)
//     const projectLink = getByTestId('project-link')

//     fireEvent.click(projectLink)

//     expect(projectLink.getAttribute('href')).toBe('/projects/123')
//   })

  

})