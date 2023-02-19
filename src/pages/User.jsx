import React,{useEffect,useState} from 'react'
import { Typography,Box,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useGlobalContext } from '../context/AuthContext';
import Header from '../component/header';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F9FAFB",
        color: "grey",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const User = () => {
    const [data, setData] = useState("");
    const [allData,setAllData] = useState("");
    const [searchVal, setSearchVal] = useState("")
    const [gender, setGender] = useState("");
    const { setLoading } = useGlobalContext();
    const fetch = () => (
        setLoading(true),
        axios
            .get("https://dummyjson.com/users")
            .then((res) =>
            (setAllData(res.data.users),
                console.log(res.data.users),
                setData(res.data.users),
                setLoading(false)))
    )

    useEffect(() => {
        fetch();
    }, [])

    const handleFilter = (e) => {
        if (e.target.value == "") {
            setAllData(data);
        } else {
            const filteredItem = data.filter((db) =>
                db?.firstName.toUpperCase().includes(e.target.value.toUpperCase()) ||
                db?.lastName.toUpperCase().includes(e.target.value.toUpperCase()) ||
                db?.email.toUpperCase().includes(e.target.value.toUpperCase()) ||
                db?.age == e.target.value);
            console.log(filteredItem);
            setAllData(filteredItem)
        }
        setSearchVal(e.target.value)
    }
   
    const handleGenderFilter = (e) => {
        if (e.target.value == "") {
            setAllData(data);
        } else {
            const filteredItem = data.filter((db) =>
                db.gender === e.target.value)
            setAllData(filteredItem)
            console.log(filteredItem)
        }
        setGender(e.target.value)
    }
    
   
  return (
      <Box>
          <Header/>
          <Grid container m={2} display={"flex"} mt={10} alignContent={"center"} justifyContent={"center"}>
              <Grid item md={6} sm={10} xs={10} >
                  <Box display={"flex"} justifyContent={"space-between"} mb={3}>     
                      <Box display={"flex"} sx={{ border:"1px solid #E1E6E2",borderRadius:"5px"}} p={".4em"}>
                      <SearchIcon/> <input  value={searchVal} placeholder="Search.." style={{border:"none",outline:"none",width:"20em",fontSize:"1.1em"}} onChange={(e) => handleFilter(e)} />
                  </Box>
                  <Box  sx={{cursor:"pointer"}}>
                          <select value={gender} style={{ width: "7em", fontSize: "1rem", padding: ".4em", borderColor:"#E1E6E2",borderRadius:"5px",cursor:"pointer",outline:"none" }} onChange={(e) => handleGenderFilter(e)} >
                          <option value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                      </select>
                  </Box>
                  </Box>
                  <TableContainer sx={{ height: "35em",width:"100%",minWidth:"400px" }}  component={Paper} >
                    <Table stickyHeader >
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell>User</StyledTableCell>
                                  <StyledTableCell>Email</StyledTableCell>
                                  <StyledTableCell>Age</StyledTableCell>
                                  <StyledTableCell>Gender</StyledTableCell>
                              </TableRow>
                         </TableHead>
                   <TableBody>
                      {allData  && allData?.map((db, idx) => (
                          <TableRow key={idx}>
                              <TableCell><Stack direction={"row"} alignItems={"center"}><Box width={"40px"}><img width={"100%"} src={db?.image}/></Box>{db?.firstName}{db?.lastName}</Stack></TableCell>
                              <TableCell>{db?.email}</TableCell>
                              <TableCell>{db?.age}</TableCell>
                              <TableCell>{db?.gender}</TableCell>
                          </TableRow>
                      ))}
                   </TableBody>
                   </Table>
                              {allData.length == 0 && 
                                  <Typography mt={5} variant='h5' textAlign={"center"}>Data is not available</Typography>
                              }
                 </TableContainer>
              </Grid>
          </Grid>
      </Box>
  )
}

export default User