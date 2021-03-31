import { useEffect, useState } from "react";
import axios from "axios";
//"0x06012c8cf97bead5deae237070f9587f8e7a266d"
export default function useFetchScroll({
  url,
  query: contractaddress,
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
  }, [contractaddress]);
  useEffect(() => {
    if (!contractaddress) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url,
      params: {
        page,
        contractaddress,
        offset,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log({ res });
        if (res.data.status !== "1") {
          setLoading(false);
          return setList([]);
        }
        setList((prevList) => {
          return [
            ...new Set([
              ...prevList,
              ...res?.data?.result?.map((b) => b.blockNumber),
            ]),
          ];
        });
        setHasMore(page <= maxPage);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, contractaddress, page, maxPage, offset]);
  return { loading, error, list, hasMore };
}
