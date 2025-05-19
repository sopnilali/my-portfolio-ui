import { baseApi } from "../../api/baseApi";


const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        CreateContact: builder.mutation({
            query: (data) => ({
                url: '/contact',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['contact']
        }),
    })
});

export const {
    useCreateContactMutation,
} = contactApi;
    