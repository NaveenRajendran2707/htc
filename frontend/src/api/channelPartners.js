import dynamicAPI from "./dynamicAPI";
import { useQuery, useMutation, useQueryClient } from "react-query";

const url = "/api/auth/channel-partners";

const queryKey = "channel-partners";

export default function useChannelPartnersHook(props) {
  const { page = 1, id, q = "", limit = 25 } = props;
  const queryClient = useQueryClient();

  const getChannelPartners = useQuery(
    queryKey,
    async () =>
      await dynamicAPI("get", `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  );

  const getChannelPartnerById = useQuery(
    queryKey,
    async (id) => await dynamicAPI("get", `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  );

  const updateChannelPartner = useMutation(
    async (obj) => await dynamicAPI("put", `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const deleteChannelPartner = useMutation(
    async (id) => await dynamicAPI("delete", `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  const postChannelPartner = useMutation(
    async (obj) => await dynamicAPI("post", url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  );

  return {
    getChannelPartners,
    updateChannelPartner,
    deleteChannelPartner,
    postChannelPartner,
    getChannelPartnerById,
  };
}
