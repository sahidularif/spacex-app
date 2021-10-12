import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData, selectRockets } from '../../redux/slices/fetchApiSlice';



const Rockets = () => {
    let rockets = useSelector(selectRockets);
    const dispatch = useDispatch();

    const fetchRocket = async () => {
        const res = await axios
            .get("https://api.spacexdata.com/v3/launches")
            .catch((err) => {
                console.log("Err:", err);
            });
        dispatch(getApiData(res.data));
    }
    useEffect(() => {
        fetchRocket();
    }, [0]);

    return (
        <>
            <div className="row mt-3">
                <div className="col-sm-10 mx-auto">
                    <div className="shadow-sm d-flex">
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rockets;