import { useEffect, useState } from "react";
import axios from "axios";
export default function useFetchScroll({
  url,
  query: address,
  pageNumber: page,
  offset,
  maxPage,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setList([]);
  }, [address]);
  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url,
      params: {
        page,
        address,
        offset,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (res.data.status !== "1") {
          setLoading(false);
          return setList([]);
        }
        setList((prevList) => {
          return [
            ...new Set([
              ...prevList,
              ...res?.data?.result?.map((r) => ({
                number: r?.blockNumber,
                time: r?.timeStamp,
                hash: r.hash,
                confirmation: r.confirmations,
              })),
            ]),
          ];
        });

        setHasMore(() => res?.data?.result?.length < 100 || page >= maxPage ? false : true);
        setLoading(false);
      })
      .catch((e) => {
        console.log({ e })
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, address, page, maxPage, offset]);
  return { loading, error, list, hasMore };
}
