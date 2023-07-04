/**
 * @author Abhijit Baldawa
 */

import { Box, Collapse, Typography, styled } from "@mui/material";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

Container.defaultProps = {
  component: "article",
};

const PhaseTitleWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "5px",
  gap: "0.5rem",
  padding: "0.6rem",
}));

const ExpandIconWrapper = styled(Box)(() => ({}));

const PhaseTitle = styled(Typography)(() => ({}));

const CollapsiblePhasePriceDetailsWrapper = styled(Collapse)(() => ({}));

CollapsiblePhasePriceDetailsWrapper.defaultProps = {
  timeout: "auto",
  unmountOnExit: true,
};

export {
  Container,
  PhaseTitleWrapper,
  ExpandIconWrapper,
  PhaseTitle,
  CollapsiblePhasePriceDetailsWrapper,
};
