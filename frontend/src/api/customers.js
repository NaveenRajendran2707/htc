import dynamicAPI from "./dynamicAPI";
import { useQuery, useMutation, useQueryClient } from "react-query";

const url = "/api/auth/customers";

const queryKey = "customers";

export default function useCustomersHook(props) {
  const { page = 1, id, q = "", limit = 25 } = props;
  const queryClient = useQueryClient();

  const getCustomers = useQuery(
    queryKey,
    async () =>
      await dynamicAPI("get", `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  );

  const getCustomerById = useQuery(
    queryKey,
    async (id) => await dynamicAPI("get", `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  );

  const updateCustomer = useMutation(
    async (obj) => await dynamicAPI("put", `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const deleteCustomer = useMutation(
    async (id) => await dynamicAPI("delete", `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const postCustomer = useMutation(
    async (obj) => await dynamicAPI("post", url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  return {
    getCustomers,
    updateCustomer,
    deleteCustomer,
    postCustomer,
    getCustomerById,
  };
}
