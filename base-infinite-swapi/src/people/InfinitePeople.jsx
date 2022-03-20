import InfiniteScroll from "react-infinite-scroller";

import {Person} from "./Person";
import {useInfiniteQuery} from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data, fetchNextPage, hasNextPage, isLoading, isFetching, isError
  } = useInfiniteQuery(
    ["sw-people"], ({pageParam = initialUrl}) => {
      console.log(pageParam);
      return fetchUrl(pageParam)
    },
    {
      getNextPageParam: lastPage => lastPage.next || undefined
    }
  )

  if (isLoading) {
    return <div className={"loading"}>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
      {isFetching && <div className={"loading"}>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map(pageData => pageData.results.map(person => (
          <Person
            key={person.name}
            name={person.name}
            eyeColor={person.eye_color}
            hairColor={person.hair_color}/>
        )))}
      </InfiniteScroll>
    </>
  );
}
