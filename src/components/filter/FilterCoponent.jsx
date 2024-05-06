import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

//Config the FilterComponent with an onChange event
const FilterComponent = ({onChange})=>{

    //Load all the categories or nations from the Spring REST API on component laod
    const[nations,setNations] = useState([]);

    useEffect(()=>{
        axios.get("https://spring-react-football.onrender.com/getNations")
        .then((res)=>{
            //push the all option into the incoming nations array
            res.data.unshift("all");
            setNations(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <Grid container>
            <Grid item xs={12} md={12} sm={12}>
                <FormControl fullWidth className="mt-3">
                <InputLabel id="demo-simple-select-label" 
                    className="font-monospace fw-bold text-white fs-6"
                >
                    Nations
                </InputLabel>
                    <Select className="w-100 mt-3" onChange={onChange}  label="Nations"
                        labelId="demo-simple-select-label"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white !important', // Outline color
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white !important', // Label color
                                fontFamily: 'monospace',
                                fontWeight: 'bolder',
                                '&.Mui-focused': {
                                    color: 'white !important', // Focused label color
                                },
                            },
                            '& .MuiSelect-icon': {
                                color: 'white !important', // Dropdown icon color
                            },
                            '& .MuiInputBase-input': {
                                color: 'white !important', // Text color
                                fontFamily: 'monospace',
                                fontWeight: 'bolder'
                            },
                            '& .MuiListItem-root': {
                                color: 'black !important', // Dropdown item color
                                backgroundColor: 'white !important', // Dropdown item background color
                            }
                        }}
                    >
                        {
                            nations.map((nation,index) =>
                                <MenuItem key={index} className="font-monospace fw-bold" value={nation}>{nation.toUpperCase()}</MenuItem>
                            )
                        }
                        
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default FilterComponent;