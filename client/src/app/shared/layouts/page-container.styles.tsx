/**
 * @author Abhijit Baldawa
 *
 * Provides layout for the entire UI
 */

import { Box, styled } from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  padding: "0.5rem",
  justifyContent: "center",
  alignItems: "center",

  [theme.breakpoints.up("sm")]: {
    padding: "1rem",
  },
}));

PageContainer.defaultProps = {
  component: "main",
};

export { PageContainer };
