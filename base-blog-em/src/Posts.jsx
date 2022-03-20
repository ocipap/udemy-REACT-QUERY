import {useEffect, useState} from "react";

import {PostDetail} from "./PostDetail";
import {useQuery, useQueryClient} from "react-query";

const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage >= maxPostPage) {
      return;
    }
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage))
  }, [currentPage, queryClient])

  // replace with useQuery
  const {
    data,
    isError,
    error,
    isLoading,
    isPreviousData
  } = useQuery(["posts", currentPage], () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (<div>
      <h2>Error</h2>
      <p>{error.toString()}</p>
    </div>);
  }

  return (
    <>
      <ul>
        이전 데이터? {isPreviousData.toString()}
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => {
          setCurrentPage(prevPage => prevPage - 1);
        }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => {
          setCurrentPage(prevPage => prevPage + 1);
        }}>
          Next page
        </button>
      </div>
      <hr/>
      {selectedPost && <PostDetail post={selectedPost}/>}
    </>
  );
}
