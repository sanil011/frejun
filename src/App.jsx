import Login from "./pages/Login"
import User from './pages/User'
import { Fragment } from "react";
import { useGlobalContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Backdrop, CircularProgress } from "@mui/material";
function App() {
  const {loading} = useGlobalContext()
  
  return (
<Fragment>
      <Backdrop style={{ zIndex: "10000", color: "#fff" }} open={loading}>
        <CircularProgress />
      </Backdrop>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<ProtectRoute><Login /></ProtectRoute> } />
          <Route path='/user' element={
            <AuthRoute>
             <User />
           </AuthRoute>} />
       </Routes>
      </BrowserRouter>
    </Fragment>
    
  )
}

export default App;


const AuthRoute = ({ children }) => {
  const { email } = useGlobalContext();
  if (!email) {
    console.log(email)
    return <Navigate to="/" replace />
  }
  return children;
}
const ProtectRoute = ({ children }) => {
  const { email } = useGlobalContext();
  if (email) {
    return <Navigate to="/user" replace />
  }
  return children;
}
