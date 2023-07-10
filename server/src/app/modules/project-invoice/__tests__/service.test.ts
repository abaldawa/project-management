/**
 * @author Abhijit Baldawa
 */

import {
  getTotalCostOfCostItem,
  getProjectPhaseSubtotalPrice,
  getProjectPhaseSubtotalTax,
  getProjectSubtotalPrice,
  getProjectTax,
  getProjectTotalPrice,
} from '../service';
import * as costItemModel from '../../../database/models/cost-items';
import * as projectPhaseModel from '../../../database/models/project-phases';

// ------ Mocked static data with known calculations ------
const mockedCostItems: costItemModel.CostItem[] = [
  {
    id: 'mockCostItemId1',
    description: `mock description1`,
    taxRateInPercent: 20,
    billedBy: {
      type: 'HOUR',
      costPerHour: 150,
      totalHours: 100,
    },
    projectPhaseId: 'mockPhaseId1',
  },
  {
    id: 'mockCostItemId3',
    description: `mock description3`,
    taxRateInPercent: 0,
    billedBy: {
      type: 'UNITS',
      costPerUnit: 80,
      totalUnits: 8,
    },
    projectPhaseId: 'mockPhaseId1',
  },
];
const projectPhaseTotalItemsCost = 150 * 100 + 80 * 8;
const projectPhaseSubtotalTax = 150 * 100 * (20 / 100);

const getMockedProjectPhase = (
  discountOrFee?: projectPhaseModel.ProjectPhase['discountOrFee']
): [projectPhaseModel.ProjectPhase] => [
  {
    id: 'mock phase id',
    name: 'mock phase name',
    projectId: 'mock project id',
    discountOrFee,
  },
];
// ----------------------- END ---------------------------

/**
 * Mock the database models so we only test the service methods behavior
 * and not its dependencies.
 *
 * This also means we are not causing any side effects and no flaky tests
 */
jest.mock<typeof import('../../../database/models/cost-items')>(
  '../../../database/models/cost-items',
  () => ({
    getCostItemsForPhase: jest.fn().mockImplementation(() => mockedCostItems),
  })
);

jest.mock<typeof import('../../../database/models/project-phases')>(
  '../../../database/models/project-phases'
);

