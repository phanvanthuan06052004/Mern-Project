import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Banner from "../pages/home/Banner";
import Home from "../pages/home/Home";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <>
                    <Banner />
                    {/* <Home /> */}
                </>,
            },
            {
                path: "/orders",
                element: <div>Order</div>,
            },
            {
                path: "/about",
                element: <div>About</div>
            },

        ]
    },
]);

export default router;