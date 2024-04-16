// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: (id) => `user/employees/${id}`,
      providesTags: ["Employees"],
    }),

    getEmployee: builder.query({
      query: (id) => `employees/${id}`,
      invalidatesTags: ["Employees"],
    }),

    createEmployee: builder.mutation({
      query: (title) => ({ 
        url: `employees`,
        method: 'POST',
        body: title,
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEmployeeQuery, useGetEmployeeQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;