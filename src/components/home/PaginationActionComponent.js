import PropTypes from "prop-types";
import { MdLastPage, MdFirstPage, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const PaginationActionComponent = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <button
        className="btn btn-outline"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <MdLastPage /> : <MdFirstPage />}
      </button>
      <button
        className="btn btn-outline"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <MdNavigateNext />
        ) : (
          <MdNavigateBefore />
        )}
      </button>
      <button
        className="btn btn-outline"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <MdNavigateBefore />
        ) : (
          <MdNavigateNext />
        )}
      </button>
      <button
        className="btn btn-outline"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <MdFirstPage /> : <MdLastPage />}
      </button>
    </div>
  );
};

PaginationActionComponent.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default PaginationActionComponent;