/**
 * @author Abhijit Baldawa
 */

import { TableCell, styled } from "@mui/material";

const TableHeadGroupCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "borderRight",
})<{ borderRight?: boolean }>(({ borderRight }) => ({
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  borderRight: borderRight ? "1px solid white" : undefined,
}));

export { TableHeadGroupCell };
