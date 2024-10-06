import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";

const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { handleSubmit, register } = useForm<Todo>();
  //   const isFetching = useIsFetching();

  //   if (todosIdsQuery.isPending) return <span>loading...</span>;
  if (todosIdsQuery.isError) return <span>There's an error!</span>;

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkedAsDoneSubmit = (data?: Todo) => {
    if (!data) return;
    updateTodoMutation.mutate({ ...data, checked: !data.checked });
  };

  const handleDeleteSubmit = async (id: number) => {
    if (!id) return;
    await deleteTodoMutation.mutateAsync(id);
  };

  return (
    <div>
      {/* <p>fetchStatus: {todosIdsQuery.fetchStatus}</p>
      <p>status: {todosIdsQuery.status}</p>
      <p>fetching : {isFetching}</p> */}

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo : </h4>
        <input placeholder="Title" {...register("title")}></input>
        <br />
        <input placeholder="Description" {...register("description")}></input>
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        />
      </form>

      {/* {todosIdsQuery.data?.map((id) => (
        <div key={id}>{id}</div>
      ))} */}

      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Title: {data?.title}</div>
            <div>Description: {data?.description}</div>
            <div>
              <button
                onClick={() => handleMarkedAsDoneSubmit(data)}
                disabled={updateTodoMutation.isPending}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data.id && (
                <button
                  onClick={() => handleDeleteSubmit(data.id)}
                  disabled={deleteTodoMutation.isPending}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
