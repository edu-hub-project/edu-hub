/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { University_enum, Employment_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_User_by_pk {
  __typename: "User";
  id: any;
  /**
   * The user's first name
   */
  firstName: string;
  /**
   * The user's last name
   */
  lastName: string;
  /**
   * The user's matriculation number at her/his university
   */
  matriculationNumber: string | null;
  /**
   * Name of the university the student is attending or working at (only provided if his/her university is not part of the provided list)
   */
  otherUniversity: string | null;
  /**
   * The university the user is attending or workin at (only provided if he is a student or working in academia)
   */
  university: University_enum | null;
  /**
   * The user's profile picture
   */
  picture: string | null;
  /**
   * A link to an external profile, for example in LinkedIn or Xing
   */
  externalProfile: string | null;
  /**
   * The user's current employment status
   */
  employment: Employment_enum | null;
  /**
   * The user's email address
   */
  email: string;
}

export interface User {
  /**
   * fetch data from the table: "User" using primary key columns
   */
  User_by_pk: User_User_by_pk | null;
}

export interface UserVariables {
  userId: any;
}
