/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCertificates
// ====================================================

export interface createCertificates_createCertificates {
  __typename: "result";
  result: string;
}

export interface createCertificates {
  /**
   * createCertificates
   */
  createCertificates: createCertificates_createCertificates | null;
}

export interface createCertificatesVariables {
  userIds: any[];
  courseId: number;
  certificateType: string;
}
