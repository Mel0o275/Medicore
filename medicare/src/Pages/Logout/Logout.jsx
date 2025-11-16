import React from "react";
import { useSpring, animated } from "@react-spring/web";

/* --------------------------- "MUI" -------------------------------- */
import PropTypes from "prop-types";
import { Box, Typography, Button, Backdrop, Modal } from "@mui/material";
import useAuthStore from "../../Store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  p: 4,
  outline: "none",
};

function Logout({ open, handleClose }) {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <>
      <Modal
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                id="logout-modal-title"
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Logout Confirmation
              </Typography>
              <Typography
                id="logout-modal-description"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                Are you sure you want to logout? You will need to sign in again
                to access your account.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  px: 4,
                  py: 1,
                  borderColor: "grey.300",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "grey.400",
                    backgroundColor: "grey.50",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Logout;
