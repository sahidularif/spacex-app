import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterOptionData from './FilterOptionData';
import { useSelector } from 'react-redux';
import { filterByDate, selectRockets } from '../../../redux/slices/fetchApiSlice';
import { useDispatch } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function SelectLabels() {
    let { rockets, filteredRockets } = useSelector(selectRockets);
    const dispatch = useDispatch();
    const [option, setOption] = useState('');


    // On Input change
    const handleChange = (event) => {
        setOption(event.target.value)

        // Filter by last month
        if (event.target.value == 'success') {
            let getSuccessMission = filteredRockets.filter((data) => data.launch_success === true);
            dispatch(filterByDate(getSuccessMission))
        }
        // Filter by last week
        if (event.target.value == 'failure') {
            let getFailureMission = filteredRockets.filter((data) => data.launch_success === false);
            dispatch(filterByDate(getFailureMission))

        }



    }
    // Filter by upcomming launch
    const [checked, setChecked] = useState(true);

    const handleIsUpcomming = (event) => {
        setChecked(event.target.checked);
        let getUpcommingMission = filteredRockets.filter((data) => data.upcoming === true && data.launch_success === null);
        dispatch(filterByDate(getUpcommingMission))
    };

    const handleClick = () => {
        dispatch(filterByDate(rockets))
    }
    return (
        <div className="d-flex">
            <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="demo-simple-select-helper-label">By Status</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={option}
                    label="By Status"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Object.entries(FilterOptionData.status).map(([key, value]) => {
                        return (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormGroup>
                <FormControlLabel control={<Checkbox

                    onChange={handleIsUpcomming}
                    inputProps={{ 'aria-label': 'controlled' }} />}
                    label="Upcomming" />
            </FormGroup>
            <button type="button" onClick={handleClick} className="btn btn-primary">Rest Filter</button>

        </div>
    );
}
