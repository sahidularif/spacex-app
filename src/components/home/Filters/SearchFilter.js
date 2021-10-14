import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { filterByDate, selectRockets } from "../../../redux/slices/fetchApiSlice";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({

    root: {
        padding: "2px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        height:60,
    },
    iconButton: {
        padding: 10,
    },
}));

const SearchInput = () => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("");
    let { rockets, filteredRockets } = useSelector(selectRockets);
    const dispatch = useDispatch();

    const handleBlur = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSubmit = (e) => {
        const getRocketById = filteredRockets.filter((data) =>
            data.rocket.rocket_id
                .toString()
                .toLowerCase()
                .includes(searchInput.toString().toLowerCase()));
        dispatch(filterByDate(getRocketById));
        e.preventDefault();
    }

    return (

        <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
                <input type="text" name="search" onBlur={handleBlur} className={`${classes.input} form-control`} placeholder="Search by rocket id" aria-label="Recipient's username" aria-describedby="button-addon2" required />

                <input type="submit" value="Search" class="btn btn-outline-secondary" id="button-addon2" />
            </div>
        </form>

    );
};

export default SearchInput;