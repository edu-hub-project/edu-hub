/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourseStatus_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CourseListWithFilter
// ====================================================

export interface CourseListWithFilter_Course_Program {
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
}

export interface CourseListWithFilter_Course_CourseInstructors_Expert_User {
  __typename: "User";
  /**
   * The user's first name
   */
  firstName: string;
  id: any;
  /**
   * The user's last name
   */
  lastName: string;
}

export interface CourseListWithFilter_Course_CourseInstructors_Expert {
  __typename: "Expert";
  id: number;
  /**
   * An object relationship
   */
  User: CourseListWithFilter_Course_CourseInstructors_Expert_User;
}

export interface CourseListWithFilter_Course_CourseInstructors {
  __typename: "CourseInstructor";
  id: number;
  /**
   * An object relationship
   */
  Expert: CourseListWithFilter_Course_CourseInstructors_Expert;
}

export interface CourseListWithFilter_Course_CourseEnrollments_CourseEnrollmentStatus {
  __typename: "CourseEnrollmentStatus";
  value: string;
}

export interface CourseListWithFilter_Course_CourseEnrollments {
  __typename: "CourseEnrollment";
  id: number;
  /**
   * An object relationship
   */
  CourseEnrollmentStatus: CourseListWithFilter_Course_CourseEnrollments_CourseEnrollmentStatus;
}

export interface CourseListWithFilter_Course {
  __typename: "Course";
  id: number;
  /**
   * The number of ECTS of the course (only editable by an admin user))
   */
  ects: string;
  /**
   * The cover image for the course
   */
  coverImage: string | null;
  /**
   * The language the course is given in.
   */
  language: string;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * Id of the program to which the course belongs.
   */
  programId: number | null;
  /**
   * Shows whether the current status is DRAFT, READY_FOR_PUBLICATION, READY_FOR_APPLICATION, APPLICANTS_INVITED, or PARTICIPANTS_RATED, which is set in correspondance to the tabs completed on the course administration page
   */
  status: CourseStatus_enum;
  /**
   * The value decides whether the course is visible for users or anoymous persons.
   */
  visibility: boolean | null;
  /**
   * Indicates whether participants can get an achievement certificate. If the course is offering ECTS, it must be possible to obtain this certificate for the course
   */
  achievementCertificatePossible: boolean;
  /**
   * Indicates whether participants will get a certificate showing the list of attendances (only issued if the did not miss then maxMissedCourses)
   */
  attendanceCertificatePossible: boolean;
  /**
   * The link to the chat of the course (e.g. a mattermost channel)
   */
  chatLink: string | null;
  /**
   * An object relationship
   */
  Program: CourseListWithFilter_Course_Program | null;
  /**
   * An array relationship
   */
  CourseInstructors: CourseListWithFilter_Course_CourseInstructors[];
  /**
   * An array relationship
   */
  CourseEnrollments: CourseListWithFilter_Course_CourseEnrollments[];
}

export interface CourseListWithFilter {
  /**
   * fetch data from the table: "Course"
   */
  Course: CourseListWithFilter_Course[];
}

export interface CourseListWithFilterVariables {
  courseTitle: string;
  programShortTitle: string;
}
