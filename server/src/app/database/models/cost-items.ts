/**
 * @author Abhijit Baldawa
 */

import { ProjectPhase } from './project-phases';

interface CostItem {
  id: string;
  description: string;
  taxRateInPercent: 0 | 8 | 12 | 20; // one of three tax rates, incl. 0%, is added
  billedBy:
    | {
        type: 'HOUR';
        totalHours: number;
        costPerHour: number;
      }
    | {
        type: 'UNITS';
        totalUnits: number;
        costPerUnit: number;
      };
  projectPhaseId: ProjectPhase['id'];
}

const mockCostItems: CostItem[] = [
  {
    id: '2fe034f6-bda0-4715-bf7e-eba99de565ec',
    description: `Senior developers work`,
    taxRateInPercent: 20,
    billedBy: {
      type: 'HOUR',
      costPerHour: 150,
      totalHours: 100,
    },
    projectPhaseId: 'c2a1ca0e-9eaa-4c57-a977-9f3676980ea0',
  },
  {
    id: 'd3205eb8-998c-4e53-a397-108ef8a229d7',
    description: `Mid-senior developers work`,
    taxRateInPercent: 12,
    billedBy: {
      type: 'HOUR',
      costPerHour: 100,
      totalHours: 120,
    },
    projectPhaseId: 'c2a1ca0e-9eaa-4c57-a977-9f3676980ea0',
  },
  {
    id: '8966dbc5-99da-45f1-82c4-95408dd9ed8c',
    description: `Junior developers work`,
    taxRateInPercent: 0,
    billedBy: {
      type: 'UNITS',
      costPerUnit: 80,
      totalUnits: 8,
    },
    projectPhaseId: 'c2a1ca0e-9eaa-4c57-a977-9f3676980ea0',
  },

  {
    id: '1126c956-a0d4-4388-aa02-a51bece05905',
    description: `Senior QA`,
    taxRateInPercent: 12,
    billedBy: {
      type: 'UNITS',
      costPerUnit: 100,
      totalUnits: 4,
    },
    projectPhaseId: '8986ff02-0bb5-4628-986d-09b084e6e03e',
  },
  {
    id: '3cebf834-b532-4c9e-bbb6-391001ef99c0',
    description: `Junior QA`,
    taxRateInPercent: 0,
    billedBy: {
      type: 'UNITS',
      costPerUnit: 50,
      totalUnits: 4,
    },
    projectPhaseId: '8986ff02-0bb5-4628-986d-09b084e6e03e',
  },

  {
    id: '0ae8ec32-acce-45c2-912d-21ccf417a9c8',
    description: `Freelance DevOps`,
    taxRateInPercent: 20,
    billedBy: {
      type: 'HOUR',
      costPerHour: 200,
      totalHours: 40,
    },
    projectPhaseId: '74f12956-bea6-424d-abb6-94b35eefcd6f',
  },
];

const getCostItemsForPhase = (projectPhaseId: CostItem['projectPhaseId']) =>
  mockCostItems.filter(
    (costItem) => costItem.projectPhaseId === projectPhaseId
  );

export { CostItem, getCostItemsForPhase };
