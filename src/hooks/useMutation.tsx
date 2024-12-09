import { useState } from "react";
import { useMutation } from "convex/react";

export const useMutationState = (mutationTorun: any) => {
  const [pending, setPending] = useState(false);
  const mutationFn = useMutation(mutationTorun);
  const mutate = (payload: any) => {
    setPending(true);
    return mutationFn(payload)
      .then((res) => res)
      .catch((error) => {
        throw error;
      })
      .finally(() => setPending(false));
  };
  return { mutate, pending };
};
