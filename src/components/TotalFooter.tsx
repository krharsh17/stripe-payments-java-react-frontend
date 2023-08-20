import {Divider, HStack, Text} from "@chakra-ui/react";

function TotalFooter(props: TotalFooterProps) {
    return <>
        <Divider />
        <HStack>
            <Text>Total</Text>
            <Text color='blue.600' fontSize='2xl'>
                {"$" + props.total}
            </Text>
        </HStack>
        {props.mode === "subscription" &&
            <Text fontSize={"xs"}>(Monthly, starting today)</Text>
            }
        {props.mode === "trial" &&
            <Text fontSize={"xs"}>(Monthly, starting next month)</Text>
            }
    </>
}

interface TotalFooterProps {
    total: number
    mode: "checkout" | "subscription" | "trial"
}

export default TotalFooter
