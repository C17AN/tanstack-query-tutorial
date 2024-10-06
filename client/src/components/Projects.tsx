import { useState } from "react";
import { useProjects } from "../services/queries";

const Projects = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);
  return (
    <div>
      {/* isFetching은 API 호출이 이루어지고 있는지, isPending은 캐시된 데이터가 있는지를 바라보기 때문에 */}
      {/* placeholderData를 활용하는 상황에서는 isPending이 적절하다. */}
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error : {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page : {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching ? <span>loading...</span> : null}
    </div>
  );
};

export default Projects;
