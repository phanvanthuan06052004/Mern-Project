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
import AddBook from "../pages/Admin/children/AddBook";
import Management from "../pages/Admin/children/Management";
import EditBook from "../pages/Admin/children/EditBook";
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
                element: <CheckPermissionPage><OrderPage /></CheckPermissionPage>,
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
                element: <adminRouter><Dashboard/></adminRouter>
            },
            {
                path: "/admin/add-book",
                element: <adminRouter><AddBook/></adminRouter  >
            },
            {
                path: "/admin/edit-book/:id",
                element: <adminRouter><EditBook/></adminRouter >
            },
            {
                path: "/admin/manage-books",
                element: <adminRouter><Management/></adminRouter >
            }

        ]
    }
]);

export default router;