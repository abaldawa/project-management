import { GraphQLResolveInfo } from 'graphql';
import { ProjectModel, DiscountOrFees } from '../../database/models/projects';
import { ProjectPhaseModel } from '../../database/models/project-phases';
import { CostItemModel, BilledByInfo } from '../../database/models/cost-items';

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
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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
  __typename?: 'CostItem';
  billedBy: BilledBy;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  taxRateInPercent: Scalars['Float']['output'];
  totalCost: Scalars['Float']['output'];
};

export type CurrencyDetails = {
  __typename?: 'CurrencyDetails';
  id: Scalars['String']['output'];
  isoCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Discount = {
  __typename?: 'Discount';
  discount: Scalars['Float']['output'];
  type: Scalars['String']['output'];
};

export type DiscountOrFee = Discount | Fee;

export type Fee = {
  __typename?: 'Fee';
  fees: Scalars['Float']['output'];
  type: Scalars['String']['output'];
};

export type Hour = {
  __typename?: 'Hour';
  costPerHour: Scalars['Float']['output'];
  totalHours: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type ProjectInvoice = {
  __typename?: 'ProjectInvoice';
  currency: CurrencyDetails;
  discountOrFee?: Maybe<DiscountOrFee>;
  name: Scalars['String']['output'];
  phases: Array<ProjectPhase>;
  subtotalPrice: Scalars['Float']['output'];
  totalPrice: Scalars['Float']['output'];
  totalTax: Scalars['Float']['output'];
};

export type ProjectPhase = {
  __typename?: 'ProjectPhase';
  costItems: Array<CostItem>;
  discountOrFee?: Maybe<DiscountOrFee>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subtotalPrice: Scalars['Float']['output'];
  subtotalTax: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  projectInvoice?: Maybe<ProjectInvoice>;
};

export type QueryProjectInvoiceArgs = {
  projectId: Scalars['String']['input'];
};

export type Unit = {
  __typename?: 'Unit';
  costPerUnit: Scalars['Float']['output'];
  totalUnits: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BilledBy: ResolverTypeWrapper<BilledByInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CostItem: ResolverTypeWrapper<CostItemModel>;
  CurrencyDetails: ResolverTypeWrapper<CurrencyDetails>;
  Discount: ResolverTypeWrapper<Discount>;
  DiscountOrFee: ResolverTypeWrapper<DiscountOrFees>;
  Fee: ResolverTypeWrapper<Fee>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Hour: ResolverTypeWrapper<Hour>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ProjectInvoice: ResolverTypeWrapper<ProjectModel>;
  ProjectPhase: ResolverTypeWrapper<ProjectPhaseModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Unit: ResolverTypeWrapper<Unit>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BilledBy: BilledByInfo;
  Boolean: Scalars['Boolean']['output'];
  CostItem: CostItemModel;
  CurrencyDetails: CurrencyDetails;
  Discount: Discount;
  DiscountOrFee: DiscountOrFees;
  Fee: Fee;
  Float: Scalars['Float']['output'];
  Hour: Hour;
  Int: Scalars['Int']['output'];
  ProjectInvoice: ProjectModel;
  ProjectPhase: ProjectPhaseModel;
  Query: {};
  String: Scalars['String']['output'];
  Unit: Unit;
};

export type BilledByResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BilledBy'] = ResolversParentTypes['BilledBy']
> = {
  __resolveType: TypeResolveFn<'Hour' | 'Unit', ParentType, ContextType>;
};

export type CostItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CostItem'] = ResolversParentTypes['CostItem']
> = {
  billedBy?: Resolver<ResolversTypes['BilledBy'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxRateInPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CurrencyDetails'] = ResolversParentTypes['CurrencyDetails']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isoCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Discount'] = ResolversParentTypes['Discount']
> = {
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountOrFeeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DiscountOrFee'] = ResolversParentTypes['DiscountOrFee']
> = {
  __resolveType: TypeResolveFn<'Discount' | 'Fee', ParentType, ContextType>;
};

export type FeeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Fee'] = ResolversParentTypes['Fee']
> = {
  fees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HourResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Hour'] = ResolversParentTypes['Hour']
> = {
  costPerHour?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalHours?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectInvoiceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectInvoice'] = ResolversParentTypes['ProjectInvoice']
> = {
  currency?: Resolver<
    ResolversTypes['CurrencyDetails'],
    ParentType,
    ContextType
  >;
  discountOrFee?: Resolver<
    Maybe<ResolversTypes['DiscountOrFee']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phases?: Resolver<
    Array<ResolversTypes['ProjectPhase']>,
    ParentType,
    ContextType
  >;
  subtotalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalTax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectPhaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectPhase'] = ResolversParentTypes['ProjectPhase']
> = {
  costItems?: Resolver<
    Array<ResolversTypes['CostItem']>,
    ParentType,
    ContextType
  >;
  discountOrFee?: Resolver<
    Maybe<ResolversTypes['DiscountOrFee']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtotalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  subtotalTax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  projectInvoice?: Resolver<
    Maybe<ResolversTypes['ProjectInvoice']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectInvoiceArgs, 'projectId'>
  >;
};

export type UnitResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Unit'] = ResolversParentTypes['Unit']
> = {
  costPerUnit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BilledBy?: BilledByResolvers<ContextType>;
  CostItem?: CostItemResolvers<ContextType>;
  CurrencyDetails?: CurrencyDetailsResolvers<ContextType>;
  Discount?: DiscountResolvers<ContextType>;
  DiscountOrFee?: DiscountOrFeeResolvers<ContextType>;
  Fee?: FeeResolvers<ContextType>;
  Hour?: HourResolvers<ContextType>;
  ProjectInvoice?: ProjectInvoiceResolvers<ContextType>;
  ProjectPhase?: ProjectPhaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
};
