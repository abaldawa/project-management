/**
 * @author Abhijit Baldawa
 */

import { Box, Typography, styled } from "@mui/material";

const Container = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const LabelContainer = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
}));

const Label = styled(Typography)(() => ({}));

export { Container, LabelContainer, Label };
