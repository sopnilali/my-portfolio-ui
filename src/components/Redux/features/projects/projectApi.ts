import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProject: builder.query({
            query: () => ({
                url: '/project',
                method: 'GET'
            }),
            providesTags: ['project']
        }),
        getProjectById: builder.query({
            query: (id) => ({
                url: `/project/${id}`,
                method: 'GET'
            }),
            providesTags: ['project']
        })
    })
});

export const {
    useGetAllProjectQuery,
    useGetProjectByIdQuery
} = projectApi;
    