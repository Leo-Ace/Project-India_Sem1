import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/layouts/MainComponent';
import Home from './components/pages/Home/Home';
import Shop from './components/pages/Shop/Shop';
import FAQs from './components/pages/FAQs/FAQs';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import FormLoginRegister from './components/pages/Login_Register/Login_Register';
import Favourite from './components/pages/Favourite/Favourite';
import Cart from './components/pages/Cart/Cart';
import DetailProduct from './components/pages/DetailProduct/DetailProduct';
import Checkout from './components/pages/Checkout/checkout';
import Search from './components/pages/Search/Search';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainComponent children={<Home />} />} />
      <Route path={'/shop'} element={<MainComponent children={<Shop />} />} />
      <Route path={'/about'} element={<MainComponent children={<About />} />} />
      <Route path={'/contact'} element={<MainComponent children={<Contact />} />} />
      <Route path={'/faqs'} element={<MainComponent children={<FAQs />} />} />
      <Route path={'/login'} element={<MainComponent children={<FormLoginRegister />} />} />
      <Route path={'/register'} element={<MainComponent children={<FormLoginRegister />} />} />
      <Route path={'/favourite'} element={<MainComponent children={<Favourite />} />} />
      <Route path={'/shop/cart'} element={<MainComponent children={<Cart />} />} />
      <Route path={'/shop/checkout'} element={<MainComponent children={<Checkout />} />} />
      <Route path={'/shop/detail/:id'} element={<MainComponent children={<DetailProduct />} />} />
      <Route path={'/search'} element={<MainComponent children={<Search />} />} />
    </Routes>
  );
}

export default App;
