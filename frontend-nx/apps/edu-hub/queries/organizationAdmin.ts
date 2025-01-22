import { gql } from '@apollo/client';

export const ORGANIZATION_ADMIN_LIST = gql`
  query OrganizationAdminList(
    $limit: Int = 15
    $offset: Int = 0
    $filter: OrganizationAdmin_bool_exp = {}
    $order_by: [OrganizationAdmin_order_by!] = {updated_at: desc}
  ) {
    OrganizationAdmin(
      limit: $limit
      offset: $offset
      where: $filter
      order_by: $order_by
    ) {
      id
      User {
        id
        firstName
        lastName
        email
      }
      Organization {
        id
        name
      }
      canManageEvents
      canManageCourses
      canManageSettings
    }
    OrganizationAdmin_aggregate(where: $filter) {
      aggregate {
        count
      }
    }
  }
`;

export const DELETE_ORGANIZATION_ADMIN = gql`
  mutation DeleteOrganizationAdmin($id: Int!) {
    delete_OrganizationAdmin_by_pk(id: $id) {
      id
      User {
        id
        firstName
        lastName
      }
      Organization {
        id
        name
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_ADMIN_CAN_MANAGE_EVENTS = gql`
  mutation UpdateOrganizationAdminCanManageEvents($id: Int!, $canManageEvents: Boolean!) {
    update_OrganizationAdmin_by_pk(
      pk_columns: { id: $id },
      _set: { canManageEvents: $canManageEvents }
    ) {
      id
      canManageEvents
    }
  }
`;

export const UPDATE_ORGANIZATION_ADMIN_CAN_MANAGE_COURSES = gql`
  mutation UpdateOrganizationAdminCanManageCourses($id: Int!, $canManageCourses: Boolean!) {
    update_OrganizationAdmin_by_pk(
      pk_columns: { id: $id },
      _set: { canManageCourses: $canManageCourses }
    ) {
      id
      canManageCourses
    }
  }
`;

export const UPDATE_ORGANIZATION_ADMIN_CAN_MANAGE_SETTINGS = gql`
  mutation UpdateOrganizationAdminCanManageSettings($id: Int!, $canManageSettings: Boolean!) {
    update_OrganizationAdmin_by_pk(
      pk_columns: { id: $id },
      _set: { canManageSettings: $canManageSettings }
    ) {
      id
      canManageSettings
    }
  }
`;
