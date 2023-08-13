import {Center, Heading, VStack} from "@chakra-ui/react";
import {useState} from "react";
import CartItem, {ItemData} from "../components/CartItem.tsx";
import TotalFooter from "../components/TotalFooter.tsx";
import CustomerDetails from "../components/CustomerDetails.tsx";
import {Subscriptions} from "../data.ts";

function NewSubscription() {
    const [items] = useState<ItemData[]>(Subscriptions)
    return <>
        <Center h={'100vh'} color='black'>
            <VStack spacing='24px'>
                <Heading>New Subscription Example</Heading>
                {items.map(elem => {
                    return <CartItem data={elem} mode={'subscription'}/>
                })}
                <TotalFooter total={4.99} mode={"subscription"}/>
                <CustomerDetails data={items} endpoint={"/subscriptions/new"}/>
            </VStack>
        </Center>
    </>
}

export default NewSubscription