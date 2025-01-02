import { useEffect, useState } from "react";

export const useFetch = (fetchFn: () => Promise<any>, initialValue: any) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetch() {
      setIsFetching(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError("Failed to fetch data.");
      }
      setIsFetching(false);
    }

    fetch();
  }, [fetchFn]);

  return { isFetching, error, fetchedData, setFetchedData };
};
