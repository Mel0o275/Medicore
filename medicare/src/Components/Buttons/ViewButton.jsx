/* -------------------------- React --------------------------- */
import React, { useState, useEffect, forwardRef } from "react";

/* -------------------------- MUI --------------------------- */
import { Slide, IconButton } from "@mui/material";
/* -------------------------- Icons --------------------------- */
import VisibilityIcon from "@mui/icons-material/Visibility";

/* -------------------------- Components --------------------------- */
import ViewButtonLoader from "../Loades/ViewButtonLoader";
import ProductViewDialog from "../Dialogs/ProductViewDialog";
import { Link } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewButton({ item }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 2000);
  };

  return (
    <>
      {loading && <ViewButtonLoader />}

      <Link
        to={`/shop/productdetails/${item._id}`}
        style={{ textDecoration: "none" }}
      >
        <IconButton
          color="primary"
         className="bg-white shadow-md hover:bg-gray-100"
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Link>

      {/* <ProductViewDialog
        item={item}
        open={open}
        handleClose={() => setOpen(false)}
      /> */}
    </>
  );
}
