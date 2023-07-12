/**
 * @author Abhijit Baldawa
 *
 * This component displays the entire individual project phase
 * cost details
 */

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { isDiscountOrFee } from "../../gql-queries-hooks";
import type { ProjectPhaseDetailsProps } from "../project-phase-details/project-phase-details";
import * as S from "./project-phase-price-details.styles";

interface ProjectPhasePriceDetailsProps
  extends Omit<ProjectPhaseDetailsProps, "name" | "id"> {}

const ProjectPhasePriceDetails: React.FC<ProjectPhasePriceDetailsProps> = (
  props
) => {
  const { costItems, subtotalPrice, subtotalTax, discountOrFee } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <S.TableHeadGroupCell align="center" width="25%" borderRight>
              Details
            </S.TableHeadGroupCell>
            <S.TableHeadGroupCell align="center" colSpan={2} borderRight>
              Cost per hour
            </S.TableHeadGroupCell>
            <S.TableHeadGroupCell align="center" colSpan={2} borderRight>
              Cost per unit
            </S.TableHeadGroupCell>
            <S.TableHeadGroupCell align="center" colSpan={2}>
              Price & Tax
            </S.TableHeadGroupCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid" }}>
              Cost item
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total hours
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", borderRight: "1px solid" }}
            >
              Cost per hour
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total units
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", borderRight: "1px solid" }}
            >
              Cost per unit
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tax rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {costItems.map((costItem) => (
            <TableRow key={costItem.id}>
              <TableCell sx={{ borderRight: "1px solid" }}>
                {costItem.description}
              </TableCell>

              {costItem.billedBy.__typename &&
              costItem.billedBy.__typename === "Hour" ? (
                <>
                  <TableCell align="right">
                    {costItem.billedBy.totalHours}
                  </TableCell>
                  <TableCell align="right" sx={{ borderRight: "1px solid" }}>
                    {costItem.billedBy.costPerHour}
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={2} sx={{ borderRight: "1px solid" }} />
              )}

              {costItem.billedBy.__typename &&
              costItem.billedBy.__typename === "Unit" ? (
                <>
                  <TableCell align="right">
                    {costItem.billedBy.totalUnits}
                  </TableCell>
                  <TableCell align="right" sx={{ borderRight: "1px solid" }}>
                    {costItem.billedBy.costPerUnit}
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={2} sx={{ borderRight: "1px solid" }} />
              )}

              <TableCell align="right">{costItem.totalCost}</TableCell>
              <TableCell align="right">{costItem.taxRateInPercent}%</TableCell>
            </TableRow>
          ))}

          {isDiscountOrFee(discountOrFee) && (
            <TableRow>
              <TableCell rowSpan={2} colSpan={4} />
              <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid" }}>
                {discountOrFee.type}
              </TableCell>
              <TableCell align="right">
                {discountOrFee.__typename === "Discount" ? (
                  <>-{discountOrFee.discount}</>
                ) : (
                  <>+{discountOrFee.fees}</>
                )}
              </TableCell>
              <TableCell />
            </TableRow>
          )}

          <TableRow>
            {!discountOrFee && <TableCell colSpan={4} />}
            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid" }}>
              Subtotal
            </TableCell>
            <TableCell align="right">{subtotalPrice}</TableCell>
            <TableCell align="right">{subtotalTax}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ProjectPhasePriceDetails };
