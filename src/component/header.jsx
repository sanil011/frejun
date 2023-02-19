import React from 'react'
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography, Button,Stack ,Box} from '@mui/material'
import {useGlobalContext} from "../context/AuthContext"
const header = () => {
    const { setLoading } = useGlobalContext();
    const navigate = useNavigate();
    const handleSignout = () => {
        setLoading(true);
        signOut(auth).then(() => {
            navigate("/");
            window.location.reload();
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            alert("sign out ", error)
        });
    }
  return (
      <Box sx={{ borderBottom: "1px solid lightgrey", backgroundColor:"#F9FAFB"}} p={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant='h4' onClick={()=>location.reload()}  sx={{cursor:"pointer"}} fontWeight={"700"}>Frejun Task</Typography>
              <Button
                  variant={"contained"}

                  sx={{ padding: ".5em 1.8em", borderRadius: "20px" }}
                  onClick={handleSignout}
              >
                  Logout
              </Button>
          </Stack>
    </Box>
  )
}

export default header