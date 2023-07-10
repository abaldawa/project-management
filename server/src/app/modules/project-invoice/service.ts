/**
 * @author Abhijit Baldawa
 *
 * This module contains the business logic functions to perform
 * invoice calculations
 */

import * as projectPhaseModel from '../../database/models/project-phases';
import * as costItemModel from '../../database/models/cost-items';
import * as projectModel from '../../database/models/projects';

/**
 * @public
 *
 * Calculates the total cost of the cost item
 * based on its `billedBy` property which is
 * either by `HOUR` or `UNITS`
 *
 * @param billedBy - billing cost information for a cost item
 */
const getTotalCostOfCostItem = (
  billedBy: costItemModel.CostItem['billedBy']
) => {
  if (billedBy.type === 'HOUR') {
    return billedBy.totalHours * billedBy.costPerHour;
  }
  return billedBy.totalUnits * billedBy.costPerUnit;
};

/**
 * @public
 *
 * Calculates the subtotal price for a single project phase
 * by including any available discount or extra incurred fee
 * for the phase
 *
 * @param projectPhase - phased for which subtotal price
 *                       needs to be calculated
 */
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

/**
 * @public
 *
 * Calculates the subtotal tax for a single project phase
 * by applying applicable tax percentages to individual
 * cost items for that phases
 *
 * @param projectPhaseId - phased id for which subtotal tax
 *                         needs to be calculated
 */
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

/**
 * @public
 *
 * Calculates the entire project subtotal price by
 * calculating the subtotal price of individual phases
 * including their discounts/fees and also takes into
 * account the project level discount/fee
 *
 * @param project - project for which subtotal price needs
 *                  to be calculated
 */
const getProjectSubtotalPrice = (
  project: Pick<projectModel.Project, 'id' | 'discountOrFee'>
) => {
  const projectPhases = projectPhaseModel.getProjectPhasesByProjectId(
    project.id
  );

  const totalPhasesCost = projectPhases.reduce(
    (totalCost, projectPhase) =>
      totalCost +
      getProjectPhaseSubtotalPrice({
        id: projectPhase.id,
        discountOrFee: projectPhase.discountOrFee,
      }),
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

/**
 * @public
 *
 * Calculates the entire project tax by calculating the
 * subtotal tax of each individual phase for that project
 *
 * @param projectId - id of the project for which total tax needs
 *                    to be calculated
 */
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

/**
 * @public
 *
 * Calculates the final price of the entire project by
 * calculating the subtotal price of the project based on
 * the subtotal price of individual phases and total incurred
 * tax for individual cost items within every project phase.
 *
 * This also takes into account all the discount/fee for all the
 * phases and one time discount/fee at the project level
 *
 * @param project - project for which the total prices needs to be calculated
 */
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
