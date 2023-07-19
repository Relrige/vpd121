import React,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CategoryCreatePage from "./components/category/create/CategoryCreate";
import {Route, Routes} from "react-router-dom";
import CategoryListPage from "./components/category/list/CategoryListPage";
import CategoryEditPage from "./components/category/edit/CategoryEditPage";

import ProductDetailsPage from "./components/product/details/ProductDetailsPage";
import ProductListPage from "./components/product/list/ProductListPage";
import ProductEditPage from "./components/product/edit/ProductEditPage";
import ProductCreatePage from "./components/product/create/ProductCreatePage";
import AddPicturePage from "./components/product/create/addPicture/AddPicturePage";
import {Layout} from "./components/Layout";

function App() {


  return (
   <>
       <Routes>
           <Route path={"/"} element={<Layout/>}>
               <Route index element={<ProductListPage/>}/>
               <Route path={"product"}>
                   <Route path={"details/:id"} element={<ProductDetailsPage/>}/>
                   <Route path={"create"} element={<ProductCreatePage/>}/>
                   <Route path={"edit/:id"} element={<ProductEditPage/>}/>
                   <Route path={"addPicture/:id"} element={<AddPicturePage/>}/>
               </Route>

               <Route path={"category"}>
               <Route path={"all"} element={<CategoryListPage/>}/>
               <Route path={"create"} element={<CategoryCreatePage/>}/>
               <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
           </Route>
           <Route path="*" element={<h1 className={"text-center"}>Page Not Found!</h1>}/>
               <Route index element={<CategoryListPage/>}/>


           </Route>
       </Routes>
   </>
  );
}

export default App;


/*<Route path={"/category"}>
    <Route path={"create"} element={<CategoryCreatePage/>}/>
    <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
</Route>*/