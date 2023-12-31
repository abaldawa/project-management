/**
 * @author Abhijit Baldawa
 *
 * This component displays the entire project phase price
 * breakdown along with project phase name
 */

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ProjectPhasePriceDetails } from "../project-phase-price-details/project-phase-price-details";
import { ProjectInvoice } from "../../gql-queries-hooks";
import * as S from "./project-phase-details.styles";

export type ProjectPhaseDetailsProps = ProjectInvoice["phases"][number];

export const ProjectPhaseDetails: React.FC<ProjectPhaseDetailsProps> = (
  props
) => {
  const { name, ...projectPhasePriceDetailsProps } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <S.Container>
      <S.PhaseTitleWrapper>
        <S.ExpandIconWrapper>
          <IconButton
            aria-label="expand row"
            size="small"
            centerRipple
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </S.ExpandIconWrapper>

        <S.PhaseTitle>{name}</S.PhaseTitle>
      </S.PhaseTitleWrapper>
      <S.CollapsiblePhasePriceDetailsWrapper in={expanded}>
        <ProjectPhasePriceDetails {...projectPhasePriceDetailsProps} />
      </S.CollapsiblePhasePriceDetailsWrapper>
    </S.Container>
  );
};
