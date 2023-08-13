import {Button, Center, Heading, Input, VStack} from "@chakra-ui/react";
import {useState} from "react";
import CartItem, {ItemData, ServerSubscriptionsResponseType} from "../components/CartItem.tsx";
import {Subscriptions} from "../data.ts";

function CancelSubscription() {
    const [email, setEmail] = useState("")
    const [subscriptions, setSubscriptions] = useState<ItemData[]>([])

    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }

    const listSubscriptions = () => {

        fetch(process.env.VITE_SERVER_BASE_URL + "/subscriptions/list", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                customerEmail: email,
            })
        })
            .then(r => r.json())
            .then((r: ServerSubscriptionsResponseType[]) => {

                const subscriptionsList: ItemData[] = []

                r.forEach(subscriptionItem => {

                    let subscriptionDetails = Subscriptions.find(elem => elem.id === subscriptionItem.appProductId) || undefined

                    if (subscriptionDetails) {

                        subscriptionDetails = {
                            ...subscriptionDetails,
                            price: Number.parseInt(subscriptionItem.price) / 100,
                            stripeSubscriptionData: subscriptionItem,
                        }

                        subscriptionsList.push(subscriptionDetails)
                    } else {
                        console.log("Item not found!")
                    }
                })

                setSubscriptions(subscriptionsList)
            })

    }

    const removeSubscription = (id: string | undefined) => {
        const newSubscriptionsList = subscriptions.filter(elem => (elem.stripeSubscriptionData?.subscriptionId !== id))
        setSubscriptions(newSubscriptionsList)
    }

    return <>
        <Center h={'100vh'} color='black'>
            <VStack spacing={3} width={'xl'}>
                <Heading>Cancel Subscription Example</Heading>
                {(subscriptions.length === 0 ? <>
                    <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange}
                           value={email}/>
                    <Button onClick={listSubscriptions} colorScheme={'green'}>List Subscriptions</Button>
                </> : <></>)}
                {subscriptions.map(elem => {
                    return <CartItem data={elem} mode={'subscription'} onCancelled={() => removeSubscription(elem.stripeSubscriptionData?.subscriptionId)}/>
                })}
            </VStack>
        </Center>
    </>
}




export default CancelSubscription