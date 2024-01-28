import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import HomePage from "./Pages/HomePage";
import MyBookings from "./Pages/MyBookings";
import MyHotels from "./Pages/MyHotels";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { ValidateUser } from "./Api/Actions/Auth";

const App = () => {
  const {loggedIn} = useAuthStore((s:any) => s)
 

  useEffect(()=>{
    const ValidateUserAccess = async () => {
      try {
        const data = await ValidateUser();
        if (data) {
          loggedIn({
            isAuthenticated: true,
            userDetails: data,
          });
        }
      } catch (error) {
        loggedIn({
          isAuthenticated: false,
          userDetails: {},
        });
      }
    };
    ValidateUserAccess()
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="search-page"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="mybookings"
          element={
            <Layout>
              <MyBookings />
            </Layout>
          }
        />
        <Route
          path="myhotels"
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
        />
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
