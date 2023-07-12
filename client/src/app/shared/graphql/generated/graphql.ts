/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type BilledBy = Hour | Unit;

export type CostItem = {
  __typename?: "CostItem";
  billedBy: BilledBy;
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  taxRateInPercent: Scalars["Float"]["output"];
  totalCost: Scalars["Float"]["output"];
};

export type CurrencyDetails = {
  __typename?: "CurrencyDetails";
  id: Scalars["String"]["output"];
  isoCode: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
};

export type Discount = {
  __typename?: "Discount";
  discount: Scalars["Float"]["output"];
  type: Scalars["String"]["output"];
};

export type DiscountOrFee = Discount | Fee;

export type Fee = {
  __typename?: "Fee";
  fees: Scalars["Float"]["output"];
  type: Scalars["String"]["output"];
};

export type Hour = {
  __typename?: "Hour";
  costPerHour: Scalars["Float"]["output"];
  totalHours: Scalars["Int"]["output"];
  type: Scalars["String"]["output"];
};

export type ProjectInvoice = {
  __typename?: "ProjectInvoice";
  currency: CurrencyDetails;
  discountOrFee?: Maybe<DiscountOrFee>;
  name: Scalars["String"]["output"];
  phases: Array<ProjectPhase>;
  subtotalPrice: Scalars["Float"]["output"];
  totalPrice: Scalars["Float"]["output"];
  totalTax: Scalars["Float"]["output"];
};

export type ProjectPhase = {
  __typename?: "ProjectPhase";
  costItems: Array<CostItem>;
  discountOrFee?: Maybe<DiscountOrFee>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  subtotalPrice: Scalars["Float"]["output"];
  subtotalTax: Scalars["Float"]["output"];
};

export type Query = {
  __typename?: "Query";
  projectInvoice?: Maybe<ProjectInvoice>;
};

export type QueryProjectInvoiceArgs = {
  projectId: Scalars["String"]["input"];
};

export type Unit = {
  __typename?: "Unit";
  costPerUnit: Scalars["Float"]["output"];
  totalUnits: Scalars["Int"]["output"];
  type: Scalars["String"]["output"];
};

export type GetProjectInvoiceQueryVariables = Exact<{
  projectId: Scalars["String"]["input"];
}>;

export type GetProjectInvoiceQuery = {
  __typename?: "Query";
  projectInvoice?: {
    __typename?: "ProjectInvoice";
    name: string;
    subtotalPrice: number;
    totalPrice: number;
    totalTax: number;
    currency: { __typename?: "CurrencyDetails"; isoCode: string };
    discountOrFee?:
      | { __typename?: "Discount"; type: string; discount: number }
      | { __typename?: "Fee"; type: string; fees: number }
      | null;
    phases: Array<{
      __typename?: "ProjectPhase";
      id: string;
      name: string;
      subtotalPrice: number;
      subtotalTax: number;
      costItems: Array<{
        __typename?: "CostItem";
        id: string;
        description: string;
        taxRateInPercent: number;
        totalCost: number;
        billedBy:
          | {
              __typename?: "Hour";
              type: string;
              totalHours: number;
              costPerHour: number;
            }
          | {
              __typename?: "Unit";
              type: string;
              totalUnits: number;
              costPerUnit: number;
            };
      }>;
      discountOrFee?:
        | { __typename?: "Discount"; type: string; discount: number }
        | { __typename?: "Fee"; type: string; fees: number }
        | null;
    }>;
  } | null;
};

export const GetProjectInvoiceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetProjectInvoice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "projectId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectInvoice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "projectId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subtotalPrice" },
                },
                { kind: "Field", name: { kind: "Name", value: "totalPrice" } },
                { kind: "Field", name: { kind: "Name", value: "totalTax" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currency" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isoCode" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "discountOrFee" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "Discount" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "discount" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "Fee" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fees" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "phases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subtotalPrice" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subtotalTax" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "costItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "taxRateInPercent" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "totalCost" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "billedBy" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "InlineFragment",
                                    typeCondition: {
                                      kind: "NamedType",
                                      name: { kind: "Name", value: "Hour" },
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "type" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "totalHours",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "costPerHour",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "InlineFragment",
                                    typeCondition: {
                                      kind: "NamedType",
                                      name: { kind: "Name", value: "Unit" },
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "type" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "totalUnits",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "costPerUnit",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "discountOrFee" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "Discount" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "discount" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "Fee" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fees" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectInvoiceQuery,
  GetProjectInvoiceQueryVariables
>;
