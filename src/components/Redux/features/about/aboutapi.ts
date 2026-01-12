import { baseApi } from "../../api/baseApi";



const aboutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAbout: builder.query({
            query: () => ({
                url: '/about',
                method: 'GET'
            }),
            providesTags: ['about']
        })
    })
})

export const {
    useGetAllAboutQuery,
} = aboutApi;