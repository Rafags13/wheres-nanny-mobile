import { useEffect, useState } from "react";

export default function useFakeApiCallRequests(time: number = 1000) {
  const [isLoadingData, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoadingData);
    }, time)
  }, []);

  return { isLoadingData }
}