import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSchoolById } from "@/utils/data/schools/getSchoolById";
import { School } from "@/types/school";

export function useSchoolData() {
  const { user } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!user?.school?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getSchoolById(user.school.id);
        setSchool(data);
      } catch (err) {
        setError("Failed to load school");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [user?.school?.id]);

  return { school, loading, error };
}
