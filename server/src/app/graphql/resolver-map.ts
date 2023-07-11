/**
 * @author Abhijit Baldawa
 */

import * as projectInvoiceResolvers from '../modules/project-invoice/graphql/resolvers';
import { Resolvers } from './generated/resolvers-types';

const resolverMap: Resolvers = {
  Query: {
    projectInvoice: projectInvoiceResolvers.getProjectById,
  },

  ProjectInvoice: {
    currency: projectInvoiceResolvers.getProjectCurrency,
    phases: projectInvoiceResolvers.getProjectPhases,
    subtotalPrice: projectInvoiceResolvers.getProjectSubtotalPrice,
    totalPrice: projectInvoiceResolvers.getProjectTotalPrice,
    totalTax: projectInvoiceResolvers.getProjectTax,
  },

  ProjectPhase: {
    subtotalPrice: projectInvoiceResolvers.getProjectPhaseSubtotalPrice,
    subtotalTax: projectInvoiceResolvers.getProjectPhaseSubtotalTax,
    costItems: projectInvoiceResolvers.getProjectPhaseCostItems,
  },

  CostItem: {
    totalCost: projectInvoiceResolvers.getTotalCostOfCostItem,
  },

  DiscountOrFee: {
    __resolveType: (discountOrFee) => {
      if (discountOrFee?.type === 'DISCOUNT') {
        return 'Discount';
      }

      if (discountOrFee?.type === 'FEES') {
        return 'Fee';
      }
      return null; // GraphQLError is thrown
    },
  },

  BilledBy: {
    __resolveType: (billedBy) => {
      if (billedBy.type === 'HOUR') {
        return 'Hour';
      }

      if (billedBy.type === 'UNITS') {
        return 'Unit';
      }
      return null; // GraphQLError is thrown
    },
  },
} as const;

export { resolverMap };
