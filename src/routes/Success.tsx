import {Button, Center, Heading, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Success() {
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const onButtonClick = () => {
        navigate("/")
    }
    return <Center h={'100vh'} color='green'>
        <VStack spacing={3}>
            <Heading fontSize={'4xl'}>Success!</Heading>
            <Text color={'black'}>{queryParams.toString().split("&").join("\n")}</Text>
            <Button onClick={onButtonClick} colorScheme={'green'}>Go Home</Button>
        </VStack>
    </Center>
}

export default Success