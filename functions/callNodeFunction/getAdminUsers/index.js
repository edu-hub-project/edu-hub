import axios from 'axios';
import { getKeycloakToken } from '../lib/utils.js';
import { logger } from '../index.js';

const getAdminUsers = async (req) => {
  try {
    const keycloakToken = await getKeycloakToken();

    // First get all users
    const usersResponse = await axios.get(
      `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/users`,
      {
        headers: {
          Authorization: `Bearer ${keycloakToken}`,
        },
      }
    );

    // Then get all users with admin role
    const adminRole = await axios.get(
      `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/roles/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${keycloakToken}`,
        },
      }
    );

    const adminUserIds = adminRole.data.map(user => user.id);

    return {
      success: true,
      adminUserIds,
      messageKey: "GET_ADMIN_USERS_SUCCESS"
    };

  } catch (error) {
    logger.error("Error getting admin users", { error: error.message, stack: error.stack });
    return {
      success: false,
      adminUserIds: [],
      error: "ERROR_GETTING_ADMIN_USERS",
      messageKey: "GET_ADMIN_USERS_FAILED"
    };
  }
};

export default getAdminUsers; 