"use client"
import { Box, Heading, IconButton, HStack, Image, Text, Dialog, Stack, Button, Field, Input, Portal } from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue  } from "../components/ui/color-mode"
import { LuPen, LuTrash } from 'react-icons/lu';
import { useProductStore } from '../store/product';
import { toaster, Toaster } from './ui/toaster';


const ProductCard = ({product}) => {
    const {deleteProduct, updateProduct} = useProductStore();
      const [updatedProduct, setUpdatedProduct] = useState({
          name: product.name,
          price: product.price,
          image: product.image
      }); 
      const handleDeleteProduct = async (productID) =>{
          const {success, message} = await deleteProduct(productID);
          console.log("success:",success);
            if(!success){
                toaster.create({
                    description:message,
                    type:"error",
                    closable:true,
                })
            }else{
                toaster.create({
                    description:message,
                    type:"success",
                    closable:true
                })
            }
        }
    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);
        if (!success) {
            toaster.create({
                description: message,
                type: "error",
                closable: true,

            })
        } else {
            toaster.create({
                description: "Product updated successfully",
                type: "success",
                closable: true

            })
        }
    }
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800")  
    
    return (
        <>
            <Toaster />
            <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{transform:"translateY(-5px)", shadow: "x1"}}
            bg={bg}
            >
                <Image src={product.image} alt={product.name} h={48} w="full" objectFit={'cover'}/>
                <Box p={4}>
                        <Heading as='h3' size='md' mb={2}>
                            {product.name}
                        </Heading>

                        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                            ${product.price}
                        </Text>

                        <HStack spacing={2}>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <IconButton colorScheme='blue'>
                                        <LuPen />
                                    </IconButton>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content>
                                            <Dialog.CloseTrigger />
                                            <Dialog.Header>
                                                <Dialog.Title>Edit {product.name}</Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body>
                                                <Stack gap="4">
                                                    <Field.Root>
                                                        <Field.Label>Name</Field.Label>
                                                        <Input 
                                                            value={updatedProduct.name}
                                                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                                                        />
                                                    </Field.Root>
                                                    <Field.Root>
                                                        <Field.Label>Image</Field.Label>
                                                        <Input 
                                                            value={updatedProduct.image}
                                                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                                                        />
                                                    </Field.Root>
                                                    <Field.Root>
                                                        <Field.Label>Price</Field.Label>
                                                        <Input 
                                                            value={updatedProduct.price}
                                                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                                                        />
                                                    </Field.Root>
                                                </Stack>
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                                <Dialog.ActionTrigger asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </Dialog.ActionTrigger>
                                                <Dialog.ActionTrigger asChild>
                                                    <Button onClick={handleUpdateProduct}>Save</Button>
                                                </Dialog.ActionTrigger>   
                                            </Dialog.Footer>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>

                            <IconButton colorScheme='red' onClick={() => handleDeleteProduct(product._id)}>
                                <LuTrash/>
                            </IconButton>
                        </HStack>
                    </Box>
            </Box>
        </>
    )
}

export default ProductCard