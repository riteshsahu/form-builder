import { parseError } from "@/utils";
import { useEffect, useState } from "react";

export const useFetch = <T>(callback?: () => Promise<T | null>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!callback) return;

        setLoading(true);
        const result = await callback();
        if (result) {
          setData(result);
        }
      } catch (error) {
        setError(parseError(error));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [callback]);

  return { data, loading, error };
};
