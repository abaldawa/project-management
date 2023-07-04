/**
 * @author Abhijit Baldawa
 */

const graphqlSchema = `#graphql
  type Query {
    projectInvoice(projectId: String!): ProjectInvoice
  }

  type ProjectInvoice {
    name: String!
    currency: CurrencyDetails!
    discountOrFee: DiscountOrFee
    subtotalPrice: Float!
    totalPrice: Float!
    totalTax: Float!
    phases: [ProjectPhase!]!
  }

  type ProjectPhase {
    id: String!
    name: String!
    discountOrFee: DiscountOrFee
    subtotalPrice: Float!
    subtotalTax: Float!
    costItems: [CostItem!]!
  }

  type CostItem {
    id: String!
    description: String!
    taxRateInPercent: Float!
    totalCost: Float!
    billedBy: BilledBy!
  }

  type CurrencyDetails {
    id: String!
    name: String!
    isoCode: String!
    symbol: String!
  }

  union DiscountOrFee = Discount | Fee

  type Discount {
    type: String!
    discount: Float!
  }

  type Fee {
    type: String!
    fees: Float!
  }

  union BilledBy = Hour | Unit

  type Hour {
    type: String!
    totalHours: Int!
    costPerHour: Float!
  }

  type Unit {
    type: String!
    totalUnits: Int!
    costPerUnit: Float!
  }
`;

export { graphqlSchema };
