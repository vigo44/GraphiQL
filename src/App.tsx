import { Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Editor from './pages/editor/editor';
import NotFound from './pages/not-found/not-found';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Layout from './pages/layout';
import { CheckAuth } from './hooks/check-auth';
import './index.css';

function App() {
  const { isAuth } = CheckAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuth ? <Editor /> : <Navigate to="/sign-in" />} />
          <Route path="sign-in" element={!isAuth ? <SignIn /> : <Navigate to="/" />} />
          <Route path="sign-up" element={!isAuth ? <SignUp /> : <Navigate to="/" />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
