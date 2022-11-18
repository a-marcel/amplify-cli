## API Report File for "amplify-util-import"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Buckets } from 'aws-sdk/clients/s3';
import { GetUserPoolMfaConfigResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { IdentityPool } from 'aws-sdk/clients/cognitoidentity';
import { IdentityPoolShortDescription } from 'aws-sdk/clients/cognitoidentity';
import { IdentityProviderType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { TableDescription } from 'aws-sdk/clients/dynamodb';
import { TableName } from 'aws-sdk/clients/dynamodb';
import { UserPoolClientType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { UserPoolType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

// @public (undocumented)
export interface ICognitoUserPoolService {
    // (undocumented)
    getUserPoolDetails(userPoolId: string): Promise<UserPoolType>;
    // (undocumented)
    getUserPoolMfaConfig(userPoolId: string): Promise<GetUserPoolMfaConfigResponse>;
    // (undocumented)
    listUserPoolClients(userPoolId: string): Promise<UserPoolClientType[]>;
    // (undocumented)
    listUserPoolIdentityProviders(userPoolId: string): Promise<IdentityProviderType[]>;
    // (undocumented)
    listUserPools(): Promise<UserPoolDescriptionType[]>;
}

// @public (undocumented)
export interface IDynamoDBService {
    // (undocumented)
    getTableDetails(tableName: string): Promise<TableDescription>;
    // (undocumented)
    listTables(): Promise<TableName[]>;
    // (undocumented)
    tableExists(tableName: string): Promise<boolean>;
}

// @public (undocumented)
export interface IIdentityPoolService {
    // (undocumented)
    getIdentityPoolRoles(identityPoolId: string): Promise<{
        authRoleArn: string;
        authRoleName: string;
        unauthRoleArn: string;
        unauthRoleName: string;
    }>;
    // (undocumented)
    listIdentityPoolDetails(): Promise<IdentityPool[]>;
    // (undocumented)
    listIdentityPools(): Promise<IdentityPoolShortDescription[]>;
}

// @public (undocumented)
export interface IS3Service {
    // (undocumented)
    bucketExists(bucketName: string): Promise<boolean>;
    // (undocumented)
    getBucketLocation(bucketName: string): Promise<string>;
    // (undocumented)
    listBuckets(): Promise<Buckets>;
}

// (No @packageDocumentation comment for this package)

```