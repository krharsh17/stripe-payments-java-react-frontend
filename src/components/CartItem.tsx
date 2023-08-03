import {Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useToast, VStack} from "@chakra-ui/react";
import {ServerSubscriptionsResponseType} from "../routes/CancelSubscription.tsx";

function CartItem(props: CartItemProps) {

    const toast = useToast()
    const cancelSubscription = () => {
        console.log(props.data.stripeSubscriptionData?.subscriptionId)

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

                    <VStack spacing={'1'} alignItems={"flex-start"}>
                        {(props.data.stripeSubscriptionData ? <Text>
                            {"Next Payment Date: " + props.data.stripeSubscriptionData.nextPaymentDate}
                        </Text> : <></>)}
                        {(props.data.stripeSubscriptionData ? <Text>
                            {"Subscribed On: " + props.data.stripeSubscriptionData.subscribedOn}
                        </Text> : <></>)}
                        {(props.data.stripeSubscriptionData && props.data.stripeSubscriptionData.trialEndsOn ? <Text>
                            {"Free Trial Running Until: " + props.data.stripeSubscriptionData.trialEndsOn}
                        </Text> : <></>)}
                    </VStack>
                </VStack>

            </CardBody>

            <CardFooter>
                <VStack alignItems={'flex-start'}>
                <Text color='blue.600' fontSize='2xl'>
                    {"$" + props.data.price}
                </Text>
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

export default CartItem