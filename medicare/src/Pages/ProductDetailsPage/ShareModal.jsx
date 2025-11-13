import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const socialMediaIcons = [
  { name: "Facebook", icon: FaFacebook },
  { name: "WhatsApp", icon: FaWhatsapp },
  { name: "X", icon: FaXTwitter },
];

export default function ShareModal({ open, handleClose, shareUrl }) {
  const handleSocialClick = (platform) => {
    const message = "Make every day a little better. Check this product out!";
    const url = shareUrl;

    let shareLink = "";

    switch (platform) {
      case "Facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(message)}`;
        break;

      case "WhatsApp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          message + "\n" + url
        )}`;
        break;

      case "X":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message + "\n" + url
        )}`;
        break;

      default:
        return;
    }

    window.open(shareLink, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="share-modal-title"
      aria-describedby="share-modal-description"
    >
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="share-modal-title" variant="h4" component="h2">
            Share
          </Typography>
          <IconButton onClick={handleClose}>
            <IoCloseCircleOutline className="text-[#00a297]" />
          </IconButton>
        </Box>

        <Grid container spacing={1} justifyContent="space-evenly" mb={3}>
          {socialMediaIcons.map((social) => (
            <Grid item key={social.name}>
              <IconButton
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                }}
                onClick={() => handleSocialClick(social.name)}
              >
                <Typography>
                  <social.icon />
                </Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" alignItems="stretch" gap={1}>
          <TextField
            fullWidth
            value={shareUrl}
            InputProps={{
              readOnly: true,
            }}
            size="small"
          />

          <Button
            variant="contained"
            onClick={handleCopy}
            sx={{
              bgcolor: "#00a297",
            }}
          >
            Copy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
