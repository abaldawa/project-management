/**
 * @author Abhijit Baldawa
 */

import * as projectPhaseModel from '../../database/models/project-phases';
import * as costItemModel from '../../database/models/cost-items';
import * as projectModel from '../../database/models/projects';

const getTotalCostOfCostItem = (costItem: costItemModel.CostItem) => {
  if (costItem.billedBy.type === 'HOUR') {
    return costItem.billedBy.totalHours * costItem.billedBy.costPerHour;
  }
  return costItem.billedBy.totalUnits * costItem.billedBy.costPerUnit;
};

const getProjectPhaseSubtotalPrice = (
  projectPhase: projectPhaseModel.ProjectPhase
) => {
  const totalItemsCost = costItemModel
    .getCostItemsForPhase(projectPhase.id)
    .reduce(
      (totalCost, costItem) => totalCost + getTotalCostOfCostItem(costItem),
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
  projectPhase: projectPhaseModel.ProjectPhase
) =>
  costItemModel
    .getCostItemsForPhase(projectPhase.id)
    .reduce((totalTax, costItem) => {
      return (
        totalTax +
        getTotalCostOfCostItem(costItem) * (costItem.taxRateInPercent / 100)
      );
    }, 0);

const getProjectSubtotalPrice = (project: projectModel.Project) => {
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

const getProjectTax = (project: projectModel.Project) => {
  const projectPhases = projectPhaseModel.getProjectPhasesByProjectId(
    project.id
  );

  const totalPhasesTax = projectPhases.reduce(
    (totalTax, projectPhase) =>
      totalTax + getProjectPhaseSubtotalTax(projectPhase),
    0
  );

  return totalPhasesTax;
};

const getProjectTotalPrice = (project: projectModel.Project) =>
  getProjectSubtotalPrice(project) + getProjectTax(project);

export {
  getProjectPhaseSubtotalPrice,
  getProjectPhaseSubtotalTax,
  getProjectSubtotalPrice,
  getProjectTax,
  getProjectTotalPrice,
  getTotalCostOfCostItem,
};
