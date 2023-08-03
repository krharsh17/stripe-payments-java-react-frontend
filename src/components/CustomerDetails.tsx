import {ItemData} from "./CartItem.tsx";
import {Button, Input, VStack} from "@chakra-ui/react";
import {useState} from "react";

function CustomerDetails(props: CustomerDetailsProp) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value)
    }

    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }

    const initiatePayment = () => {
        console.log("Sending request iwth the following objectL " + JSON.stringify({
            items: props.data.map(elem => ({name: elem.name, id: elem.id})),
            customerName: name,
            customerEmail: email,
            isInvoiceNeeded: true
        }))

        fetch(props.serverUrl, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: props.data.map(elem => ({name: elem.name, id: elem.id})),
                customerName: name,
                customerEmail: email,
                invoiceNeeded: true
            })
        })
            .then(r => r.text())
            .then(r => {
                window.location.href = r
            })

    }

    return <>
        <VStack spacing={3} width={'xl'}>
            <Input variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange} value={name}/>
            <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange} value={email}/>
            <Button onClick={initiatePayment} colorScheme={'green'}>Checkout</Button>
        </VStack>
    </>
}

interface CustomerDetailsProp {
    data: ItemData[]
    serverUrl: string
    mode: "checkout" | "subscription"
}

export default CustomerDetails