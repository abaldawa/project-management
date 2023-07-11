/**
 * @author Abhijit Baldawa
 */

import type { CurrencyModel } from './currencies';

type DiscountOrFees =
  | { type: 'DISCOUNT'; discount: number }
  | { type: 'FEES'; fees: number };

interface ProjectModel {
  /**
   * Database id of the project
   */
  id: string;

  /**
   * Name of the project
   */
  name: string;

  /**
   * Any discount of extra fee for the entire project
   */
  discountOrFee?: DiscountOrFees;

  /**
   * Points to the currency this project uses
   */
  currencyId: CurrencyModel['id'];
}

/**
 * Dummy mock relational table data for this model
 */
const mockProjects: ProjectModel[] = [
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

export { DiscountOrFees, ProjectModel, findProjectById };
