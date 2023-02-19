import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Google from "../assets/google.svg"
import { Typography, Divider, Box } from '@mui/material'
import { auth } from "../firebase"
import { useGlobalContext } from '../context/AuthContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate } from "react-router-dom";

const Login = () => {

    const { setLoading , setEmail} = useGlobalContext()
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((usr) => {
           console.log(usr)
            setEmail(usr?.email)
        })
        return () => {
            unsub();
        }
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        setLoading(true);
        const { email, password } = data;

        signInWithEmailAndPassword(auth, email, password).then((res) => {
            setEmail(res.user.email)
            navigate('/user');
            setLoading(false)
        })
            .catch
            (() => {
                setLoading(false);
                alert("Password or Email is wrong");
            })
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "center",alignContent: "center",height:"100vh",width:"100%"}}>
            <Box width={"30%"} mt={15}>
                <Typography variant='h4' mb={10} textAlign={"center"}>Log in</Typography>
          <form onSubmit={handleSubmit(handleLogin)} style={{ display: "flex", flexDirection: "column", }}>

              <label><Typography mb={".5em"} variant='subtitle2'>Username</Typography> </label>
              <input type="text" style={{ height: "40px", marginBottom: "1em" }}
                        {...register('email', {
                            required: "The Email Field is required", pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && (
                        <span style={{color:"red"}}>{errors.email.message}</span>
                    )}
                   
                    <label><Typography mb={".5em"} variant='subtitle2'>Password</Typography></label>
              <input type="password" style={{ height: "40px", marginBottom: "1em" }}

                        {...register("password", { required: "The password Field is required" })} />
                    
                        {errors.password && (
                            <span style={{color:"red"}}>{errors.password.message}</span>
                        )}

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1em" }}>
                  <Box display={"flex"}>
                      <input type="checkbox" />
                      <Typography mx={1} variant='subtitle2'>Remember me</Typography>
                  </Box>
                  <Typography variant='subtitle2'>Forgot Password?</Typography>
              </Box>

                    <button type="submit" style={{
                        height: "40px", backgroundColor: "#34CB65", border: "none", color: "white", borderRadius: "10px", cursor: "pointer" }}
              >Login
              </button>
          </form>
          <Divider sx={{ margin: "1em 0" }}>or</Divider>
          <button
              style={{ height: "40px", width: "100%", backgroundColor: "white", border: "1px solid lightgrey", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}
          >
              <img src={Google} width={"20px"} />
              Login with Google</button>
            </Box>
        </Box>
  )
}

export default Login