import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage"
import CheckoutPage from "../pages/Books/CheckoutPage";
import BookDetail from "../pages/Books/BookDetail";
import CheckPermissionPage from "./checkPermissionPage";
import OrderPage from "../pages/Books/OrderPage";
import AdminLogin from "../components/AdminLogin";
import AdminRouterCheck from "./AdminRouterCheck";
import DashboardLayout from "../pages/Admin/DashboardLayout";
import Dashboard from "../pages/Admin/children/Dashboard";
import AddBook from "../pages/Admin/children/AddBook/AddBook";
import Management from "../pages/Admin/children/Management";
import EditBook from "../pages/Admin/children/EditBook";
import BookAll from "../pages/Books/BookAll";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <>
                    <Home />
                </>,
            },
            {
                path: "/orders",
                element: <OrderPage />
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <CheckPermissionPage><CheckoutPage /></CheckPermissionPage>
            },
            {
                path: "/book/:id",
                element: <BookDetail />
            },
            {
                path: "/book",
                element: <BookAll />
            }
        ]
    },
    {
        path: "/admin/login",
        element: <AdminLogin />
    },
    {
        path: "/admin",
        element: <AdminRouterCheck><DashboardLayout /></AdminRouterCheck>,
        children: [
            {
                path: "",
                element: <AdminRouterCheck><Dashboard/></AdminRouterCheck>
            },
            {
                path: "/admin/add-book",
                element: <AdminRouterCheck><AddBook/></AdminRouterCheck  >
            },
            {
                path: "/admin/edit-book/:id",
                element: <AdminRouterCheck><EditBook/></AdminRouterCheck >
            },
            {
                path: "/admin/manage-books",
                element: <AdminRouterCheck><Management/></AdminRouterCheck >
            }

        ]
    }
]);

export default router;