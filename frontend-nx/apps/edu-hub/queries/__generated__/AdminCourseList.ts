/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Course_bool_exp, CourseStatus_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: AdminCourseList
// ====================================================

export interface AdminCourseList_Course_Sessions {
  __typename: "Session";
  id: number;
  /**
   * The day and time of the end of the session
   */
  endDateTime: any;
  /**
   * The ID of the course the session belongs to
   */
  courseId: number;
  /**
   * A description of the session
   */
  description: string;
  /**
   * The day and time of the start of the session
   */
  startDateTime: any;
  /**
   * The title of the session
   */
  title: string;
}

export interface AdminCourseList_Course_CourseInstructors_Expert_User {
  __typename: "User";
  /**
   * The user's first name
   */
  firstName: string;
  /**
   * The user's profile picture
   */
  picture: string | null;
  id: any;
  /**
   * The user's last name
   */
  lastName: string;
}

export interface AdminCourseList_Course_CourseInstructors_Expert {
  __typename: "Expert";
  id: number;
  /**
   * An object relationship
   */
  User: AdminCourseList_Course_CourseInstructors_Expert_User;
  /**
   * A short description on the expert's background
   */
  description: string | null;
}

export interface AdminCourseList_Course_CourseInstructors {
  __typename: "CourseInstructor";
  id: number;
  /**
   * An object relationship
   */
  Expert: AdminCourseList_Course_CourseInstructors_Expert;
}

export interface AdminCourseList_Course_Program {
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
}

export interface AdminCourseList_Course_CourseEnrollments_CourseEnrollmentStatus {
  __typename: "CourseEnrollmentStatus";
  value: string;
}

export interface AdminCourseList_Course_CourseEnrollments {
  __typename: "CourseEnrollment";
  id: number;
  /**
   * An object relationship
   */
  CourseEnrollmentStatus: AdminCourseList_Course_CourseEnrollments_CourseEnrollmentStatus;
}

export interface AdminCourseList_Course_AppliedAndUnratedCount_aggregate {
  __typename: "CourseEnrollment_aggregate_fields";
  count: number;
}

export interface AdminCourseList_Course_AppliedAndUnratedCount {
  __typename: "CourseEnrollment_aggregate";
  aggregate: AdminCourseList_Course_AppliedAndUnratedCount_aggregate | null;
}

export interface AdminCourseList_Course {
  __typename: "Course";
  id: number;
  /**
   * The number of ECTS of the course (only editable by an admin user))
   */
  ects: string;
  /**
   * Shown below the title on the course page
   */
  tagline: string;
  /**
   * The day of the week the course takes place.
   */
  weekDay: string | null;
  /**
   * A text providing info about the costs of a participation.
   */
  cost: string;
  /**
   * Last day before applications are closed. (Set to the program's default value when the course is created.)
   */
  applicationEnd: any;
  /**
   * The cover image for the course
   */
  coverImage: string | null;
  /**
   * The language the course is given in.
   */
  language: string | null;
  /**
   * The maximum number of sessions a participant can miss while still receiving a certificate
   */
  maxMissedSessions: number;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * Id of the program to which the course belongs.
   */
  programId: number | null;
  /**
   * The number of maximum participants in the course.
   */
  maxParticipants: number | null;
  /**
   * Heading of the the first course description field
   */
  headingDescriptionField1: string;
  /**
   * Content of the first course description field
   */
  contentDescriptionField1: string | null;
  /**
   * Heading of the the second course description field
   */
  headingDescriptionField2: string | null;
  /**
   * Content of the second course description field
   */
  contentDescriptionField2: string | null;
  /**
   * The time the course starts each week.
   */
  startTime: any | null;
  /**
   * The time the course ends each week.
   */
  endTime: any | null;
  /**
   * An array relationship
   */
  Sessions: AdminCourseList_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: AdminCourseList_Course_CourseInstructors[];
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
   * An array of texts including the learning goals for the course
   */
  learningGoals: string | null;
  /**
   * An object relationship
   */
  Program: AdminCourseList_Course_Program | null;
  /**
   * An array relationship
   */
  CourseEnrollments: AdminCourseList_Course_CourseEnrollments[];
  /**
   * An aggregate relationship
   */
  AppliedAndUnratedCount: AdminCourseList_Course_AppliedAndUnratedCount;
}

export interface AdminCourseList_Course_aggregate_aggregate {
  __typename: "Course_aggregate_fields";
  count: number;
}

export interface AdminCourseList_Course_aggregate {
  __typename: "Course_aggregate";
  aggregate: AdminCourseList_Course_aggregate_aggregate | null;
}

export interface AdminCourseList {
  /**
   * fetch data from the table: "Course"
   */
  Course: AdminCourseList_Course[];
  /**
   * fetch aggregated fields from the table: "Course"
   */
  Course_aggregate: AdminCourseList_Course_aggregate;
}

export interface AdminCourseListVariables {
  where: Course_bool_exp;
  limit?: number | null;
  offset?: number | null;
}
