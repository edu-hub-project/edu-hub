import { graphql } from '../../../types/generated';

export const DEGREE_COURSES = graphql(`
  query DegreeCourses {
    Course(where: { Program: { shortTitle: { _eq: "DEGREES" } } }) {
      id
      title
    }
  }
`);

export const COMPLETED_DEGREE_ENROLLMENTS = graphql(`
  query CompletedDegreeEnrollments($degreeCourseId: Int!, $userId: uuid!) {
    CourseEnrollment(
      where: {
        _or: [
          {
            userId: { _eq: $userId }
            Course: { CourseDegrees: { degreeCourseId: { _eq: $degreeCourseId } } }
            achievementCertificateURL: { _is_null: false }
          }
          {
            userId: { _eq: $userId }
            Course: {
              CourseDegrees: { degreeCourseId: { _eq: $degreeCourseId } }
              Program: { shortTitle: { _eq: "EVENTS" } }
            }
          }
        ]
      }
    ) {
      Course {
        id
        title
        ects
        Program {
          shortTitle
          title
        }
      }
    }
  }
`);

export const DEGREE_PARTICIPANTS_WITH_DEGREE_ENROLLMENTS = graphql(`
  query DegreeParticipantsWithDegreeEnrollments($degreeCourseId: Int!) {
    Course_by_pk(id: $degreeCourseId) {
      CourseEnrollments {
        id
        status
        achievementCertificateURL
        attendanceCertificateURL
        User {
          id
          firstName
          lastName
          email
          CourseEnrollments(where: { Course: { CourseDegrees: { degreeCourseId: { _eq: $degreeCourseId } } } }) {
            id
            status
            achievementCertificateURL
            attendanceCertificateURL
            updated_at
            Course {
              id
              title
              ects
              Program {
                id
                shortTitle
                title
              }
            }
          }
        }
      }
    }
  }
`);

export const INSERT_COURSE_DEGREE_TAG = graphql(`
  mutation InsertCourseDegreeTag($itemId: Int!, $tagId: Int!) {
    insert_CourseDegree(objects: { courseId: $itemId, degreeCourseId: $tagId }) {
      affected_rows
    }
  }
`);

export const DELETE_COURSE_DEGREE_TAG = graphql(`
  mutation DeleteCourseDegreeTag($itemId: Int!, $tagId: Int!) {
    delete_CourseDegree(where: { Course: { id: { _eq: $itemId } }, _and: { DegreeCourse: { id: { _eq: $tagId } } } }) {
      affected_rows
    }
  }
`);
