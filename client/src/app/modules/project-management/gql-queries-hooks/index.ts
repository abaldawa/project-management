/**
 * @author Abhijit Baldawa
 */

import { useQuery, gql } from "@apollo/client";

const GET_PROJECT_INVOICE_GQL_QUERY = gql`
  query GetProjectInvoice($projectId: String!) {
    projectInvoice(projectId: $projectId) {
      name
      subtotalPrice
      totalPrice
      totalTax
      currency {
        name
        isoCode
        symbol
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

interface ProjectInvoiceGqlResponse {
  projectInvoice: {
    name: string;
    subtotalPrice: number;
    totalPrice: number;
    totalTax: number;
    currency: {
      name: string;
      isoCode: string;
      symbol: string;
    };
    discountOrFee?:
      | {
          type: "DISCOUNT";
          discount: number;
        }
      | {
          type: "FEES";
          fees: number;
        };

    phases: Array<{
      id: string;
      name: string;
      subtotalPrice: number;
      subtotalTax: number;
      discountOrFee?:
        | {
            type: "DISCOUNT";
            discount: number;
          }
        | {
            type: "FEES";
            fees: number;
          };
      costItems: Array<{
        id: string;
        description: string;
        taxRateInPercent: number;
        totalCost: number;
        billedBy:
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
      }>;
    }>;
  };
}

const useGetProjectInvoice = (projectId: string) =>
  useQuery<ProjectInvoiceGqlResponse>(GET_PROJECT_INVOICE_GQL_QUERY, {
    variables: { projectId },
  });

export { useGetProjectInvoice };
