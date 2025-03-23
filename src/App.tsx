import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "./pages/login/AuthScreen";
import UserProfile from "./pages/UserProfile";
import Footer from "./pages/Footer/Footer";
import Header from "./pages/Header/Header";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SearchPage from "./pages/SearchPage";
import CategoryList from "./pages/CategoryList";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AuthScreen />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categorySlug" element={<CategoryList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
