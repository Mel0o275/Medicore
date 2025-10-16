// ============================= MUI ====================
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <Box bgcolor="primary.main">
      <Container >
        <Grid container spacing={2} sx={{ padding: "2rem" }}>
          {/* ----------- Company / Pharmacy Info ----------- */}
          <Grid
            size={12}
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid
              size={{ sm: 6, md: 3, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
                height: { md: "100%" },
              }}
            >
              <h5>Pharmacy Info</h5>
              <p>
                Visit your nearest <b>Medicore Pharmacy</b> for expert health
                advice and trusted medication.
              </p>
              <a className="footerA">📞 +20 (100) 456 7890</a>
              <a className="footerA">💌 info@Medicorepharmacy.com</a>
            </Grid>

            {/* ----------- Useful Links ----------- */}
            <Grid
              size={{ sm: 6, md: 2, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
                height: { md: "100%" },
              }}
            >
              <h5>Quick Links</h5>
              <a className="footerA">- Shop Medicines</a>
              <a className="footerA">- Health & Wellness</a>
              <a className="footerA">- Skincare Products</a>
              <a className="footerA">- Medical Equipment</a>
            </Grid>

            {/* ----------- Information ----------- */}
            <Grid
              size={{ sm: 6, md: 2, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
                height: { md: "100%" },
              }}
            >
              <h5>Information</h5>
              <a className="footerA">- Delivery & Returns</a>
              <a className="footerA">- Contact Us</a>
              <a className="footerA">- Health Articles</a>
              <a className="footerA">- Terms & Conditions</a>
              <a className="footerA">- Privacy Policy</a>
            </Grid>

            {/* ----------- Newsletter ----------- */}
            <Grid
              size={{ sm: 6, md: 4, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
                height: { md: "100%" },
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              <h5>Stay Healthy with Us</h5>
              <p>
                Subscribe to our newsletter to get the latest offers, health
                tips, and updates about new products.
              </p>

              <Grid container spacing={2}>
                <Grid size={{ sm: 8, xs: 12 }}>
                  <TextField
                    id="email-basic"
                    label="Enter your email address"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  size={{ sm: 4, xs: 12 }}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                  container
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "black",
                      fontSize: { md: "0.75rem", xs: "1rem", sm: "0.75rem" },
                    }}
                  
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* ----------- Bottom Footer ----------- */}
          <Grid size={12} container spacing={2}>
            <Grid
              size={{ md: 6, xs: 12 }}
              container
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid size={{ xs: 12, sm: 8 }} sx={{ textAlign: "center" }}>
                <p>© 2025 Medicore Pharmacy — Your Trusted Health Partner 💊</p>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }} container spacing={2}>
                <Grid size={3} container sx={{ justifyContent: "center" }}>
                  <InstagramIcon />
                </Grid>
                <Grid size={3} container sx={{ justifyContent: "center" }}>
                  <XIcon />
                </Grid>
                <Grid size={3} container sx={{ justifyContent: "center" }}>
                  <FacebookIcon />
                </Grid>
                <Grid size={3} container sx={{ justifyContent: "center" }}>
                  <YouTubeIcon />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              size={{ md: 3, xs: 12, sm: 6 }}
              container
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <h1>Medicore</h1>
            </Grid>

            <Grid
              size={{ md: 3, xs: 12, sm: 6 }}
              container
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Grid item size={2} key={num}>
                  <img
                    src={`/public/images/payment-${num}.svg`}
                    alt={`Payment ${num}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
