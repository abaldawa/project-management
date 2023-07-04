/**
 * @author Abhijit Baldawa
 */

import * as projectModel from '../database/models/projects';
import * as costItemModel from '../database/models/cost-items';
import { projectInvoiceResolvers } from './resolvers';

const resolverMap = {
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
    __resolveType: (discountOrFee: projectModel.Project['discountOrFee']) => {
      if (discountOrFee?.type === 'DISCOUNT') {
        return 'Discount';
      }
      // Only Book has a title field
      if (discountOrFee?.type === 'FEES') {
        return 'Fee';
      }
      return null; // GraphQLError is thrown
    },
  },

  BilledBy: {
    __resolveType: (billedBy: costItemModel.CostItem['billedBy']) => {
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
