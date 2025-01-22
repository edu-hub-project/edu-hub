import axios from 'axios';
import { getKeycloakToken } from '../lib/utils.js';
import { logger } from '../index.js';

const updateAdminUser = async (req) => {
  try {
    if (!req.body.input || !req.body.input.userId || req.body.input.isAdmin === undefined) {
      logger.error('Missing required fields: userId or isAdmin status');
      return {
        success: false,
        error: "ERROR_MISSING_REQUIRED_FIELDS",
        messageKey: "ADMIN_UPDATE_FAILED_MISSING_FIELDS"
      };
    }

    const { userId, isAdmin } = req.body.input;
    const keycloakToken = await getKeycloakToken();

    // First, get current user roles
    const userResponse = await axios.get(
      `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/users/${userId}/role-mappings/realm`,
      {
        headers: {
          Authorization: `Bearer ${keycloakToken}`,
        },
      }
    );

    // Get admin role details
    const rolesResponse = await axios.get(
      `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/roles`,
      {
        headers: {
          Authorization: `Bearer ${keycloakToken}`,
        },
      }
    );

    const adminRole = rolesResponse.data.find(role => role.name === 'admin');
    if (!adminRole) {
      throw new Error('Admin role not found in Keycloak');
    }

    // Add or remove admin role based on isAdmin value
    if (isAdmin) {
      // Check if user already has admin role
      const hasAdminRole = userResponse.data.some(role => role.name === 'admin');
      if (!hasAdminRole) {
        await axios.post(
          `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/users/${userId}/role-mappings/realm`,
          [adminRole],
          {
            headers: {
              Authorization: `Bearer ${keycloakToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } else {
      // Remove admin role
      await axios.delete(
        `${process.env.KEYCLOAK_URL}/admin/realms/edu-hub/users/${userId}/role-mappings/realm`,
        {
          data: [adminRole],
          headers: {
            Authorization: `Bearer ${keycloakToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    logger.debug(`Successfully ${isAdmin ? 'added' : 'removed'} admin role for user ${userId}`);
    return {
      success: true,
      messageKey: "ADMIN_UPDATE_SUCCESS"
    };

  } catch (error) {
    logger.error("Error updating admin status", { error: error.message, stack: error.stack });
    return {
      success: false,
      error: "ERROR_UPDATING_ADMIN_STATUS",
      messageKey: "ADMIN_UPDATE_FAILED"
    };
  }
};

export default updateAdminUser; 