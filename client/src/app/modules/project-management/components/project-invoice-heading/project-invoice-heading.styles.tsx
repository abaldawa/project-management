/**
 * @author Abhijit Baldawa
 */

import { Box, Typography, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "unset",
  },
}));

const LabelContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
}));

const Label = styled(Typography)(() => ({}));

export { Container, LabelContainer, Label };
