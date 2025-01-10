import { gql } from "@apollo/client";

import {
  ADMIN_PROGRAM_FRAGMENT,
  PROGRAM_FRAGMENT_MINIMUM_PROPERTIES,
} from "./programFragment";

export const PROGRAM_LIST = gql`
  ${ADMIN_PROGRAM_FRAGMENT}
  query ProgramList {
    Program {
      ...AdminProgramFragment
      Courses {
        id
      }
    }
  }
`;

export const PROGRAM_STATISTICS = gql`
  ${ADMIN_PROGRAM_FRAGMENT}
  query ProgramStatistics {
    Program {
      ...AdminProgramFragment
      Courses {
        id
        title
        published
        Sessions {
          id
          startDateTime
          Attendances {
            id
            status
            userId
          }
        }
        CourseEnrollments {
          id
          status
          attendanceCertificateURL
          achievementCertificateURL
          created_at
          updated_at
        }
      }
    }
  }
`;


export const PROGRAMS_WITH_MINIMUM_PROPERTIES = gql`
  ${PROGRAM_FRAGMENT_MINIMUM_PROPERTIES}
  query Programs {
    Program(order_by: { id: desc }) {
      ...ProgramFragmentMinimumProperties
    }
  }
`;

export const PROGRAM_TYPES = gql`
  query ProgramTypesList {
    ProgramType {
      value
    }
  }
`;
