/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourseStatus_enum, Weekday_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CourseMinimum
// ====================================================

export interface CourseMinimum_Course_by_pk_Program {
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
   * Decides whether the courses of this program can be published or not. (Courses are ony published if the filed publised in the Course table is also set to true.)
   */
  published: boolean;
}

export interface CourseMinimum_Course_by_pk {
  __typename: "Course";
  id: number;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * Shows whether the current status is DRAFT, READY_FOR_PUBLICATION, READY_FOR_APPLICATION, APPLICANTS_INVITED, or PARTICIPANTS_RATED, which is set in correspondance to the tabs completed on the course administration page
   */
  status: CourseStatus_enum;
  /**
   * The number of ECTS of the course (only editable by an admin user))
   */
  ects: string;
  /**
   * Shown below the title on the course page
   */
  tagline: string;
  /**
   * The language the course is given in.
   */
  language: string | null;
  /**
   * Last day before applications are closed. (Set to the program's default value when the course is created.)
   */
  applicationEnd: any;
  /**
   * A text providing info about the costs of a participation.
   */
  cost: string;
  /**
   * Indicates whether participants can get an achievement certificate. If the course is offering ECTS, it must be possible to obtain this certificate for the course
   */
  achievementCertificatePossible: boolean;
  /**
   * Indicates whether participants will get a certificate showing the list of attendances (only issued if the did not miss then maxMissedCourses)
   */
  attendanceCertificatePossible: boolean;
  /**
   * The maximum number of sessions a participant can miss while still receiving a certificate
   */
  maxMissedSessions: number;
  /**
   * The day of the week the course takes place.
   */
  weekDay: Weekday_enum | null;
  /**
   * The cover image for the course
   */
  coverImage: string | null;
  /**
   * Id of the program to which the course belongs.
   */
  programId: number;
  /**
   * An array of texts including the learning goals for the course
   */
  learningGoals: string | null;
  /**
   * The link to the chat of the course (e.g. a mattermost channel)
   */
  chatLink: string | null;
  /**
   * Decides whether the course is published for all users or not.
   */
  published: boolean;
  /**
   * The number of maximum participants in the course.
   */
  maxParticipants: number | null;
  /**
   * The time the course ends each week.
   */
  endTime: any | null;
  /**
   * The time the course starts each week.
   */
  startTime: any | null;
  /**
   * An object relationship
   */
  Program: CourseMinimum_Course_by_pk_Program;
}

export interface CourseMinimum {
  /**
   * fetch data from the table: "Course" using primary key columns
   */
  Course_by_pk: CourseMinimum_Course_by_pk | null;
}

export interface CourseMinimumVariables {
  id: number;
}
