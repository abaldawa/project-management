/**
 * @author Abhijit Baldawa
 */

import { Box, Paper, styled } from "@mui/material";

const Container = styled(Paper)(() => ({
  width: "100%",
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem",
  gap: "0.5rem",
  maxHeight: "70vh",
}));

Container.defaultProps = {
  elevation: 5,
};

const PhasesWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  gap: "0.5rem",
  overflow: "scroll",
}));

const ProjectPriceDetailsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "1rem",

  [theme.breakpoints.up("sm")]: {
    width: "50%",
    alignSelf: "flex-end",
  },
}));

ProjectPriceDetailsWrapper.defaultProps = {
  component: "article",
};

export { Container, PhasesWrapper, ProjectPriceDetailsWrapper };
