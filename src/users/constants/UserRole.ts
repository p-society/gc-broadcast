export enum UserRole {
  USER = 4095,
  MODERATOR = 8191,
  ADMIN = 16383,
  SUPER_ADMIN = 32767,
}

export const UserRolesEnum = [
  UserRole.USER,
  UserRole.MODERATOR,
  UserRole.ADMIN,
  UserRole.SUPER_ADMIN,
];
