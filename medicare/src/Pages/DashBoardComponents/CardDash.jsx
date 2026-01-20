import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  Container,
} from "@mui/material";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

function CardDash({ item }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={10}>
              <Typography variant="h5">{item.title}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography fontSize={28}>{item.icon}</Typography>
            </Grid>

            <Grid size={12}>
              <Container
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {item.isLoading ? (
                  <DotWave size="40" speed="1" color="black" />
                ) : (
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                )}
              </Container>
            </Grid>

            <Grid
              container
              size={{xs: 6 ,md: 5 }}
              spacing={2}
              sx={{ backgroundColor: "#eee", borderRadius: "2px" , justifyContent:"center"}}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  


                }}
              >
                <CallMadeIcon />

                <Typography>14%</Typography>
              </Box>
            </Grid>

            <Grid size={{xs: 6 ,md:7}}>
              <Typography variant="p">In the last month</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardDash;
