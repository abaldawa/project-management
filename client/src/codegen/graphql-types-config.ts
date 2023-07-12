/**
 * @author Abhijit Baldawa
 *
 * This modules exposes configuration to be used by graphql-codegen cli
 * to generate typescript types for graphql-schema and queries based on
 * graphql schema on the server
 */

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/project-management-service/graphql",
  documents: ["src/app/**/*.{ts,tsx}"],
  generates: {
    "./src/app/shared/graphql/generated/": {
      preset: "client",
      plugins: [],

      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
