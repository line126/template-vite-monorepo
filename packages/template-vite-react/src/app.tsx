import { convention_routes } from '~convention-routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(convention_routes)} />
    </>
  );
}

export default App;
