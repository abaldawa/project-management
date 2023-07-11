import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/app/graphql/schema.graphql',
  generates: {
    './src/app/graphql/generated/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          ProjectInvoice: '../../database/models/projects#ProjectModel',
          ProjectPhase:
            '../../database/models/project-phases#ProjectPhaseModel',
          CostItem: '../../database/models/cost-items#CostItemModel',
          DiscountOrFee: '../../database/models/projects#DiscountOrFees',
          BilledBy: '../../database/models/cost-items#BilledByInfo',
        },
      },
    },
  },
};

export default config;
