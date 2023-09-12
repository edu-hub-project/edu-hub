/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourseEnrollmentStatus_enum, Weekday_enum, SessionAddressType_enum, LocationOption_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: InsertEnrollment
// ====================================================

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_Sessions_SessionAddresses {
  __typename: "SessionAddress";
  id: number;
  /**
   * Where the session will take place; might be an offline or online location which is provided according to the provided type
   */
  address: string;
  type: SessionAddressType_enum;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_Sessions {
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
  /**
   * An array relationship
   */
  SessionAddresses: InsertEnrollment_insert_CourseEnrollment_returning_Course_Sessions_SessionAddresses[];
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors_Expert_User {
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

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors_Expert {
  __typename: "Expert";
  id: number;
  /**
   * An object relationship
   */
  User: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors_Expert_User;
  /**
   * A short description on the expert's background
   */
  description: string | null;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors {
  __typename: "CourseInstructor";
  id: number;
  /**
   * An object relationship
   */
  Expert: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors_Expert;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseLocations {
  __typename: "CourseLocation";
  id: number;
  /**
   * Will be used as default for any new session address.
   */
  defaultSessionAddress: string | null;
  /**
   * Either 'ONLINE' or one of the possible given offline locations
   */
  locationOption: LocationOption_enum | null;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_Program {
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
   * The default application deadline for a course. It can be changed on the course level.
   */
  defaultApplicationEnd: any | null;
  /**
   * The deadline for the achievement record uploads.
   */
  achievementRecordUploadDeadline: any | null;
  /**
   * Decides whether the courses of this program can be published or not. (Courses are ony published if the filed publised in the Course table is also set to true.)
   */
  published: boolean;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseGroups_CourseGroupOption {
  __typename: "CourseGroupOption";
  id: number;
  title: string;
  order: number;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseGroups {
  __typename: "CourseGroup";
  id: number;
  /**
   * An object relationship
   */
  CourseGroupOption: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseGroups_CourseGroupOption;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses_Course_Program {
  __typename: "Program";
  id: number;
  /**
   * Decides whether the courses of this program can be published or not. (Courses are ony published if the filed publised in the Course table is also set to true.)
   */
  published: boolean;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses_Course {
  __typename: "Course";
  id: number;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * Decides whether the course is published for all users or not.
   */
  published: boolean;
  /**
   * An object relationship
   */
  Program: InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses_Course_Program;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses {
  __typename: "CourseDegree";
  id: number;
  /**
   * ID of the course which is assigned to a degree
   */
  courseId: number;
  /**
   * An object relationship
   */
  Course: InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses_Course;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseEnrollments {
  __typename: "CourseEnrollment";
  /**
   * The ID of the user that enrolled for the given course
   */
  userId: any;
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
   * URL to the file containing the user's achievement certificate (if he obtained one)
   */
  achievementCertificateURL: string | null;
  /**
   * URL to the file containing the user's attendance certificate (if he obtained one)
   */
  attendanceCertificateURL: string | null;
}

export interface InsertEnrollment_insert_CourseEnrollment_returning_Course {
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
  weekDay: Weekday_enum;
  /**
   * A text providing info about the costs of a participation.
   */
  cost: string;
  /**
   * Decides whether the course is published for all users or not.
   */
  published: boolean;
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
   * The link to the chat of the course (e.g. a mattermost channel)
   */
  chatLink: string | null;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * Indicates whether participants can get an achievement certificate. If the course is offering ECTS, it must be possible to obtain this certificate for the course
   */
  achievementCertificatePossible: boolean;
  /**
   * Indicates whether participants will get a certificate showing the list of attendances (only issued if the did not miss then maxMissedCourses)
   */
  attendanceCertificatePossible: boolean;
  /**
   * Id of the program to which the course belongs.
   */
  programId: number;
  /**
   * The number of maximum participants in the course.
   */
  maxParticipants: number | null;
  /**
   * An array of texts including the learning goals for the course
   */
  learningGoals: string | null;
  /**
   * Heading of the the first course description field
   */
  headingDescriptionField1: string | null;
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
   * URL to direct users to an appropriate registration page outside of the application. The internal registration is only used if this field is null.
   */
  externalRegistrationLink: string | null;
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
  Sessions: InsertEnrollment_insert_CourseEnrollment_returning_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseInstructors[];
  /**
   * An array relationship
   */
  CourseLocations: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseLocations[];
  /**
   * An object relationship
   */
  Program: InsertEnrollment_insert_CourseEnrollment_returning_Course_Program;
  /**
   * An array relationship
   */
  CourseGroups: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseGroups[];
  /**
   * An array relationship
   */
  DegreeCourses: InsertEnrollment_insert_CourseEnrollment_returning_Course_DegreeCourses[];
  /**
   * An array relationship
   */
  CourseEnrollments: InsertEnrollment_insert_CourseEnrollment_returning_Course_CourseEnrollments[];
}

export interface InsertEnrollment_insert_CourseEnrollment_returning {
  __typename: "CourseEnrollment";
  /**
   * The ID of the user that enrolled for the given course
   */
  userId: any;
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
   * URL to the file containing the user's achievement certificate (if he obtained one)
   */
  achievementCertificateURL: string | null;
  /**
   * URL to the file containing the user's attendance certificate (if he obtained one)
   */
  attendanceCertificateURL: string | null;
  /**
   * An object relationship
   */
  Course: InsertEnrollment_insert_CourseEnrollment_returning_Course;
}

export interface InsertEnrollment_insert_CourseEnrollment {
  __typename: "CourseEnrollment_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
  /**
   * data from the rows affected by the mutation
   */
  returning: InsertEnrollment_insert_CourseEnrollment_returning[];
}

export interface InsertEnrollment {
  /**
   * insert data into the table: "CourseEnrollment"
   */
  insert_CourseEnrollment: InsertEnrollment_insert_CourseEnrollment | null;
}

export interface InsertEnrollmentVariables {
  userId: any;
  courseId: number;
  motivationLetter: string;
}
