/**
 * @author Abhijit Baldawa
 *
 * This module contains graphql-resolvers for `project-invoice` module
 */

import { GraphQLError } from 'graphql';
import * as projectModel from '../../../database/models/projects';
import * as currencyModel from '../../../database/models/currencies';
import * as projectPhaseModel from '../../../database/models/project-phases';
import * as costItemModel from '../../../database/models/cost-items';
import * as projectInvoiceService from '../service';
import { Resolvers } from '../../../graphql/generated/resolvers-types';

type ResolverObj = Required<Resolvers>;

const getProjectById: NonNullable<ResolverObj['Query']['projectInvoice']> = (
  _,
  args
) => projectModel.findProjectById(args.projectId) || null;

const getProjectCurrency: NonNullable<
  ResolverObj['ProjectInvoice']['currency']
> = (project) => {
  const projectCurrency = currencyModel.findCurrencyById(project.currencyId);

  if (!projectCurrency) {
    throw new GraphQLError(
      `currencyId = '${project.currencyId}' not found in DB`
    );
  }

  return projectCurrency;
};

const getProjectSubtotalPrice: NonNullable<
  ResolverObj['ProjectInvoice']['subtotalPrice']
> = (project) =>
  projectInvoiceService.getProjectSubtotalPrice({
    id: project.id,
    discountOrFee: project.discountOrFee,
  });

const getProjectTotalPrice: NonNullable<
  ResolverObj['ProjectInvoice']['totalPrice']
> = (project) =>
  projectInvoiceService.getProjectTotalPrice({
    id: project.id,
    discountOrFee: project.discountOrFee,
  });

const getProjectTax: NonNullable<ResolverObj['ProjectInvoice']['totalTax']> = (
  project
) => projectInvoiceService.getProjectTax(project.id);

const getProjectPhases: NonNullable<ResolverObj['ProjectInvoice']['phases']> = (
  project
) => projectPhaseModel.getProjectPhasesByProjectId(project.id);

const getProjectPhaseSubtotalPrice: NonNullable<
  ResolverObj['ProjectPhase']['subtotalPrice']
> = (projectPhase) =>
  projectInvoiceService.getProjectPhaseSubtotalPrice({
    id: projectPhase.id,
    discountOrFee: projectPhase.discountOrFee,
  });

const getProjectPhaseSubtotalTax: NonNullable<
  ResolverObj['ProjectPhase']['subtotalTax']
> = (projectPhase) =>
  projectInvoiceService.getProjectPhaseSubtotalTax(projectPhase.id);

const getProjectPhaseCostItems: NonNullable<
  ResolverObj['ProjectPhase']['costItems']
> = (projectPhase) => costItemModel.getCostItemsForPhase(projectPhase.id);

const getTotalCostOfCostItem: NonNullable<
  ResolverObj['CostItem']['totalCost']
> = (costItem) =>
  projectInvoiceService.getTotalCostOfCostItem(costItem.billedBy);

export {
  getProjectById,
  getProjectCurrency,
  getProjectPhases,
  getProjectPhaseSubtotalPrice,
  getProjectPhaseSubtotalTax,
  getProjectPhaseCostItems,
  getProjectTotalPrice,
  getProjectSubtotalPrice,
  getProjectTax,
  getTotalCostOfCostItem,
};
