import React, { useEffect } from 'react';
import {Container, VStack, Text, SimpleGrid} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';


const HomePage = () => {
 const {fetchProducts, products} = useProductStore();
 useEffect(() => {
  fetchProducts();
 }, [fetchProducts]);
 console.log("products :", products);
  return (
    <Container>
      <VStack>
        <Text
        fontSize={"xl"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear-gradient({#B23D3b}, {#FF8A88})"} 
        bgClip={"text"}
        >
          Current Products
        </Text>
        <SimpleGrid column={[1,2,3]} gap={10} w={"full"}>
          {products.map((product) =>
            <ProductCard key={product._id} product={product}/>
          )}
        </SimpleGrid>
        {
          products.length === 0 && (
            <Text
        fontSize={"30"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        color={"gray.500"}
        >
          No Products Found {" "}
          <Link to={"/create"}>
            <Text as="span" color="blue.500" _hover={{textDecoration:"underline"}}>
              Create Product
            </Text>
          </Link>
        </Text>
          )
        }
      </VStack>
    </Container>
  )
};

export default HomePage