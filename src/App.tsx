import Home from "./routes/Home.tsx";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import HostedCheckout from "./routes/HostedCheckout.tsx";
import Success from "./routes/Success.tsx";
import Failure from "./routes/Failure.tsx";
import NewSubscription from "./routes/NewSubscription.tsx";
import SubscriptionWithTrial from "./routes/SubscriptionWithTrial.tsx";
import CancelSubscription from "./routes/CancelSubscription.tsx";
import ViewInvoices from "./routes/ViewInvoices.tsx";
import IntegratedCheckout from "./routes/IntegratedCheckout.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home/>
            ),
        },
        {
            path: "/hosted-checkout",
            element: (
                <HostedCheckout/>
            )
        },

        {
            path: '/integrated-checkout',
            element: (
                <IntegratedCheckout/>
            )
        },
        {
            path: '/success',
            element: (
                <Success/>
            )
        },
        {
            path: '/failure',
            element: (
                <Failure/>
            )
        },
        {
            path: '/new-subscription',
            element: (
                <NewSubscription/>
            )
        },

        {
            path: '/subscription-with-trial',
            element: (
                <SubscriptionWithTrial/>
            )
        },

        {
            path: '/cancel-subscription',
            element: (
                <CancelSubscription/>
            )
        },

        {
            path: '/view-invoices',
            element: (
                <ViewInvoices/>
            )
        }

    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
