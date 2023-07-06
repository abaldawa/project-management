/**
 * @author Abhijit Baldawa
 *
 * This module contains the business logic function to perform
 * invoice calculations
 */

import * as projectPhaseModel from '../../database/models/project-phases';
import * as costItemModel from '../../database/models/cost-items';
import * as projectModel from '../../database/models/projects';

const getTotalCostOfCostItem = (
  billedBy: costItemModel.CostItem['billedBy']
) => {
  if (billedBy.type === 'HOUR') {
    return billedBy.totalHours * billedBy.costPerHour;
  }
  return billedBy.totalUnits * billedBy.costPerUnit;
};

const getProjectPhaseSubtotalPrice = (
  projectPhase: Pick<projectPhaseModel.ProjectPhase, 'id' | 'discountOrFee'>
) => {
  const totalItemsCost = costItemModel
    .getCostItemsForPhase(projectPhase.id)
    .reduce(
      (totalCost, costItem) =>
        totalCost + getTotalCostOfCostItem(costItem.billedBy),
      0
    );

  let discountOrFee = 0;

  if (projectPhase.discountOrFee) {
    discountOrFee =
      projectPhase.discountOrFee.type === 'DISCOUNT'
        ? -projectPhase.discountOrFee.discount
        : projectPhase.discountOrFee.fees;
  }
  return totalItemsCost + discountOrFee;
};

const getProjectPhaseSubtotalTax = (
  projectPhaseId: projectPhaseModel.ProjectPhase['id']
) =>
  costItemModel
    .getCostItemsForPhase(projectPhaseId)
    .reduce((totalTax, costItem) => {
      return (
        totalTax +
        getTotalCostOfCostItem(costItem.billedBy) *
          (costItem.taxRateInPercent / 100)
      );
    }, 0);

const getProjectSubtotalPrice = (
  project: Pick<projectModel.Project, 'id' | 'discountOrFee'>
) => {
  const projectPhases = projectPhaseModel.getProjectPhasesByProjectId(
    project.id
  );

  const totalPhasesCost = projectPhases.reduce(
    (totalCost, projectPhase) =>
      totalCost + getProjectPhaseSubtotalPrice(projectPhase),
    0
  );

  let discountOrFee = 0;

  if (project.discountOrFee) {
    discountOrFee =
      project.discountOrFee.type === 'DISCOUNT'
        ? -project.discountOrFee.discount
        : project.discountOrFee.fees;
  }

  return totalPhasesCost + discountOrFee;
};

const getProjectTax = (projectId: projectModel.Project['id']) => {
  const projectPhases =
    projectPhaseModel.getProjectPhasesByProjectId(projectId);

  const totalPhasesTax = projectPhases.reduce(
    (totalTax, projectPhase) =>
      totalTax + getProjectPhaseSubtotalTax(projectPhase.id),
    0
  );

  return totalPhasesTax;
};

const getProjectTotalPrice = (
  project: Pick<projectModel.Project, 'id' | 'discountOrFee'>
) => getProjectSubtotalPrice(project) + getProjectTax(project.id);

export {
  getProjectPhaseSubtotalPrice,
  getProjectPhaseSubtotalTax,
  getProjectSubtotalPrice,
  getProjectTax,
  getProjectTotalPrice,
  getTotalCostOfCostItem,
};
