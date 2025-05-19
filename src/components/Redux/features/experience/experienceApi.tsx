import { baseApi } from "../../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllExperience: builder.query({
            query: () => ({
                url: '/experience',
                method: 'GET'
            }),
            providesTags: ['project']
        }),
    })
});

export const {
    useGetAllExperienceQuery,
} = experienceApi;