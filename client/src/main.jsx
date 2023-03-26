import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login, { loginAction } from "./routes/login/login";
import Modal from "./components/modal/modal";
import Page, { pageAction, pageLoader } from "./routes/page/page";
import Posts, { postsLoader } from "./routes/posts/posts";
import { RouteError } from "./components/errors/errors";
import Dashboard from "./routes/dashboard/dashboard";
import Category, { categoryLoader } from "./routes/category/category";
import Parametres, { paramsAction } from "./routes/parametres/parametres";
import SinglePost, {
  singlePostAction,
  singlePostLoader,
} from "./routes/singlePost/singlePost";
import "./main.css";
import "./variables.css";
import "./animations.css";
import Layout, { layoutLoader } from "./routes/layout/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      id="layout"
      loader={layoutLoader}
      errorElement={<RouteError />}
    >
      <Route index element={<Navigate to="Home" />} />

      <Route
        path=":page?/:page?/:page"
        id="page"
        element={<Page />}
        loader={pageLoader}
        action={pageAction}
        errorElement={<RouteError />}
      >
        <Route element={<Modal />}>
          <Route
            path="Parametres"
            element={<Parametres />}
            action={paramsAction}
          />
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
          <Route
            path="Parametres"
            element={<Parametres />}
            action={paramsAction}
          />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Login" element={<Login />} action={loginAction} />
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
          <Route
            path="Parametres"
            element={<Parametres />}
            action={paramsAction}
          />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Login" element={<Login />} action={loginAction} />
        </Route>
      </Route>

      <Route
        path="Blog/:category/:post/"
        element={<SinglePost />}
        loader={singlePostLoader}
        action={singlePostAction}
        errorElement={<RouteError />}
      >
        <Route element={<Modal />}>
          <Route
            path="Parametres"
            element={<Parametres />}
            action={paramsAction}
          />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Login" element={<Login />} action={loginAction} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
