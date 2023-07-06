/**
 * @author Abhijit Baldawa
 *
 * Container component which displays the entire project
 * invoice details and breakdown of its individual phases
 * cost description
 */

import React from "react";
import { ProjectPriceDetails } from "../../components/project-price-details/project-price-details";
import { ProjectPhaseDetails } from "../../components/project-phase-details/project-phase-details";
import { ProjectInvoiceHeading } from "../../components/project-invoice-heading/project-invoice-heading";
import { useGetProjectInvoice } from "../../gql-queries-hooks";
import * as S from "./project-invoice.styles";

interface ProjectInvoiceProps {
  projectId: string;
  children?: never;
}

const ProjectInvoice: React.FC<ProjectInvoiceProps> = ({ projectId }) => {
  const {
    loading,
    error,
    data: { projectInvoice } = {},
  } = useGetProjectInvoice(projectId);

  if (loading) {
    /**
     * Ideally we show the loading in the loader
     * component but for the exercise handling it inline
     */
    return <h3>Loading project invoice...</h3>;
  }

  if (error) {
    /**
     * Ideally we show the error details in the popup but
     * for the exercise handling it inline
     */
    return <h3>Oops! failed to fetch project invoice.</h3>;
  }

  if (!projectInvoice) {
    return null;
  }

  return (
    <S.Container>
      <ProjectInvoiceHeading
        projectName={projectInvoice.name}
        projectCurrency={projectInvoice.currency.isoCode}
      />
      {Boolean(projectInvoice.phases.length) && (
        <S.PhasesWrapper>
          {projectInvoice.phases.map((projectPhase) => (
            <ProjectPhaseDetails key={projectPhase.id} {...projectPhase} />
          ))}
        </S.PhasesWrapper>
      )}
      <S.ProjectPriceDetailsWrapper>
        <ProjectPriceDetails
          subtotalPrice={projectInvoice.subtotalPrice}
          totalPrice={projectInvoice.totalPrice}
          totalTax={projectInvoice.totalTax}
          discountOrFee={projectInvoice.discountOrFee}
        />
      </S.ProjectPriceDetailsWrapper>
    </S.Container>
  );
};

export { ProjectInvoice };
