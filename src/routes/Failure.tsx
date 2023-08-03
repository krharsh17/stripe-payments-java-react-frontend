import {Button, Center, Heading, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Failure() {
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const onButtonClick = () => {
        navigate("/")
    }
    return <Center h={'100vh'} color='red'>
        <VStack spacing={3}>
            <Heading fontSize={'4xl'}>Failure!</Heading>
            <Text color={'black'}>{queryParams.toString().split("&").join("\n")}</Text>
            <Button onClick={onButtonClick} colorScheme={'red'}>Try Again</Button>
        </VStack>
    </Center>
}

export default Failure