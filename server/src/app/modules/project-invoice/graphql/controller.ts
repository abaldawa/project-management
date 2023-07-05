/**
 * @author Abhijit Baldawa
 */

import * as projectModel from '../../../database/models/projects';
import * as currencyModel from '../../../database/models/currencies';
import * as projectPhaseModel from '../../../database/models/project-phases';
import * as costItemModel from '../../../database/models/cost-items';
import * as projectInvoiceService from '../../../modules/project-invoice/service';

const getProjectById = (_: undefined, args: { projectId: string }) =>
  projectModel.findProjectById(args.projectId);

const getProjectCurrency = (project: projectModel.Project) =>
  currencyModel.findCurrencyById(project.currencyId);

const getProjectSubtotalPrice = (project: projectModel.Project) =>
  projectInvoiceService.getProjectSubtotalPrice({
    id: project.id,
    discountOrFee: project.discountOrFee,
  });

const getProjectTotalPrice = (project: projectModel.Project) =>
  projectInvoiceService.getProjectTotalPrice({
    id: project.id,
    discountOrFee: project.discountOrFee,
  });

const getProjectTax = (project: projectModel.Project) =>
  projectInvoiceService.getProjectTax(project.id);

const getProjectPhases = (project: projectModel.Project) =>
  projectPhaseModel.getProjectPhasesByProjectId(project.id);

const getProjectPhaseSubtotalPrice = (
  projectPhase: projectPhaseModel.ProjectPhase
) =>
  projectInvoiceService.getProjectPhaseSubtotalPrice({
    id: projectPhase.id,
    discountOrFee: projectPhase.discountOrFee,
  });

const getProjectPhaseSubtotalTax = (
  projectPhase: projectPhaseModel.ProjectPhase
) => projectInvoiceService.getProjectPhaseSubtotalTax(projectPhase.id);

const getProjectPhaseCostItems = (
  projectPhase: projectPhaseModel.ProjectPhase
) => costItemModel.getCostItemsForPhase(projectPhase.id);

const getTotalCostOfCostItem = (costItem: costItemModel.CostItem) =>
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
