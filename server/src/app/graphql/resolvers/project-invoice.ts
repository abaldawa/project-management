/**
 * @author Abhijit Baldawa
 */

import * as projectModel from '../../database/models/projects';
import * as currencyModel from '../../database/models/currencies';
import * as projectPhaseModel from '../../database/models/project-phases';
import * as costItemModel from '../../database/models/cost-items';
import * as projectInvoiceService from '../../modules/project-invoice/service';

const getProjectById = (_: undefined, args: { projectId: string }) =>
  projectModel.findProjectById(args.projectId);

const getProjectCurrency = (project: projectModel.Project) =>
  currencyModel.findCurrencyById(project.currencyId);

const getProjectSubtotalPrice = (project: projectModel.Project) =>
  projectInvoiceService.getProjectSubtotalPrice(project);

const getProjectTotalPrice = (project: projectModel.Project) =>
  projectInvoiceService.getProjectTotalPrice(project);

const getProjectTax = (project: projectModel.Project) =>
  projectInvoiceService.getProjectTax(project);

const getProjectPhases = (project: projectModel.Project) =>
  projectPhaseModel.getProjectPhasesByProjectId(project.id);

const getProjectPhaseSubtotalPrice = (
  projectPhase: projectPhaseModel.ProjectPhase
) => projectInvoiceService.getProjectPhaseSubtotalPrice(projectPhase);

const getProjectPhaseSubtotalTax = (
  projectPhase: projectPhaseModel.ProjectPhase
) => projectInvoiceService.getProjectPhaseSubtotalTax(projectPhase);

const getProjectPhaseCostItems = (
  projectPhase: projectPhaseModel.ProjectPhase
) => costItemModel.getCostItemsForPhase(projectPhase.id);

const getTotalCostOfCostItem = (costItem: costItemModel.CostItem) =>
  projectInvoiceService.getTotalCostOfCostItem(costItem);

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
