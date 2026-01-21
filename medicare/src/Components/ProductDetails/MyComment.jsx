import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import avatar from "/avatar.jpg";
import { useState } from "react";
import EditReviewModal from "./EditReviewModal";

import useDeleteReview from "../../Hooks/review/useDeleteReview";
import useTheme from "../../Store/useTheme";

function MyComment({ review, userId }) {
  const theme = useTheme();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { deleteReview } = useDeleteReview();
  function confirmDelete() {
    deleteReview.mutate(review);
    setOpenDeleteModal(false);
  }
  function cancelDelete() {
    if (!deleteReview?.isPending) {
      setOpenDeleteModal(false);
    }
  }

  const handleCloseEditModal = () => setOpenEditModal(false);
  return (
    <div
      className=" border   p-4 md:p-6 flex flex-col gap-3"
      style={{
        borderColor:
          theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
        color: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review?.userId?.profilePic || avatar}
            alt={review?.userId}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <div>
            <h1 className="font-semibold ">
              {review?.userId?.firstName + " " + review?.userId?.secondName}
            </h1>
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <h3 className="text-sm ">
                {new Date(review?.updatedAt).toLocaleString()}
              </h3>
              {review.updatedAt > review.createdAt && (
                <h6 className="text-xs  flex items-center justify-center gap-1">
                  Edited
                  <MdEdit />
                </h6>
              )}
            </div>
          </div>
        </div>

        {review?.userId?._id === userId && (
          <div className="flex gap-2">
            <button
              onClick={() => setOpenDeleteModal(true)}
              className="w-8 text-xl h-8 p-1   hover:bg-stone-100/90 flex justify-center items-center rounded-full"
            >
              <MdDelete />
            </button>
            <button
              className="w-8 text-xl h-8 p-1   hover:bg-stone-100/90 flex justify-center items-center rounded-full"
              onClick={() => setOpenEditModal(true)}
            >
              <MdEdit />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2 flex-wrap">
        <Typography variant="h5" className="leading-relaxed">
          {review?.title}
        </Typography>
        <Rating
          value={review.rating}
          readOnly
          size="small"
          sx={{
            "& .MuiRating-iconFilled": { color: "#fbbf24" },
          }}
        />
      </div>
      <Typography variant="body2">{review?.review}</Typography>

      <EditReviewModal
        selectedReview={review}
        open={openEditModal}
        handleClose={handleCloseEditModal}
      />

      <Dialog
        open={openDeleteModal}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your review ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleteReview.isPending} onClick={cancelDelete}>
            Cancel
          </Button>
          <Button
            disabled={deleteReview.isPending}
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            {deleteReview.isPending ? "Deleting...." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyComment;
