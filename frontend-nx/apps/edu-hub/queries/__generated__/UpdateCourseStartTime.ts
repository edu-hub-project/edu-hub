/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCourseStartTime
// ====================================================

export interface UpdateCourseStartTime_update_Course_by_pk {
  __typename: "Course";
  id: number;
}

export interface UpdateCourseStartTime {
  /**
   * update single row of the table: "Course"
   */
  update_Course_by_pk: UpdateCourseStartTime_update_Course_by_pk | null;
}

export interface UpdateCourseStartTimeVariables {
  courseId: number;
  startTime: any;
}
