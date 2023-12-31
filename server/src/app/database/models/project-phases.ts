/**
 * @author Abhijit Baldawa
 */

import type { ProjectModel, DiscountOrFees } from './projects';

interface ProjectPhaseModel {
  /**
   * Database id of the project phase
   */
  id: string;

  /**
   * Name of the project phase
   */
  name: string;

  /**
   * Any discount or extra fee for a particular phase
   */
  discountOrFee?: DiscountOrFees;

  /**
   * Project to which this project phase belongs
   */
  projectId: ProjectModel['id'];
}

/**
 * Dummy mock relational table data for this model
 */
const mockProjectPhases: ProjectPhaseModel[] = [
  {
    id: 'c2a1ca0e-9eaa-4c57-a977-9f3676980ea0',
    name: 'Development',
    discountOrFee: {
      type: 'FEES',
      fees: 300,
    },
    projectId: '7225222f-faa2-48c9-bdba-e17fcf21a05b',
  },
  {
    id: '8986ff02-0bb5-4628-986d-09b084e6e03e',
    name: 'Testing',
    discountOrFee: {
      type: 'DISCOUNT',
      discount: 100,
    },
    projectId: '7225222f-faa2-48c9-bdba-e17fcf21a05b',
  },
  {
    id: '74f12956-bea6-424d-abb6-94b35eefcd6f',
    name: 'Deployment',
    discountOrFee: {
      type: 'DISCOUNT',
      discount: 50,
    },
    projectId: '7225222f-faa2-48c9-bdba-e17fcf21a05b',
  },
];

const getProjectPhasesByProjectId = (
  projectId: ProjectPhaseModel['projectId']
) =>
  mockProjectPhases.filter(
    (projectPhase) => projectPhase.projectId === projectId
  );

export { ProjectPhaseModel, getProjectPhasesByProjectId };
