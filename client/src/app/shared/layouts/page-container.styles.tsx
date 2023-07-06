/**
 * @author Abhijit Baldawa
 *
 * Provides layout for the entire UI
 */

import { Box, styled } from "@mui/material";

const PageContainer = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  padding: "1rem",
  justifyContent: "center",
  alignItems: "center",
}));

PageContainer.defaultProps = {
  component: "main",
};

export { PageContainer };
