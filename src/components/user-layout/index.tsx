import Footer from '@components/Footer';
import Header from '@components/Header';
import CartContextProvider from '@contexts/CartContext';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <CartContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartContextProvider>
    </div>
  );
};

export default UserLayout;
