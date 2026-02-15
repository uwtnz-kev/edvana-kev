import { mockParentUsers } from "../../shared/mocks/users/parents";

export const getParentById = (id: string) => {
  return mockParentUsers.find((parent) => parent.id === id) || null;
};