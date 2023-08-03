import {Button, Center, Heading, Input, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import CartItem, {ItemData} from "../components/CartItem.tsx";
import TotalFooter from "../components/TotalFooter.tsx";
import {Products} from '../data.ts'
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe, Stripe} from '@stripe/stripe-js';


function IntegratedCheckout() {

    const [items] = useState<ItemData[]>(Products)
    const [transactionClientSecret, setTransactionClientSecret] = useState("")
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value)
    }

    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }

    useEffect(() => {
        // Make sure to call `loadStripe` outside of a component’s render to avoid
        // recreating the `Stripe` object on every render.
        setStripePromise(loadStripe(process.env.VITE_STRIPE_API_KEY || ""));

    }, [])

    const createTransactionSecret = () => {
        fetch(process.env.VITE_SERVER_BASE_URL + "/checkout/integrated", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: items.map(elem => ({name: elem.name, id: elem.id})),
                customerName: name,
                customerEmail: email,
                invoiceNeeded: true
            })
        })
            .then(r => r.text())
            .then(r => {
                setTransactionClientSecret(r)
            })
    }


    return <>
        <Center h={'100vh'} color='black'>
            <VStack spacing='24px'>
                <Heading>Integrated Checkout Example</Heading>
                {items.map(elem => {
                    return <CartItem data={elem} mode={'checkout'}/>
                })}
                <TotalFooter total={30} mode={"checkout"}/>

                <Input variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange}
                       value={name}/>
                <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange}
                       value={email}/>
                <Button onClick={createTransactionSecret} colorScheme={'green'}>Initiate Payment</Button>


                {(transactionClientSecret === "" ?
                    <></>
                    : <Elements stripe={stripePromise} options={{clientSecret: transactionClientSecret}}>

                        <CheckoutForm/>
                    </Elements>)}
            </VStack>
        </Center>
    </>
}

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.VITE_CLIENT_BASE_URL + "/success",
            },
        });


        if (result.error) {
            console.log(result.error.message);
        }
    };

    return <>
        <VStack>
            <PaymentElement/>
            <Button colorScheme={'green'} disabled={!stripe} onClick={handleSubmit}>Pay</Button>
        </VStack>
    </>
}

export default IntegratedCheckout