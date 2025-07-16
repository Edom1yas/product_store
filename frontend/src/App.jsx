import { Box, Button } from "@chakra-ui/react"
import { Route } from "react-router-dom"

function App() {
  
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Rout path="/create" element={<CreatePage/>}/>
      </Routes>
    </Box>
  )
}

export default App
