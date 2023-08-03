import {Button, Center, Heading, VStack} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()
    const navigateToIntegratedCheckout = () => {
        navigate("/integrated-checkout")
    }

    const navigateToHostedCheckout = () => {
        navigate("/hosted-checkout")
    }

    const navigateToNewSubscription = () => {
        navigate("/new-subscription")
    }

    const navigateToCancelSubscription = () => {
        navigate("/cancel-subscription")
    }

    const navigateToSubscriptionWithTrial = () => {
        navigate("/subscription-with-trial")
    }

    const navigateToViewInvoices = () => {
        navigate("/view-invoices")
    }

    return (
        <>
            <Center h={'100vh'} color='black'>
                <VStack spacing='24px'>
                    <Heading>Stripe Payments With React & Java</Heading>
                    <Button
                        colorScheme={'teal'}
                        onClick={navigateToIntegratedCheckout}>
                        Integrated Checkout
                    </Button>
                    <Button
                        colorScheme={'blue'}
                        onClick={navigateToHostedCheckout}>
                        Hosted Checkout
                    </Button>
                    <Button
                        colorScheme={'yellow'}
                        onClick={navigateToNewSubscription}>
                        New Subscription
                    </Button>
                    <Button
                        colorScheme={'purple'}
                        onClick={navigateToCancelSubscription}>
                        Cancel Subscription
                    </Button>
                    <Button
                        colorScheme={'facebook'}
                        onClick={navigateToSubscriptionWithTrial}>
                        Subscription With Trial
                    </Button>
                    <Button
                        colorScheme={'pink'}
                        onClick={navigateToViewInvoices}>
                        View Invoices
                    </Button>
                </VStack>
            </Center>
        </>
    )
}

export default Home
