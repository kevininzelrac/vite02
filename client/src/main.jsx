import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/header";
import Login, { loginAction } from "./routes/login/login";
import Modal from "./components/modal/modal";
import Navbar, { navbarLoader } from "./components/navbar/navbar";
import Page, { pageLoader } from "./routes/page/page";
import Posts, { postsLoader } from "./routes/posts/posts";
import { RouteError } from "./components/errors/errors";
import Dashboard from "./routes/dashboard/dashboard";
import Category, { categoryLoader } from "./routes/category/category";
import SinglePost, {
  singlePostAction,
  singlePostLoader,
} from "./routes/singlePost/singlePost";
import "./main.css";
import "./variables.css";
import "./animations.css";
import Parametres from "./routes/parametres/parametres";
import { saveAction } from "./routes/save/save";
import { likeAction } from "./routes/like/like";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Navbar />}
      id="navbar"
      loader={navbarLoader}
      errorElement={<RouteError />}
    >
      <Route index element={<Navigate to="Home" />} />

      <Route
        path=":page?/:page?/:page"
        id="page"
        element={<Page />}
        loader={pageLoader}
        errorElement={<RouteError />}
      >
        <Route path="Save" action={saveAction} />
        <Route element={<Modal />}>
          <Route path="Parametres" element={<Parametres />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Login" element={<Login />} action={loginAction} />
        </Route>
      </Route>

      <Route
        path="Blog"
        id="blog"
        element={<Posts />}
        loader={postsLoader}
        errorElement={<RouteError />}
      >
        <Route element={<Modal />}>
          <Route path="Parametres" element={<Parametres />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} action={loginAction} />
        </Route>
      </Route>
      <Route
        path="Blog/:category"
        id="category"
        element={<Category />}
        loader={categoryLoader}
        errorElement={<RouteError />}
      >
        <Route element={<Modal />}>
          <Route path="Parametres" element={<Parametres />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} action={loginAction} />
        </Route>
      </Route>
      <Route
        path="Blog/:category/:post"
        id="post"
        element={<SinglePost />}
        loader={singlePostLoader}
        action={singlePostAction}
        errorElement={<RouteError />}
      >
        <Route path="Like" action={likeAction} />
        <Route element={<Modal />}>
          <Route path="Parametres" element={<Parametres />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} action={loginAction} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);
