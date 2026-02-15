import api from "@/utils/api/axios";
import { School } from "@/types/school"; // Adjust path if needed

export async function getSchoolById(id: string): Promise<School> {
  const response = await api.get<School>(`/schools/${id}`);
  return response.data;
}
