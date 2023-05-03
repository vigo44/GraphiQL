import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Editor from './pages/editor/editor';
import NotFound from './pages/not-found/not-found';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Layout from './pages/layout';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="editor" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
