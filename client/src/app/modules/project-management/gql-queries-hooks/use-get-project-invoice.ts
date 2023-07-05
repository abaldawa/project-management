/**
 * @author Abhijit Baldawa
 */

import { useQuery, gql } from "@apollo/client";

type DiscountOrFee =
  | {
      type: "DISCOUNT";
      discount: number;
    }
  | {
      type: "FEES";
      fees: number;
    };

type BilledBy =
  | {
      type: "HOUR";
      totalHours: number;
      costPerHour: number;
    }
  | {
      type: "UNITS";
      totalUnits: number;
      costPerUnit: number;
    };

export interface ProjectInvoice {
  name: string;
  subtotalPrice: number;
  totalPrice: number;
  totalTax: number;
  currency: {
    isoCode: string;
  };
  discountOrFee?: DiscountOrFee;

  phases: Array<{
    id: string;
    name: string;
    subtotalPrice: number;
    subtotalTax: number;
    discountOrFee?: DiscountOrFee;
    costItems: Array<{
      id: string;
      description: string;
      taxRateInPercent: number;
      totalCost: number;
      billedBy: BilledBy;
    }>;
  }>;
}

interface ProjectInvoiceGqlResponse {
  projectInvoice: ProjectInvoice;
}

const GET_PROJECT_INVOICE_GQL_QUERY = gql`
  query GetProjectInvoice($projectId: String!) {
    projectInvoice(projectId: $projectId) {
      name
      subtotalPrice
      totalPrice
      totalTax
      currency {
        isoCode
      }
      discountOrFee {
        ... on Discount {
          type
          discount
        }

        ... on Fee {
          type
          fees
        }
      }
      phases {
        id
        name
        subtotalPrice
        subtotalTax
        costItems {
          id
          description
          taxRateInPercent
          totalCost
          billedBy {
            ... on Hour {
              type
              totalHours
              costPerHour
            }

            ... on Unit {
              type
              totalUnits
              costPerUnit
            }
          }
        }
        discountOrFee {
          ... on Discount {
            type
            discount
          }

          ... on Fee {
            type
            fees
          }
        }
      }
    }
  }
`;

const useGetProjectInvoice = (projectId: string) =>
  useQuery<ProjectInvoiceGqlResponse>(GET_PROJECT_INVOICE_GQL_QUERY, {
    variables: { projectId },
  });

export { useGetProjectInvoice };
