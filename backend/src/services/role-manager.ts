/**
 * Role Manager Service
 * Handles user roles and permissions management
 */

import permissions from '../../config/permissions';

export default {
  /**
   * Initialize default roles and permissions
   */
  async initializeRoles() {
    try {
      const { adminRoles } = permissions;
      
      // Get existing roles
      const existingRoles = await strapi.query('admin::role').findMany();
      const existingRoleNames = existingRoles.map(role => role.name);
      
      // Create missing roles
      for (const [roleKey, roleConfig] of Object.entries(adminRoles)) {
        if (!existingRoleNames.includes(roleConfig.name)) {
          await this.createRole(roleConfig.name, roleConfig.description, roleConfig.permissions);
          strapi.log.info(`Created role: ${roleConfig.name}`);
        }
      }
      
      strapi.log.info('Role initialization completed');
    } catch (error) {
      strapi.log.error('Failed to initialize roles:', error);
    }
  },

  /**
   * Create a new role with permissions
   */
  async createRole(name: string, description: string, permissions: any) {
    try {
      // Create the role
      const role = await strapi.query('admin::role').create({
        data: {
          name,
          description,
          code: name.toLowerCase().replace(/\s+/g, '-'),
        },
      });

      // Set permissions for the role
      await this.setRolePermissions(role.id, permissions);
      
      return role;
    } catch (error) {
      strapi.log.error(`Failed to create role ${name}:`, error);
      throw error;
    }
  },

  /**
   * Set permissions for a role
   */
  async setRolePermissions(roleId: number, permissions: any) {
    try {
      // This is a simplified version - in a real implementation,
      // you would need to map the permissions to Strapi's permission structure
      
      // Get all available permissions
      const availablePermissions = await strapi.query('admin::permission').findMany();
      
      // Filter permissions based on role configuration
      const rolePermissions = availablePermissions.filter(permission => {
        return this.shouldGrantPermission(permission, permissions);
      });
      
      // Update role permissions
      await strapi.query('admin::role').update({
        where: { id: roleId },
        data: {
          permissions: rolePermissions.map(p => p.id),
        },
      });
      
      strapi.log.info(`Updated permissions for role ID: ${roleId}`);
    } catch (error) {
      strapi.log.error(`Failed to set permissions for role ${roleId}:`, error);
      throw error;
    }
  },

  /**
   * Check if a permission should be granted based on role configuration
   */
  shouldGrantPermission(permission: any, rolePermissions: any): boolean {
    // This is a simplified check - you would implement more sophisticated logic
    const { action, subject } = permission;
    
    // Map Strapi permissions to our configuration
    if (subject === 'plugin::content-manager.explorer') {
      const contentPermissions = rolePermissions.contentManager;
      switch (action) {
        case 'read':
          return contentPermissions?.read || false;
        case 'create':
          return contentPermissions?.create || false;
        case 'update':
          return contentPermissions?.update || false;
        case 'delete':
          return contentPermissions?.delete || false;
        case 'publish':
          return contentPermissions?.publish || false;
        default:
          return false;
      }
    }
    
    if (subject === 'plugin::upload') {
      const mediaPermissions = rolePermissions.mediaLibrary;
      switch (action) {
        case 'read':
          return mediaPermissions?.read || false;
        case 'create':
          return mediaPermissions?.create || false;
        case 'update':
          return mediaPermissions?.update || false;
        case 'delete':
          return mediaPermissions?.delete || false;
        default:
          return false;
      }
    }
    
    // Default to false for unknown permissions
    return false;
  },

  /**
   * Get user role information
   */
  async getUserRole(userId: number) {
    try {
      const user = await strapi.query('admin::user').findOne({
        where: { id: userId },
        populate: ['roles'],
      });
      
      return user?.roles?.[0] || null;
    } catch (error) {
      strapi.log.error(`Failed to get user role for user ${userId}:`, error);
      return null;
    }
  },

  /**
   * Assign role to user
   */
  async assignRoleToUser(userId: number, roleId: number) {
    try {
      await strapi.query('admin::user').update({
        where: { id: userId },
        data: {
          roles: [roleId],
        },
      });
      
      strapi.log.info(`Assigned role ${roleId} to user ${userId}`);
    } catch (error) {
      strapi.log.error(`Failed to assign role to user:`, error);
      throw error;
    }
  },

  /**
   * Check if user has specific permission
   */
  async userHasPermission(userId: number, action: string, subject: string): Promise<boolean> {
    try {
      const userRole = await this.getUserRole(userId);
      if (!userRole) return false;
      
      const permissions = await strapi.query('admin::permission').findMany({
        where: {
          role: userRole.id,
          action,
          subject,
        },
      });
      
      return permissions.length > 0;
    } catch (error) {
      strapi.log.error('Failed to check user permission:', error);
      return false;
    }
  },

  /**
   * Get all available roles
   */
  async getAllRoles() {
    try {
      return await strapi.query('admin::role').findMany({
        populate: ['permissions'],
      });
    } catch (error) {
      strapi.log.error('Failed to get all roles:', error);
      return [];
    }
  },

  /**
   * Update role permissions
   */
  async updateRolePermissions(roleId: number, permissions: any) {
    try {
      await this.setRolePermissions(roleId, permissions);
      strapi.log.info(`Updated permissions for role ${roleId}`);
    } catch (error) {
      strapi.log.error(`Failed to update role permissions:`, error);
      throw error;
    }
  },

  /**
   * Delete role (with safety checks)
   */
  async deleteRole(roleId: number) {
    try {
      // Check if role is in use
      const usersWithRole = await strapi.query('admin::user').findMany({
        where: {
          roles: {
            id: roleId,
          },
        },
      });
      
      if (usersWithRole.length > 0) {
        throw new Error('Cannot delete role that is assigned to users');
      }
      
      // Check if it's a system role
      const role = await strapi.query('admin::role').findOne({
        where: { id: roleId },
      });
      
      if (role && ['Super Admin', 'Author', 'Editor'].includes(role.name)) {
        throw new Error('Cannot delete system roles');
      }
      
      await strapi.query('admin::role').delete({
        where: { id: roleId },
      });
      
      strapi.log.info(`Deleted role ${roleId}`);
    } catch (error) {
      strapi.log.error(`Failed to delete role:`, error);
      throw error;
    }
  },

  /**
   * Audit user permissions
   */
  async auditUserPermissions(userId: number) {
    try {
      const user = await strapi.query('admin::user').findOne({
        where: { id: userId },
        populate: ['roles'],
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      const role = user.roles?.[0];
      if (!role) {
        return {
          user: user.email,
          role: null,
          permissions: [],
        };
      }
      
      const permissions = await strapi.query('admin::permission').findMany({
        where: { role: role.id },
      });
      
      return {
        user: user.email,
        role: role.name,
        permissions: permissions.map(p => ({
          action: p.action,
          subject: p.subject,
          conditions: p.conditions,
        })),
      };
    } catch (error) {
      strapi.log.error('Failed to audit user permissions:', error);
      throw error;
    }
  },
};