/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCourseContentDescriptionField1
// ====================================================

export interface UpdateCourseContentDescriptionField1_update_Course_by_pk {
  __typename: "Course";
  id: number;
}

export interface UpdateCourseContentDescriptionField1 {
  /**
   * update single row of the table: "Course"
   */
  update_Course_by_pk: UpdateCourseContentDescriptionField1_update_Course_by_pk | null;
}

export interface UpdateCourseContentDescriptionField1Variables {
  courseId: number;
  description: string;
}
