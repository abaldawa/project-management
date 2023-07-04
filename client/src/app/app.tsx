/**
 * @author Abhijit Baldawa
 */

/**
 * @author Abhijit Baldawa
 */

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ProjectInvoice } from "./modules/project-management/containers/project-invoice/project-invoice";
import { PROJECT_ID } from "./shared/constants/project";
import { PageContainer } from "./shared/layouts/page-container.styles";
import { GraphqlProvider } from "./providers/graphql";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <GraphqlProvider>
        <PageContainer>
          <ProjectInvoice projectId={PROJECT_ID} />
        </PageContainer>
      </GraphqlProvider>
    </>
  );
};

export { App };
