import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import UserView from './components/HomePage/UserView';
import PatientView from './components/HomePage/PatientView';
import CreateUserTypePage from './components/CreateUserTypes/CreateUserTypePage';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <UserView/>
      },
      {
        path: '/patients/:patientId',
        element: <PatientView/>
      },
      {
        path: '/continue',
        element: <CreateUserTypePage/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
