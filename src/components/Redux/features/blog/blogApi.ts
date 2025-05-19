import { baseApi } from "../../api/baseApi";


const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: () => ({
                url: '/blog/all',
                method: 'GET'
            }),
            providesTags: ['blog']
        }),
        getBlogById: builder.query({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'GET'
            }),
            providesTags: ['blog']
        }),
    })
});

export const {
    useGetAllBlogQuery,
    useGetBlogByIdQuery,
} = blogApi;
