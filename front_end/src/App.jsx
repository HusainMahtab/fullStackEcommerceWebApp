import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import AllProducts from './pages/AllProducts';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import Context from './context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AddToCartProducts from './Components/AddToCartProducts';
import SearchProduct from './pages/SearchProduct';

function App() {
  const dispatch = useDispatch();
  const [countAddtoCartProduct,setCountAddToCartProduct]=useState(0)
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(
        `https://fullstackecommercewebapp.onrender.com/api/v1/users/profile`,
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      dispatch(setUserDetails(response.data.data));
      //console.log("response",response)
    } catch (error) {
      console.log("error while fetching user details", error?.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // count addTCart Product
  const countAddToCartItem=async()=>{
    try {
     const response=await axios.get(`https://fullstackecommercewebapp.onrender.com/api/v1/users/count_addtocart_product`,{withCredentials:true})
     console.log("count add to cart product",response.data.data)
     setCountAddToCartProduct(response?.data?.data)
    } catch (error) {
       console.error("error while fetched count add to cart product",error)
    }
 }
   useEffect(()=>{
      countAddToCartItem()
   },[])

  return (
    <Context.Provider value={{ 
      fetchUserDetails,  // current userDetails
      countAddtoCartProduct,  // current user addToCart product count
      countAddToCartItem   // function when we need to call again
       }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path='/admin_panel' element={<AdminPanel/>}/>
              <Route path="/admin_panel" element={<AdminPanel />}>
                <Route path="all_users" element={<AllUsers />} />
                <Route path="all_product" element={<AllProducts />} />
              </Route>
              <Route path='/product_category' element={<CategoryPage/>}/>
              <Route path='/product/:_id' element={<ProductDetails/>}/>
              <Route path='/addToCart-products' element={<AddToCartProducts/>}/>
              <Route path='/search-products' element={<SearchProduct/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
