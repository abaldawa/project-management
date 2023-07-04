/**
 * @author Abhijit Baldawa
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
