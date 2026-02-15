// src/utils/data/user/getUserById.ts
import api from "@/utils/api/axios";
import { AuthUser } from "@/types/user";

export async function getUserById(userId: string): Promise<AuthUser> {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}