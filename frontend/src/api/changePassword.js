import dynamicAPI from "./dynamicAPI";
import { useQuery, useMutation, useQueryClient } from "react-query";

const url = "/api/auth/change-password";

const queryKey = "change-password";

export default function useChangePasswordsHook(props) {
  const queryClient = useQueryClient();

  const postChangePassword = useMutation(
    async (obj) => await dynamicAPI("post", url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  return {
    postChangePassword,
  };
}
