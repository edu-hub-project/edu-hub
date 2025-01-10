/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProgramType_enum, AttendanceStatus_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProgramStatistics
// ====================================================

export interface ProgramStatistics_Program_Courses_Sessions_Attendances {
  __typename: "Attendance";
  id: number;
  /**
   * The attendance status: MISSED for a user registered for the session but not recorded (or recognized), otherwise ATTENDED
   */
  status: AttendanceStatus_enum;
  /**
   * The ID of the user for which the attendance was recorded (only provided if the recorded name was in accordance with the name of a user registered for the session)
   */
  userId: any | null;
}

export interface ProgramStatistics_Program_Courses_Sessions {
  __typename: "Session";
  id: number;
  /**
   * The day and time of the start of the session
   */
  startDateTime: any;
  /**
   * An array relationship
   */
  Attendances: ProgramStatistics_Program_Courses_Sessions_Attendances[];
}

export interface ProgramStatistics_Program_Courses {
  __typename: "Course";
  id: number;
  /**
   * The title of the course (only editable by an admin user)
   */
  title: string;
  /**
   * An array relationship
   */
  Sessions: ProgramStatistics_Program_Courses_Sessions[];
}

export interface ProgramStatistics_Program {
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
  /**
   * The day the application for all courses of the program start.
   */
  applicationStart: any | null;
  /**
   * The questionnaire that the participants of all courses get sent after the last session of their course.
   */
  closingQuestionnaire: string | null;
  /**
   * The default maximum number of sessions a participant can miss in a course while still receiving a certificate. It can be changed on the course level.
   */
  defaultMaxMissedSessions: number | null;
  /**
   * The questionnaire that is sent after all course sessions including a speaker.
   */
  speakerQuestionnaire: string | null;
  /**
   * The questionnaire that the participants of all courses get sent after the first session of their course.
   */
  startQuestionnaire: string | null;
  /**
   * The URL to the pdf template for the attendance certificate
   */
  attendanceCertificateTemplateURL: string | null;
  /**
   * The URL to the pdf template for the attendance certificate
   */
  achievementCertificateTemplateURL: string | null;
  /**
   * Defines whether the tab for this course program is shown or not.
   */
  visibility: boolean;
  /**
   * An array relationship
   */
  Courses: ProgramStatistics_Program_Courses[];
}

export interface ProgramStatistics {
  /**
   * fetch data from the table: "Program"
   */
  Program: ProgramStatistics_Program[];
}
