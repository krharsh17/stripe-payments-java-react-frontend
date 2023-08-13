import {Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useToast, VStack} from "@chakra-ui/react";

function CartItem(props: CartItemProps) {

    // Add this hook call and the cancelSubscription method to cancel the selected subscription
    const toast = useToast()
    const cancelSubscription = () => {

        fetch(process.env.VITE_SERVER_BASE_URL + "/subscriptions/cancel", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                subscriptionId: props.data.stripeSubscriptionData?.subscriptionId
            })
        })
            .then(r => r.text())
            .then(() => {
                toast({
                    title: 'Subscription cancelled.',
                    description: "We've cancelled your subscription for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })


                if (props.onCancelled)
                    props.onCancelled()
            })
    }

    return <Card direction={{base: 'column', sm: 'row'}}
                 overflow='hidden'
                 width={'xl'}
                 variant='outline'>
        <Image
            objectFit='cover'
            maxW={{base: '100%', sm: '200px'}}
            src={props.data.image}
        />
        <Stack mt='6' spacing='3'>
            <CardBody>
                <VStack spacing={'3'} alignItems={"flex-start"}>
                    <Heading size='md'>{props.data.name}</Heading>
                    <VStack spacing={'1'} alignItems={"flex-start"}>
                        <Text>
                            {props.data.description}
                        </Text>
                        {(props.mode === "checkout" ? <Text>
                            {"Quantity: " + props.data.quantity}
                        </Text> : <></>)}
                    </VStack>
                    {(props.mode === "subscription" && props.data.stripeSubscriptionData ?
                        <VStack spacing={'1'} alignItems={"flex-start"}>
                            <Text>
                                {"Next Payment Date: " + props.data.stripeSubscriptionData.nextPaymentDate}
                            </Text>
                            <Text>
                                {"Subscribed On: " + props.data.stripeSubscriptionData.subscribedOn}
                            </Text>
                            {(props.data.stripeSubscriptionData.trialEndsOn ? <Text>
                                {"Free Trial Running Until: " + props.data.stripeSubscriptionData.trialEndsOn}
                            </Text> : <></>)}
                        </VStack> : <></>)}
                </VStack>

            </CardBody>

            <CardFooter>
                <VStack alignItems={'flex-start'}>
                    <Text color='blue.600' fontSize='2xl'>
                        {"$" + props.data.price}
                    </Text>
                    {/* <----------------------- Add this block ----------------------> */}
                    {(props.data.stripeSubscriptionData ?
                        <Button colorScheme={'red'} onClick={cancelSubscription}>Cancel Subscription</Button>
                        : <></>)}
                </VStack>
            </CardFooter>
        </Stack>
    </Card>
}

export interface ItemData {
    name: string
    price: number
    quantity: number
    image: string
    description: string
    id: string
    stripeSubscriptionData?: ServerSubscriptionsResponseType
}

interface CartItemProps {
    data: ItemData
    mode: "subscription" | "checkout"
    onCancelled?: () => void
}

export interface ServerSubscriptionsResponseType {
    appProductId : string
    nextPaymentDate : string
    price: string
    subscribedOn: string
    subscriptionId: string
    trialEndsOn: string
}

export default CartItem