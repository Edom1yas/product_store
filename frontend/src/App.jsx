"use client"
import { Box } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import { ColorModeProvider, useColorModeValue  } from "./components/ui/color-mode"

function App() {
  const bg = useColorModeValue("red.500", "red.200")
  return (
    <ColorModeProvider >
      <Box minH={"100vh"} background={bg} >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </Box>
    </ColorModeProvider>
  )
}

export default App
