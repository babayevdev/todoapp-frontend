import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, useNavigate, useMatch, useRoutes } from 'react-router-dom';
import router from './routes';
import store from './redux/store';
// import Header from './components/common/Header';
import Footer from './components/Footer';
import Header from './components/Header';
import { signout } from './services/authService';

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-row my-2">
          <RouterProvider router={router} />
        </main>
        <Footer onSignout={signout} />
      </div>
    </Provider>
  );
}

export default App;
