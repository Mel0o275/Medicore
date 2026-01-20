import { useUsers } from "../../Hooks/reactUser/useUsers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Box, Typography } from "@mui/material";
import CardDash from "../DashBoardComponents/CardDash";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LineChartDash from "../../Components/Charts/LineChart";
import CircleChartDash from "../../Components/Charts/CircleChart";
import GppBadIcon from "@mui/icons-material/GppBad";
import PaidIcon from "@mui/icons-material/Paid";
import TableTopProductsDash from "../DashBoardComponents/TableTopProductsDash";
import ColumnsChartDash from "../../Components/Charts/ColumnsChart";
import TableTransactionsDash from "../DashBoardComponents/TableTransactionsDash";

function InterfaceDash() {
  const API = import.meta.env.VITE_API_URL;

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useUsers();

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API}/products`);
    return data;
  };

  const {
    data: productsdata,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = productsdata?.data?.products || [];

  const cards = [
    {
      title: "Total Customers",
      icon: <GroupIcon />,
      value: users.length,
      isLoading: isLoadingUsers,
      isError: isErrorUsers,
    },
    {
      title: "Total Products",
      icon: <TrendingUpIcon />,
      value: products.length,
      isLoading: isLoadingProducts,
      isError: isErrorProducts,
    },
    {
      title: "Total Orders",
      icon: <InventoryIcon />,
      value: 0,
      isLoading: false,
      isError: false,
    },
    {
      title: "Pending Orders",
      icon: <ShoppingBagIcon />,
      value: 0,
      isLoading: false,
      isError: false,
    },
    {
      title: "Total revenue",
      icon: <PaidIcon />,
      value: 0,
      isLoading: false,
      isError: false,
    },
    {
      title: "Total canceled",
      icon: <GppBadIcon />,
      value: 0,
      isLoading: false,
      isError: false,
    },
  ];

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid size={12}>
          <Box>
            <Grid container spacing={2}>
              {cards.slice(0, 4).map((item, i) => {
                return (
                  <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                    <CardDash item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>

        <Grid size={12} container spacing={2}>
          <Grid size={{ md: 4, xs: 12 }} spacing={2} container>
            {cards.slice(4).map((item, i) => (
              <Grid key={i} size={12}>
                <CardDash item={item} />
              </Grid>
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <LineChartDash />
          </Grid>
        </Grid>

        <Grid size={12} container>
          <Grid size={{ xs: 12, md: 6 }}>
            <ColumnsChartDash />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} container>
            <Grid size={12}>
              <Typography variant="h4">Top products</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TableTopProductsDash />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} container>
          <Grid size={12}>
            <Typography variant="h4">Transactions</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TableTransactionsDash />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Box sx={{ justifyContent: "center" }}>
              <Container sx={{ display: "flex", justifyContent: "center" }}>
                <CircleChartDash />
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InterfaceDash;
