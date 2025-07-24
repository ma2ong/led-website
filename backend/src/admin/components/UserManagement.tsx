/**
 * 用户管理组件
 * 提供用户和角色管理界面
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  TextInput,
  Select,
  Option,
  Switch,
  IconButton,
  Flex,
  Badge,
} from '@strapi/design-system';
import { Plus, Pencil, Trash, Eye } from '@strapi/icons';
import { useNotification } from '@strapi/helper-plugin';

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  roles: Array<{
    id: number;
    name: string;
    code: string;
  }>;
  createdAt: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  code: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    roleId: '',
    isActive: true,
  });

  const toggleNotification = useNotification();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/admin/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toggleNotification({
        type: 'warning',
        message: '获取用户列表失败',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('/admin/roles');
      const data = await response.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setUserForm({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      roleId: '',
      isActive: true,
    });
    setShowUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      email: user.email,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      password: '',
      roleId: user.roles[0]?.id.toString() || '',
      isActive: user.isActive,
    });
    setShowUserDialog(true);
  };

  const handleSaveUser = async () => {
    try {
      const url = editingUser ? `/admin/users/${editingUser.id}` : '/admin/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      const body = { ...userForm };
      if (editingUser && !body.password) {
        delete body.password; // Don't update password if not provided
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (data.success) {
        toggleNotification({
          type: 'success',
          message: editingUser ? '用户更新成功' : '用户创建成功',
        });
        setShowUserDialog(false);
        fetchUsers();
      } else {
        throw new Error(data.message || '操作失败');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      toggleNotification({
        type: 'warning',
        message: error.message || '保存用户失败',
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('确定要删除这个用户吗？')) return;

    try {
      const response = await fetch(`/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toggleNotification({
          type: 'success',
          message: '用户删除成功',
        });
        fetchUsers();
      } else {
        throw new Error(data.message || '删除失败');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toggleNotification({
        type: 'warning',
        message: error.message || '删除用户失败',
      });
    }
  };

  const getRoleBadgeVariant = (roleCode: string) => {
    switch (roleCode) {
      case 'super-admin':
        return 'danger';
      case 'content-manager':
        return 'success';
      case 'editor':
        return 'secondary';
      case 'reviewer':
        return 'alternative';
      case 'customer-service':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <Box padding={8}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography variant="alpha">用户管理</Typography>
        <Button startIcon={<Plus />} onClick={handleCreateUser}>
          创建用户
        </Button>
      </Flex>

      <Table colCount={6} rowCount={users.length + 1}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">邮箱</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">姓名</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">角色</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">状态</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">创建时间</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">操作</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Typography textColor="neutral800">{user.email}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {`${user.firstname || ''} ${user.lastname || ''}`.trim() || '-'}
                </Typography>
              </Td>
              <Td>
                {user.roles.map((role) => (
                  <Badge
                    key={role.id}
                    variant={getRoleBadgeVariant(role.code)}
                    size="S"
                  >
                    {role.name}
                  </Badge>
                ))}
              </Td>
              <Td>
                <Badge variant={user.isActive ? 'success' : 'danger'} size="S">
                  {user.isActive ? '活跃' : '禁用'}
                </Badge>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </Typography>
              </Td>
              <Td>
                <Flex gap={1}>
                  <IconButton
                    onClick={() => handleEditUser(user)}
                    label="编辑用户"
                    icon={<Pencil />}
                  />
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
                    label="删除用户"
                    icon={<Trash />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* 用户编辑对话框 */}
      <Dialog onClose={() => setShowUserDialog(false)} isOpen={showUserDialog}>
        <DialogBody>
          <Typography variant="beta" marginBottom={4}>
            {editingUser ? '编辑用户' : '创建用户'}
          </Typography>
          
          <Box marginBottom={4}>
            <TextInput
              label="邮箱"
              name="email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              required
            />
          </Box>

          <Flex gap={4} marginBottom={4}>
            <Box flex="1">
              <TextInput
                label="名字"
                name="firstname"
                value={userForm.firstname}
                onChange={(e) => setUserForm({ ...userForm, firstname: e.target.value })}
              />
            </Box>
            <Box flex="1">
              <TextInput
                label="姓氏"
                name="lastname"
                value={userForm.lastname}
                onChange={(e) => setUserForm({ ...userForm, lastname: e.target.value })}
              />
            </Box>
          </Flex>

          <Box marginBottom={4}>
            <TextInput
              label={editingUser ? '新密码（留空不修改）' : '密码'}
              name="password"
              type="password"
              value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              required={!editingUser}
            />
          </Box>

          <Box marginBottom={4}>
            <Select
              label="角色"
              value={userForm.roleId}
              onChange={(value) => setUserForm({ ...userForm, roleId: value })}
              required
            >
              {roles.map((role) => (
                <Option key={role.id} value={role.id.toString()}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Box>

          <Box marginBottom={4}>
            <Switch
              label="启用用户"
              selected={userForm.isActive}
              onChange={(checked) => setUserForm({ ...userForm, isActive: checked })}
            />
          </Box>
        </DialogBody>
        
        <DialogFooter
          startAction={
            <Button onClick={() => setShowUserDialog(false)} variant="tertiary">
              取消
            </Button>
          }
          endAction={
            <Button onClick={handleSaveUser}>
              {editingUser ? '更新' : '创建'}
            </Button>
          }
        />
      </Dialog>
    </Box>
  );
};

export default UserManagement;