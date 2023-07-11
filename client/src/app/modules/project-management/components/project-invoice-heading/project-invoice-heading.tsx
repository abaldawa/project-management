/**
 * @author Abhijit Baldawa
 *
 * This component displays the the project name and the
 * currency used
 */

import React from "react";
import * as S from "./project-invoice-heading.styles";
import { ProjectInvoice } from "../../gql-queries-hooks";

interface ProjectInvoiceHeadingProps {
  projectName: ProjectInvoice["name"];
  projectCurrency: ProjectInvoice["currency"]["isoCode"];
}

const ProjectInvoiceHeading: React.FC<ProjectInvoiceHeadingProps> = (props) => {
  const { projectName, projectCurrency } = props;

  return (
    <S.Container>
      <S.LabelContainer>
        <S.Label fontWeight="bold">Project name:</S.Label>
        <S.Label>{projectName}</S.Label>
      </S.LabelContainer>
      <S.LabelContainer>
        <S.Label fontWeight="bold">Currency:</S.Label>
        <S.Label>{projectCurrency}</S.Label>
      </S.LabelContainer>
    </S.Container>
  );
};

export { ProjectInvoiceHeading };
