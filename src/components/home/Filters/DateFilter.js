import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterOptionData from './FilterOptionData';
import { useSelector } from 'react-redux';
import { filterByDate, selectRockets } from '../../../redux/slices/fetchApiSlice';
import { useDispatch } from 'react-redux';

export default function SelectLabels() {
    let { rockets, filteredRockets } = useSelector(selectRockets);
    const dispatch = useDispatch();
    const [option, setOption] = useState('');

    // On Input change
    const handleChange = (event) => {

        setOption(event.target.value)
        // Filter by last year
        if (event.target.value == 'year') {

            const currentDate = new Date();
            const lYear = currentDate.getFullYear() - 1;
            let getLastYearData = filteredRockets.filter((data) => data.launch_year === lYear.toString());

            dispatch(filterByDate(getLastYearData))
        }
        // Filter by last month
        if (event.target.value == 'month') {

            const currentDate = new Date();
            const cMonth = currentDate.getMonth();
            const cDate = currentDate.getDate();
            const cYear = currentDate.getFullYear();
            const cFullDate = `${cYear}-${cMonth - 1}-${cDate}`;
            const getLastMonthData = filteredRockets.filter((data) => {
                const lanchDate = new Date(data.launch_date_utc);
                const lMonth = lanchDate.getMonth();
                const lDate = lanchDate.getDate();
                const lYear = lanchDate.getFullYear();
                const lFullDate = `${lYear}-${lMonth}-${lDate}`;
                return lFullDate.toString() === cFullDate.toString();
            });
            dispatch(filterByDate(getLastMonthData))
        }
        // Filter by last week
        if (event.target.value == 'week') {

            let lastWeekDate = nextweek();
            const cMonth = lastWeekDate.getMonth();
            const cDate = lastWeekDate.getDate();
            const cYear = lastWeekDate.getFullYear();
            const cFullDate = `${cYear}-${cMonth - 1}-${cDate}`;
            const getLastWeekData = filteredRockets.filter((data) => {
                const lanchDate = new Date(data.launch_date_utc);
                const lMonth = lanchDate.getMonth();
                const lDate = lanchDate.getDate();
                const lYear = lanchDate.getFullYear();
                const lFullDate = `${lYear}-${lMonth}-${lDate}`;
                return lFullDate.toString() === cFullDate.toString();
            });
            dispatch(filterByDate(getLastWeekData))

        }
        function nextweek() {
            var today = new Date();
            var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            return nextweek;
        }


    }

    return (
        <div className="d-flex">
            <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="demo-simple-select-helper-label">By Date</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={option}
                    label="By Date"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Object.entries(FilterOptionData.launchDate).map(([key, value]) => {
                        return (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}