describe('project-invoice/service', () => {
  describe('#getTotalCostOfCostItem()', () => {
    it(`Should return total cost of cost item if billed by "HOUR"`, () => {
      const costPerHour = 15;
      const totalHours = 5;
      const totalCostOfCostItem = 15 * 5;

      expect(
        getTotalCostOfCostItem({
          type: 'HOUR',
          costPerHour,
          totalHours,
        })
      ).toBe(totalCostOfCostItem);
    });

    it(`Should return total cost of cost item if billed by "UNIT"`, () => {
      const costPerUnit = 15;
      const totalUnits = 5;
      const totalCostOfCostItem = 15 * 5;

      expect(
        getTotalCostOfCostItem({
          type: 'UNITS',
          costPerUnit,
          totalUnits,
        })
      ).toBe(totalCostOfCostItem);
    });
  });

  describe('#getProjectPhaseSubtotalPrice()', () => {
    it(`Should return project phase subtotal cost correctly if phase has no "discount" and "fee"`, () => {
      expect(
        getProjectPhaseSubtotalPrice({
          id: 'mockProjectPhaseId',
        })
      ).toBe(projectPhaseTotalItemsCost);
    });

    it(`Should return project phase subtotal cost correctly if phase has "discount"`, () => {
      const discount = 100;
      const projectPhaseSubtotalPrice = projectPhaseTotalItemsCost - discount;

      expect(
        getProjectPhaseSubtotalPrice({
          id: 'mockProjectPhaseId',
          discountOrFee: {
            type: 'DISCOUNT',
            discount,
          },
        })
      ).toBe(projectPhaseSubtotalPrice);
    });

    it(`Should return project phase subtotal cost correctly if phase has "fee"`, () => {
      const fees = 100;
      const projectPhaseSubtotalPrice = projectPhaseTotalItemsCost + fees;

      expect(
        getProjectPhaseSubtotalPrice({
          id: 'mockProjectPhaseId',
          discountOrFee: {
            type: 'FEES',
            fees,
          },
        })
      ).toBe(projectPhaseSubtotalPrice);
    });
  });

  describe('#getProjectPhaseSubtotalTax()', () => {
    it(`Should return project phase subtotal tax correctly`, () => {
      expect(getProjectPhaseSubtotalTax('mockProjectPhaseId')).toBe(
        projectPhaseSubtotalTax
      );
    });
  });

  describe('#getProjectSubtotalPrice()', () => {
    it(`Should return project subtotal price correctly if project and its phases have no "discount" and "fee"`, () => {
      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(getMockedProjectPhase());

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
        })
      ).toBe(projectPhaseTotalItemsCost);
    });

    it(`Should return project subtotal price correctly if project has no "discount" and "fee" but its phase has "discount"`, () => {
      const discount = 100;
      const projectSubtotalPrice = projectPhaseTotalItemsCost - discount;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'DISCOUNT',
          discount,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has no "discount" and "fee" but its phase has "fee"`, () => {
      const fees = 100;
      const projectSubtotalPrice = projectPhaseTotalItemsCost + fees;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'FEES',
          fees,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "discount" but its phase has no "discount" and "fee"`, () => {
      const projectDiscount = 100;
      const projectSubtotalPrice = projectPhaseTotalItemsCost - projectDiscount;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(getMockedProjectPhase());

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'DISCOUNT',
            discount: projectDiscount,
          },
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "fee" but its phase has no "discount" and "fee"`, () => {
      const projectFee = 100;
      const projectSubtotalPrice = projectPhaseTotalItemsCost + projectFee;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(getMockedProjectPhase());

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'FEES',
            fees: projectFee,
          },
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "discount" and its phase also has "discount"`, () => {
      const phaseDiscount = 50;
      const projectDiscount = 100;
      const projectSubtotalPrice =
        projectPhaseTotalItemsCost - projectDiscount - phaseDiscount;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'DISCOUNT',
          discount: phaseDiscount,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'DISCOUNT',
            discount: projectDiscount,
          },
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "discount" and its phase has "fee"`, () => {
      const phaseFee = 50;
      const projectDiscount = 100;
      const projectSubtotalPrice =
        projectPhaseTotalItemsCost - projectDiscount + phaseFee;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'FEES',
          fees: phaseFee,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'DISCOUNT',
            discount: projectDiscount,
          },
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "fee" and its phase has "discount"`, () => {
      const phaseDiscount = 50;
      const projectFee = 100;
      const projectSubtotalPrice =
        projectPhaseTotalItemsCost + projectFee - phaseDiscount;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'DISCOUNT',
          discount: phaseDiscount,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'FEES',
            fees: projectFee,
          },
        })
      ).toBe(projectSubtotalPrice);
    });

    it(`Should return project subtotal price correctly if project has "fee" and its phase also has "fee"`, () => {
      const phaseFee = 50;
      const projectFee = 100;
      const projectSubtotalPrice =
        projectPhaseTotalItemsCost + projectFee + phaseFee;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(
        getMockedProjectPhase({
          type: 'FEES',
          fees: phaseFee,
        })
      );

      expect(
        getProjectSubtotalPrice({
          id: 'mockProjectId',
          discountOrFee: {
            type: 'FEES',
            fees: projectFee,
          },
        })
      ).toBe(projectSubtotalPrice);
    });
  });

  describe('#getProjectTax()', () => {
    it(`Should return total tax for entire project cost`, () => {
      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValueOnce(getMockedProjectPhase());

      expect(getProjectTax('some project id')).toBe(projectPhaseSubtotalTax);
    });
  });

  describe('#getProjectTotalPrice()', () => {
    it(`Should return total price for entire project`, () => {
      const phaseDiscount = 100;
      const projectFee = 150;

      const projectCost =
        projectPhaseTotalItemsCost -
        phaseDiscount +
        projectFee +
        projectPhaseSubtotalTax;

      (
        projectPhaseModel.getProjectPhasesByProjectId as jest.Mock<
          ReturnType<typeof projectPhaseModel.getProjectPhasesByProjectId>
        >
      ).mockReturnValue(
        getMockedProjectPhase({
          type: 'DISCOUNT',
          discount: phaseDiscount,
        })
      );

      expect(
        getProjectTotalPrice({
          id: 'mock project id',
          discountOrFee: {
            type: 'FEES',
            fees: projectFee,
          },
        })
      ).toBe(projectCost);
    });
  });
});
