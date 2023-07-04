/**
 * @author Abhijit Baldawa
 */

import type { Project } from './projects';

interface ProjectPhase {
  id: string;
  name: string;
  discountOrFee?:
    | { type: 'DISCOUNT'; discount: number }
    | { type: 'FEES'; fees: number };

  projectId: Project['id'];
}

const mockProjectPhases: ProjectPhase[] = [
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

const findProjectPhaseById = (projectPhaseId: ProjectPhase['id']) =>
  mockProjectPhases.find((projectPhase) => projectPhase.id === projectPhaseId);

const getProjectPhasesByProjectId = (projectId: ProjectPhase['projectId']) =>
  mockProjectPhases.filter(
    (projectPhase) => projectPhase.projectId === projectId
  );

export { ProjectPhase, findProjectPhaseById, getProjectPhasesByProjectId };
