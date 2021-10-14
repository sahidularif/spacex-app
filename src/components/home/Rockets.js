import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData, selectRockets } from '../../redux/slices/fetchApiSlice';
import Grid from "@material-ui/core/Grid";
import PaginationContainer from './PaginationContainer';
import DateFilter from './Filters/DateFilter';
import StatusFilter from './Filters/StatusFilter';

import FilterOptionData from './Filters/FilterOptionData';
import SearchFilter from './Filters/SearchFilter';

const Rockets = () => {
    let rockets = useSelector(selectRockets);
    let items = rockets.filteredRockets;
    console.log(items);
    const dispatch = useDispatch();

    useEffect(() => {

        (async function fetchRocket() {

            try {
                const res = await axios.get("https://api.spacexdata.com/v3/launches")
                dispatch(getApiData(res.data));
            } catch (error) {
                console.log("Err:", error.message);
            }

        }())


    }, [0]);

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-10 mx-auto">
                    <div className="col-md-10 d-flex align-items-center justify-content-evenly">
                        <div className="col-md-8">
                            <SearchFilter />

                        </div>
                        <div className="col-md-2">
                            <DateFilter />

                        </div>
                        <div className="col-md-2">
                            <StatusFilter />
                        </div>
                    </div>
                    <div className="col-md-12 col-xs-12 shadow-sm d-flex mt-3">
                        <PaginationContainer rockets={items}></PaginationContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rockets;