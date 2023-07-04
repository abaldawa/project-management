/**
 * @author Abhijit Baldawa
 */

import React from "react";
import * as S from "./project-invoice-heading.styles";

interface KeyValueLabel {
  projectName: string;
  projectCurrency: string;
}

const ProjectInvoiceHeading: React.FC<KeyValueLabel> = (props) => {
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
