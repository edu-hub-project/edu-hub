import { gql } from '@apollo/client';

export const ACHIEVEMENT_DOCUMENTATION_TEMPLATES = gql`
  query AchievementDocumentationTemplates(
    $limit: Int = 15
    $offset: Int = 0
    $filter: AchievementDocumentationTemplate_bool_exp = {}
    $order_by: [AchievementDocumentationTemplate_order_by!] = {title: asc}
  ) {
    AchievementDocumentationTemplate(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $filter
    ) {
      id
      title
      url
      updated_at
    }
    AchievementDocumentationTemplate_aggregate(where: $filter) {
      aggregate {
        count
      }
    }
  }
`;

export const INSERT_ACHIEVEMENT_DOCUMENTATION_TEMPLATE = gql`
  mutation InsertAchievementDocumentationTemplate($insertInput: AchievementDocumentationTemplate_insert_input!) {
    insert_AchievementDocumentationTemplate_one(object: $insertInput) {
      id
    }
  }
`;

export const UPDATE_ACHIEVEMENT_DOCUMENTATION_TEMPLATE = gql`
  mutation UpdateAchievementDocumentationTemplate($itemId: Int!, $text: String, $url: String) {
    update_AchievementDocumentationTemplate_by_pk(pk_columns: { id: $itemId }, _set: { title: $text, url: $url }) {
      id
      title
    }
  }
`;

export const UPDATE_ACHIEVEMENT_DOCUMENTATION_TEMPLATE_TITLE = gql`
  mutation UpdateAchievementDocumentationTemplateTitle($itemId: Int!, $text: String) {
    update_AchievementDocumentationTemplate_by_pk(pk_columns: { id: $itemId }, _set: { title: $text }) {
      id
      title
    }
  }
`;

export const DELETE_ACHIEVEMENT_DOCUMENTATION_TEMPLATE = gql`
  mutation DeleteAchievementDocumentationTemplate($id: Int!) {
    delete_AchievementDocumentationTemplate_by_pk(id: $id) {
      id
    }
  }
`;
