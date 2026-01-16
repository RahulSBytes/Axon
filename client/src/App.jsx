import { RouterProvider } from "react-router-dom"
import ResponsiveLayout from "./components/Layouts/Responsive"
import { router } from "./routes/index"

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App