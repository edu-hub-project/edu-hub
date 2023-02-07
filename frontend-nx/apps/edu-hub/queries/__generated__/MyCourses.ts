/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourseEnrollmentStatus_enum, Weekday_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MyCourses
// ====================================================

export interface MyCourses_User_by_pk_CourseEnrollments_Course_Sessions {
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

export interface MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors_Expert_User {
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

export interface MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors_Expert {
  __typename: "Expert";
  id: number;
  /**
   * An object relationship
   */
  User: MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors_Expert_User;
  /**
   * A short description on the expert's background
   */
  description: string | null;
}

export interface MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors {
  __typename: "CourseInstructor";
  id: number;
  /**
   * An object relationship
   */
  Expert: MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors_Expert;
}

export interface MyCourses_User_by_pk_CourseEnrollments_Course_CourseEnrollments {
  __typename: "CourseEnrollment";
  /**
   * The last day a user can confirm his/her invitation to the given course
   */
  invitationExpirationDate: any | null;
  id: number;
  /**
   * The users current enrollment status to this course
   */
  status: CourseEnrollmentStatus_enum;
}

export interface MyCourses_User_by_pk_CourseEnrollments_Course_Program {
  __typename: "Program";
  /**
   * The default application deadline for a course. It can be changed on the course level.
   */
  defaultApplicationEnd: any | null;
  /**
   * The day the application for all courses of the program start.
   */
  applicationStart: any | null;
  id: number;
  /**
   * The last day a course lecture can possibly be in this program.
   */
  lectureEnd: any | null;
  /**
   * The first day a course lecture can possibly be in this program.
   */
  lectureStart: any | null;
  /**
   * The title of the program
   */
  title: string;
  /**
   * The deadline for the achievement record uploads.
   */
  achievementRecordUploadDeadline: any | null;
}

export interface MyCourses_User_by_pk_CourseEnrollments_Course {
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
  weekDay: Weekday_enum | null;
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
  Sessions: MyCourses_User_by_pk_CourseEnrollments_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: MyCourses_User_by_pk_CourseEnrollments_Course_CourseInstructors[];
  /**
   * An array relationship
   */
  CourseEnrollments: MyCourses_User_by_pk_CourseEnrollments_Course_CourseEnrollments[];
  /**
   * An object relationship
   */
  Program: MyCourses_User_by_pk_CourseEnrollments_Course_Program | null;
}

export interface MyCourses_User_by_pk_CourseEnrollments {
  __typename: "CourseEnrollment";
  /**
   * The last day a user can confirm his/her invitation to the given course
   */
  invitationExpirationDate: any | null;
  id: number;
  /**
   * The users current enrollment status to this course
   */
  status: CourseEnrollmentStatus_enum;
  /**
   * An object relationship
   */
  Course: MyCourses_User_by_pk_CourseEnrollments_Course;
}

export interface MyCourses_User_by_pk {
  __typename: "User";
  /**
   * An array relationship
   */
  CourseEnrollments: MyCourses_User_by_pk_CourseEnrollments[];
}

export interface MyCourses {
  /**
   * fetch data from the table: "User" using primary key columns
   */
  User_by_pk: MyCourses_User_by_pk | null;
}

export interface MyCoursesVariables {
  userId: any;
}
