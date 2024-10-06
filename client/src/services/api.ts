import axios from "axios";
import { Product } from "../types/product";
import { Project } from "../types/projects";
import { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("/todos")).data.map(
    (todo) => todo.id
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`/todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  return await axiosInstance.post("/todos", data);
};

export const updateTodo = async (data: Todo) => {
  return await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  return await axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async (page = 1) => {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
