
import { baseApi } from "../../api/baseApi";

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSkills: builder.query({
            query: () => ({
                url: '/skill',
                method: 'GET'
            }),
            providesTags: ['project']
        }),
    })
});

export const {
    useGetAllSkillsQuery,
} = skillApi;