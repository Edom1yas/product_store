"use client"
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster"
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"", 
  });
const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    if (success){
    toaster.create({
      description: "Product Created Successfully",
      type: "success",
      closable: true,
    })
    }else{
       toaster.create({
      description: "Error Creating Product",
      type: "error",
      closable: true,
    })
    }

    //Testing Purpose
    console.log("Success:", success);
    console.log("Message:", message);

    setNewProduct({name:"", image:"", price:""});
  };
  return (
    <>
    <Toaster />
    <Container maxW={"container.sm"}>
    <VStack spacing={8}>
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Create New Product
      </Heading>

      <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
        <VStack spacing={4}>
          <Input
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />

          <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />

          <Input
            placeholder='Product Price'
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
          />

          <Button colorScheme={"blue"} onClick={handleAddProduct}>
            Add Product
          </Button>
        </VStack>
      </Box>


    </VStack>
    </Container>
    </>
  )
}

export default CreatePage