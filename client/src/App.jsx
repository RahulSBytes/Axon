import { RouterProvider } from "react-router-dom"
import ResponsiveLayout from "./components/Layouts/Responsive"
import { router } from "./routes/index"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  
  return (
     <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
  )
}

export default App