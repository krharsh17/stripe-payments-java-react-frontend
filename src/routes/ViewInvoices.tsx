import {Button, Card, Center, Heading, HStack, IconButton, Input, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {DownloadIcon} from "@chakra-ui/icons";

function ViewInvoices() {
    const [email, setEmail] = useState("")
    const [invoices, setInvoices] = useState<InvoiceData[]>([])

    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }

    const listInvoices = () => {

        fetch(process.env.VITE_SERVER_BASE_URL + "/invoices/list", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                customerEmail: email,
            })
        })
            .then(r => r.json())
            .then((r: InvoiceData[]) => {
                setInvoices(r)
            })

    }

    return <>
        <Center h={'100vh'} color='black'>
            <VStack spacing={3} width={'xl'}>
                <Heading>View Invoices for Customer</Heading>
                {(invoices.length === 0 ? <>
                    <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange}
                           value={email}/>
                    <Button onClick={listInvoices} colorScheme={'green'}>Look up Invoices</Button>
                </> : <></>)}
                {invoices.map(elem => {
                    return <Card direction={{base: 'column', sm: 'row'}}
                                 overflow='hidden'
                                 alignItems={'center'}
                                 justifyContent={'space-between'}
                                 padding={'8px'}
                                 width={500}
                                 variant='outline'>
                        <Text>
                            {elem.number}
                        </Text>
                        <HStack spacing={"3"}>
                            <Text color='blue.600' fontSize='2xl'>
                                {"$" + elem.amount}
                            </Text>
                            <IconButton onClick={() => {
                                window.location.href = elem.url
                            }} icon={<DownloadIcon/>} aria-label={'Download invoice'}/>
                        </HStack>
                    </Card>
                })}
            </VStack>
        </Center>
    </>
}

interface InvoiceData {
    number: string,
    amount: string,
    url: string
}


export default ViewInvoices