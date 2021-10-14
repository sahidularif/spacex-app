import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    Grid,
} from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import PaginationActionComponent from './PaginationActionComponent';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const PaginationContainer = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const rockets = props.rockets;
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleChangePage = (event, newPage) => setCurrentPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table style={{ backgroundColor: 'snow' }} aria-label="custom pagination table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Grid container spaicing={3} className="justify-content-between mb-2">
                                    {(rowsPerPage > 0
                                        ? rockets.slice(
                                            currentPage * rowsPerPage,
                                            currentPage * rowsPerPage + rowsPerPage
                                        )
                                        : rockets
                                    ).map((rocket, index) => {
                                        const lanchDate = new Date(rocket.launch_date_utc);
                                        const cMonth = lanchDate.getMonth();
                                        const cDate = lanchDate.getDate();
                                        const cYear = lanchDate.getFullYear();
                                        const cFullDate = `${cDate}-${cMonth - 1}-${cYear}`;
                                        let text =rocket.mission_name;
                                        text.charAt(0)
                                        return (
                                            <Card sx={{ maxWidth: 300 }} key={index} className="mb-5">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                         { text.charAt(0)}
                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={rocket.mission_name}
                                                    subheader={cFullDate}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={rocket.links.mission_patch_small}
                                                    alt="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {rocket.details}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton aria-label="add to favorites">
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="share">
                                                        <ShareIcon />
                                                    </IconButton>
                                                    <ExpandMore
                                                        expand={expanded}
                                                        onClick={handleExpandClick}
                                                        aria-expanded={expanded}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                </CardActions>
                                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography paragraph>Launch Details:</Typography>
                                                        <Typography paragraph>
                                                           <h6>Rocket Id: {rocket.rocket.rocket_id}</h6>
                                                           <h6>Rocket Name: {rocket.rocket.rocket_name}</h6>
                                                           <h6>Rocket Type: {rocket.rocket.rocket_type}</h6>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </Card>
                                        );
                                    })}
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[12, 24, 48, 96]}
                                count={rockets.length}
                                rowsPerPage={rowsPerPage}
                                labelRowsPerPage={"Rokect per page"}
                                page={currentPage}
                                SelectProps={{
                                    inputProps: { "aria-label": "Cards" },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={PaginationActionComponent}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default PaginationContainer;