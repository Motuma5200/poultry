import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginsignUp from './pages/LoginSignUp';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductCategory from './pages/ProductCategory';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import PaymentPage from './components/payment/PaymentPage';
import Footer from './components/footer/Footer';
import meat_banner from './components/Asset/meat_banner.png';
import egg_banner from './components/Asset/egg_banner.png';
import tool_banner from './components/Asset/tool_banner.png';
import Banner from './components/Asset/Banner';

function App() {
  const banners = [meat_banner, egg_banner, tool_banner];

  return (
    <div className="App">
      <BrowserRouter>
         {/*<Banner/>*/}
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          {/* Meat Category */}
          <Route path="/meat" element={<ProductCategory banner={banners} category="meat" />} />
          <Route path="/meat/live-chicken" element={<ProductCategory banner={banners} category="meat" subCategory="live chicken" />} />
          <Route path="/meat/fresh-meat" element={<ProductCategory banner={banners} category="meat" subCategory="fresh meat" />} />
          <Route path="/meat/cooked-meat" element={<ProductCategory banner={banners} category="meat" subCategory="cooked meat" />} />

          {/* Eggs Category */}
          <Route path="/eggs" element={<ProductCategory banner={banners} category="egg" />} />
          <Route path="/eggs/fresh-eggs" element={<ProductCategory banner={banners} category="egg" subCategory="fresh egg" />} />
          <Route path="/eggs/live-chicken" element={<ProductCategory banner={banners} category="egg" subCategory="live chicken" />} />
          <Route path="/eggs/products-of-egg" element={<ProductCategory banner={banners} category="egg" subCategory="product of egg" />} />

          {/* Tools Category */}
          <Route path="/tools" element={<ProductCategory banner={banners} category="tool" />} />
          <Route path="/tools/feeder" element={<ProductCategory banner={banners} category="tool" subCategory="feeder" />} />
          <Route path="/tools/drinker" element={<ProductCategory banner={banners} category="tool" subCategory="drinker" />} />
          <Route path="/tools/incubators" element={<ProductCategory banner={banners} category="tool" subCategory="breeder" />} />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/signup" element={<LoginsignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/payment' element = {<PaymentPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;