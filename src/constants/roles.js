export const ROLES = {
  RESIDENT: 'resident',
  ESTATE_MANAGER: 'manager',
  VISITOR: 'visitor',
  HOST: 'host',
  FRONTDESK: 'frontdesk',
  ADMIN: 'admin',
};

export const DUMMY_USERS = [
  {
    id: '1',
    name: 'John Resident',
    email: 'resident@example.com',
    password: 'password123',
    role: ROLES.RESIDENT,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    name: 'Alice Manager',
    email: 'manager@example.com',
    password: 'password123',
    role: ROLES.ESTATE_MANAGER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: '3',
    name: 'Bob Visitor',
    email: 'visitor@example.com',
    password: 'password123',
    role: ROLES.VISITOR,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: '4',
    name: 'Sarah Host',
    email: 'host@example.com',
    password: 'password123',
    role: ROLES.HOST,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '5',
    name: 'David FrontDesk',
    email: 'frontdesk@example.com',
    password: 'password123',
    role: ROLES.FRONTDESK,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: '6',
    name: 'Super Admin',
    email: 'admin@example.com',
    password: 'password123',
    role: ROLES.ADMIN,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
];
