import { RouterProvider } from "react-router-dom"
import ResponsiveLayout from "./components/Layouts/Responsive"
import { router } from "./routes/index"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "react-hot-toast"

function App() {
  
  return (
    <>
      <Toaster/>
     <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
    </>
  )
}

export default App