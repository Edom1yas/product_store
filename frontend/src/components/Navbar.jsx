"use client"
import { Button, Container, Flex, HStack, Text, 
  ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useColorMode, useColorModeValue } from "./ui/color-mode"
import { Link } from 'react-router-dom'
import { LuMoon, LuSun, LuPlus } from "react-icons/lu"


const Navbar = () => {
const { toggleColorMode, colorMode } = useColorMode()
const bg = useColorModeValue("red.500", "red.200")
const color = useColorModeValue("white", "gray.800")
  return (
    <Container maxW={"1140px"} px={4} bg={bg}>
      <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
          base:"column",
          sm:"row"

        }}
      >
        <Link to={"/"}>
          <Text
            fontSize={{base:"22", sm:"28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear-gradient({#B23D3b}, {#FF8A88})"} 
            bgClip={"text"}
          >
            Product Store
          </Text>
        </Link>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button color={color} variant="outline" size="sm">
              <LuPlus fontSize={20}  />
            </Button>
          </Link>
          
          <IconButton onClick={toggleColorMode} color={color}  variant="outline" size="sm">
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>

        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar