/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Programs
// ====================================================

export interface Programs_Program {
  __typename: "Program";
  id: number;
  /**
   * The title of the program
   */
  title: string;
  /**
   * The 6 letter short title for the program.
   */
  shortTitle: string | null;
  /**
   * The first day a course lecture can possibly be in this program.
   */
  lectureStart: any | null;
  /**
   * The last day a course lecture can possibly be in this program.
   */
  lectureEnd: any | null;
  /**
   * The deadline for the achievement record uploads.
   */
  achievementRecordUploadDeadline: any | null;
  /**
   * Defines whether the tab for this course program is shown or not.
   */
  visibility: boolean;
}

export interface Programs {
  /**
   * fetch data from the table: "Program"
   */
  Program: Programs_Program[];
}
