import dynamicAPI from "./dynamicAPI";
import { useQuery, useMutation, useQueryClient } from "react-query";

const url = "/api/auth/accounts";

const queryKey = "accounts";

export default function useAccountsHook(props) {
  const { page = 1, id, q = "", limit = 25 } = props;
  const queryClient = useQueryClient();

  const getAccounts = useQuery(
    queryKey,
    async () =>
      await dynamicAPI("get", `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  );

  const getAccountById = useQuery(
    queryKey,
    async (id) => await dynamicAPI("get", `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  );

  const updateAccount = useMutation(
    async (obj) => await dynamicAPI("put", `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const deleteAccount = useMutation(
    async (id) => await dynamicAPI("delete", `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const postAccount = useMutation(
    async (obj) => await dynamicAPI("post", url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  return {
    getAccounts,
    updateAccount,
    deleteAccount,
    postAccount,
    getAccountById,
  };
}
