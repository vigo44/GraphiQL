import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

function Layout() {
  return (
    <>
      <Header />
      <main className="wrapperMain">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
