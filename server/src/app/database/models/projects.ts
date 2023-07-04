/**
 * @author Abhijit Baldawa
 */

import type { Currency } from './currencies';

interface Project {
  id: string;
  name: string;
  discountOrFee?:
    | { type: 'DISCOUNT'; discount: number }
    | { type: 'FEES'; fees: number };
  currencyId: Currency['id'];
}

const mockProjects: Project[] = [
  {
    id: '7225222f-faa2-48c9-bdba-e17fcf21a05b',
    name: 'Software product',
    currencyId: 'f1e9ae8d-9946-45ad-9ead-4164940c2392',
    discountOrFee: {
      type: 'DISCOUNT',
      discount: 500,
    },
  },
];

const findProjectById = (projectId: string) =>
  mockProjects.find((project) => project.id === projectId);

const getAllProjects = () => mockProjects;

export { Project, getAllProjects, findProjectById };
