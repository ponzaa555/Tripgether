import { useEffect, useState } from "react";
import axios from "axios";

export default function useTripSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trips, setTrips] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel = () => {};
    axios({
      method: "GET",
      url: "",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // setTrips((prev) => {
        //   return [...new Set([...prev, res.data.trip])];
        // });
        // setHasMore(res.data.trip.length > 0);
        // setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return {
    loading,
    error,
    trips,
    hasMore,
  };
}
