import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: uuid!
    $firstName: String
    $lastName: String
    $email: String
    $matriculationNumber: String
    $university: University_enum
    $externalProfile: String
    $employment: Employment_enum
    $occupation: UserOccupation_enum
    $picture: String
  ) {
    update_User_by_pk(
      pk_columns: { id: $userId }
      _set: {
        firstName: $firstName
        matriculationNumber: $matriculationNumber
        lastName: $lastName
        employment: $employment
        email: $email
        externalProfile: $externalProfile
        university: $university
        occupation: $occupation
        picture: $picture
      }
    ) {
      id
      firstName
      matriculationNumber
      lastName
      employment
      occupation
      email
      externalProfile
      university
      picture
    }
  }
`;

export const UPDATE_USER_ON_ENROLLMENT_CONFIRMATION = gql`
  mutation UpdateUserOnEnrollmentConfirmation(
    $userId: uuid!
    $matriculationNumber: String
    $otherUniversity: String
    $university: University_enum
    $employment: Employment_enum
    $occupation: UserOccupation_enum
  ) {
    update_User_by_pk(
      pk_columns: { id: $userId }
      _set: {
        matriculationNumber: $matriculationNumber
        otherUniversity: $otherUniversity
        employment: $employment
        university: $university
        occupation: $occupation
      }
    ) {
      id
      matriculationNumber
      employment
      otherUniversity
      university
      occupation
    }
  }
`;

export const UPDATE_USER_PROFILE_PICTURE = gql`
  mutation UpdateUserProfilePicture(
    $userId: uuid!
    $file: String
  ) {
    update_User_by_pk(
      pk_columns: { id: $userId }
      _set: {
        picture: $file
      }
    ) {
      id
      picture
    }
  }
`;

export const UPDATE_USER_FIRST_NAME = gql`
  mutation UpdateUserFirstName($itemId: uuid!, $text: String!) {
    update_User_by_pk(pk_columns: { id: $itemId }, _set: { firstName: $text }) {
      id
      firstName
    }
  }
`;

export const UPDATE_USER_LAST_NAME = gql`
  mutation UpdateUserLastName($itemId: uuid!, $text: String!) {
    update_User_by_pk(pk_columns: { id: $itemId }, _set: { lastName: $text }) {
      id
      lastName
    }
  }
`;

export const UPDATE_USER_OCCUPATION = gql`
  mutation UpdateUserOccupation($userId: uuid!, $value: UserOccupation_enum!) {
    update_User_by_pk(pk_columns: { id: $userId }, _set: { occupation: $value }) {
      id
      occupation
    }
  }
`;

export const UPDATE_USER_ORGANIZATION_ID = gql`
  mutation UpdateUserOrganizationId($userId: uuid!, $value: Int) {
    update_User_by_pk(pk_columns: { id: $userId }, _set: { organizationId: $value }) {
      id
      organizationId
    }
  }
`;

export const UPDATE_USER_EXTERNAL_PROFILE = gql`
  mutation UpdateUserExternalProfile($userId: uuid!, $value: String!) {
    update_User_by_pk(pk_columns: { id: $userId }, _set: { externalProfile: $value }) {
      id
      externalProfile
    }
  }
`;

export const UPDATE_USER_MATRICULATION_NUMBER = gql`
  mutation UpdateUserMatriculationNumber($userId: uuid!, $value: String!) {
    update_User_by_pk(pk_columns: { id: $userId }, _set: { matriculationNumber: $value }) {
      id
      matriculationNumber
    }
  }
`;

