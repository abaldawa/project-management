/**
 * @author Abhijit Baldawa
 *
 * Graphql react hook to query entire project invoice
 * from the backend graphQL server
 */

import { useQuery } from "@apollo/client";
import { gql } from "../../../shared/graphql/generated";
import { GetProjectInvoiceQuery } from "../../../shared/graphql/generated/graphql";

/**
 * Graphql query response
 */
type ProjectInvoice = NonNullable<GetProjectInvoiceQuery["projectInvoice"]>;

/**
 * Discriminated Union type of `DiscountOrFee` structure in both
 * the project and phase
 */
type DiscountOrFee = NonNullable<ProjectInvoice["discountOrFee"]>;

/**
 * @public
 *
 * Checks whether the provided object conforms to
 * discountOrFee discriminated union type
 *
 * @param discountOrFee
 * @returns
 */
const isDiscountOrFee = (
  discountOrFee?: DiscountOrFee | null
): discountOrFee is Required<DiscountOrFee> => {
  return Boolean(discountOrFee?.__typename);
};

const GET_PROJECT_INVOICE_GQL_QUERY = gql(/* GraphQL */ `
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
`);

const useGetProjectInvoice = (projectId: string) =>
  useQuery(GET_PROJECT_INVOICE_GQL_QUERY, {
    variables: { projectId },
  });

export type { ProjectInvoice };
export { useGetProjectInvoice, isDiscountOrFee };
