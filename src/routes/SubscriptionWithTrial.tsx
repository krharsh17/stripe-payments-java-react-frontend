import {Center, Heading, VStack} from "@chakra-ui/react";
import {useState} from "react";
import CartItem, {ItemData} from "../components/CartItem.tsx";
import TotalFooter from "../components/TotalFooter.tsx";
import CustomerDetails from "../components/CustomerDetails.tsx";
import {Subscriptions} from "../data.ts";

function SubscriptionWithTrial() {
    const [items] = useState<ItemData[]>(Subscriptions)
    return <>
        <Center h={'100vh'} color='black'>
            <VStack spacing='24px'>
                <Heading>New Subscription With Trial Example</Heading>
                {items.map(elem => {
                    return <CartItem data={elem} mode={'subscription'}/>
                })}
                <TotalFooter total={4.99} mode={"trial"}/>
                <CustomerDetails data={items} serverUrl={process.env.VITE_SERVER_BASE_URL + "/subscriptions/trial"}
                                 mode={"subscription"}/>
            </VStack>
        </Center>
    </>
}

export default SubscriptionWithTrial