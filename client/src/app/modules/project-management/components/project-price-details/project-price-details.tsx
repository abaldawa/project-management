/**
 * @author Abhijit Baldawa
 *
 * This component displays the entire project cost breakdown
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ProjectInvoice, isDiscountOrFee } from "../../gql-queries-hooks";

type ProjectPriceDetailsProps = Pick<
  ProjectInvoice,
  "subtotalPrice" | "totalPrice" | "totalTax" | "discountOrFee"
>;

const ProjectPriceDetails: React.FC<ProjectPriceDetailsProps> = (props) => {
  const { subtotalPrice, totalPrice, totalTax, discountOrFee } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Full project cost
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isDiscountOrFee(discountOrFee) && (
            <TableRow>
              <TableCell>{discountOrFee.type}</TableCell>
              <TableCell align="right">
                {discountOrFee.__typename === "Discount" ? (
                  <>-{discountOrFee.discount}</>
                ) : (
                  <>+{discountOrFee.fees}</>
                )}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">{subtotalPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Tax</TableCell>
            <TableCell align="right">{totalTax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {totalPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export { ProjectPriceDetails };
