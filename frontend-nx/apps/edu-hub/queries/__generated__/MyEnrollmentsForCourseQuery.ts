/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CourseEnrollmentStatus_enum, Weekday_enum, LocationOption_enum, ProgramType_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MyEnrollmentsForCourseQuery
// ====================================================

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionAddresses_CourseLocation {
  __typename: "CourseLocation";
  id: number;
  /**
   * Either 'ONLINE' or one of the possible given offline locations
   */
  locationOption: LocationOption_enum | null;
  /**
   * Will be used as default for any new session address.
   */
  defaultSessionAddress: string | null;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionAddresses {
  __typename: "SessionAddress";
  id: number;
  /**
   * Where the session will take place; might be an offline or online location which is provided according to the provided type
   */
  address: string;
  /**
   * An object relationship
   */
  CourseLocation: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionAddresses_CourseLocation | null;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers_Expert_User {
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
   * The user's profile picture
   */
  picture: string | null;
  /**
   * A link to an external profile, for example in LinkedIn or Xing
   */
  externalProfile: string | null;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers_Expert {
  __typename: "Expert";
  /**
   * An object relationship
   */
  User: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers_Expert_User;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers {
  __typename: "SessionSpeaker";
  /**
   * An object relationship
   */
  Expert: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers_Expert;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions {
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
  SessionAddresses: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionAddresses[];
  /**
   * An array relationship
   */
  SessionSpeakers: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions_SessionSpeakers[];
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors_Expert_User {
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
  /**
   * A link to an external profile, for example in LinkedIn or Xing
   */
  externalProfile: string | null;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors_Expert {
  __typename: "Expert";
  id: number;
  /**
   * An object relationship
   */
  User: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors_Expert_User;
  /**
   * A short description on the expert's background
   */
  description: string | null;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors {
  __typename: "CourseInstructor";
  id: number;
  /**
   * An object relationship
   */
  Expert: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors_Expert;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseLocations {
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

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Program {
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
  /**
   * Sets the achievement certificates for all courses of htis program to be visible for the recipients.
   */
  visibilityAchievementCertificate: boolean | null;
  /**
   * Sets the participation certificates for all courses of htis program to be visible for the recipients.
   */
  visibilityAttendanceCertificate: boolean | null;
  type: ProgramType_enum;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseGroups_CourseGroupOption {
  __typename: "CourseGroupOption";
  id: number;
  title: string;
  order: number;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseGroups {
  __typename: "CourseGroup";
  id: number;
  /**
   * An object relationship
   */
  CourseGroupOption: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseGroups_CourseGroupOption;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses_Course_Program {
  __typename: "Program";
  id: number;
  /**
   * Decides whether the courses of this program can be published or not. (Courses are ony published if the filed publised in the Course table is also set to true.)
   */
  published: boolean;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses_Course {
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
   * The number of ECTS of the course (only editable by an admin user))
   */
  ects: string;
  /**
   * An object relationship
   */
  Program: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses_Course_Program;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses {
  __typename: "CourseDegree";
  id: number;
  /**
   * ID of the course which is assigned to a degree
   */
  courseId: number;
  /**
   * An object relationship
   */
  Course: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses_Course;
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment_Course {
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
  Sessions: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseInstructors[];
  /**
   * An array relationship
   */
  CourseLocations: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseLocations[];
  /**
   * An object relationship
   */
  Program: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_Program;
  /**
   * An array relationship
   */
  CourseGroups: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_CourseGroups[];
  /**
   * An array relationship
   */
  DegreeCourses: MyEnrollmentsForCourseQuery_CourseEnrollment_Course_DegreeCourses[];
}

export interface MyEnrollmentsForCourseQuery_CourseEnrollment {
  __typename: "CourseEnrollment";
  /**
   * The ID of the user that enrolled for the given course
   */
  userId: any;
  /**
   * The ID of the course of this enrollment from the given user
   */
  courseId: number;
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
  Course: MyEnrollmentsForCourseQuery_CourseEnrollment_Course;
}

export interface MyEnrollmentsForCourseQuery {
  /**
   * fetch data from the table: "CourseEnrollment"
   */
  CourseEnrollment: MyEnrollmentsForCourseQuery_CourseEnrollment[];
}

export interface MyEnrollmentsForCourseQueryVariables {
  courseId: number;
}
