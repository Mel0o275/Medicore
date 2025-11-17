import React from "react";
import { useSpring, animated } from "@react-spring/web";

/* --------------------------- "MUI" -------------------------------- */
import PropTypes from "prop-types";
import { Box, Typography, Button, Backdrop, Modal, Alert } from "@mui/material";
import { useUserMutations } from "../../Hooks/reactUser/useUserMutations";
import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";
import toast from "react-hot-toast";

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
  width: { xs: "90%", sm: 450 },
  maxWidth: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  p: 4,
  outline: "none",
};

function DeleteProfile({ open, handleClose }) {
  const { deleteUserMutation } = useUserMutations();

  const handleDelete = async () => {
    // console.log("Deleting user profile...");


      // const { user } = useAuthStore();
      // console.log( user.data.id);

    // From the rahma
    const userId = localStorage.getItem("id");
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        console.log(" User deleted successfully");
        handleClose();
        toast.success(`User deleted successfully`);

        // window.location.href = "/login";
      },
      onError: (error) => {
       

        // console.error("Delete failed:", error);
        const serverMessage =
          error?.response?.data?.message || "User doessn't deleted";

        toast.error(serverMessage);

      },
    });
  };

  return (
    <>
      {deleteUserMutation.isPending && <ViewButtonLoader />}
      <Modal
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
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
            {/* Warning Icon and Title */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "error.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "white",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  !
                </Typography>
              </Box>

              <Typography
                id="delete-modal-title"
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "error.main",
                  mb: 1,
                }}
              >
                Delete Account
              </Typography>

              <Typography
                id="delete-modal-description"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently lost.
              </Typography>
            </Box>

            {/* Warning Alert */}
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                "& .MuiAlert-icon": {
                  alignItems: "center",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Warning: This action is permanent!
              </Typography>
              <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                All your profile data, settings, and history will be deleted
                immediately.
              </Typography>
            </Alert>

            {/* Additional Warning List */}
            <Box sx={{ mb: 3, pl: 2 }}>
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", mb: 1 }}
              >
                You will lose:
              </Typography>
              <ul
                style={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  paddingLeft: "16px",
                  margin: 0,
                }}
              >
                <li>Personal information and profile</li>
                <li>Account settings and preferences</li>
                <li>All stored data and history</li>
                <li>Access to all services</li>
              </ul>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
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
                onClick={handleDelete}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
              >
                Delete Account
              </Button>
            </Box>

            {/* Final Warning */}
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                fontWeight: 500,
              }}
            >
              This action cannot be reversed!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default DeleteProfile;
