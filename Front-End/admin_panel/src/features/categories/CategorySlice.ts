import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Result, Results, CategoryParams } from "../../types/Category";
export interface Category {
    id: string;
    name: string;
    is_active: boolean,
    created_at: string;
    Updated_at: string;
    deleted_at: null | string;
    description: null | string;

}
const endpointUrl = "/categories";
function parseQueryParams(params: CategoryParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}
function getCategories({ page = 1, perPage = 10, search = "" }) {
    const params = { page, perPage, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}
export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query }) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"],

        })
    })
})


// const category = {
//     id: "0ce68ddd-4981-4ee2-a23b-a01452b96b01",
//     name: "Olive",
//     description: "earum quo at dolar tempore nisi.",
//     is_active: true,
//     deleted_at: null,
//     created_at: "2022-08-15T10:59:09+0000",
//     Updated_at: "2022-08-15T10:59:09+0000",
// }


// export const initialState = [
//     category,
//     { id: "1ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Helou", description: "earum quo at dolar tempore nisi.", is_active: true, deleted_at: null, created_at: "2022-08-15T10:59:09+0000", Updated_at: "2022-08-15T10:59:09+0000", },
//     { id: "2ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Alice", description: "earum quo at dolar tempore nisi.", is_active: true, deleted_at: null, created_at: "2022-08-15T10:59:09+0000", Updated_at: "2022-08-15T10:59:09+0000", },
//     { id: "3ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Bona", description: "earum quo at dolar tempore nisi.", is_active: true, deleted_at: null, created_at: "2022-08-15T10:59:09+0000", Updated_at: "2022-08-15T10:59:09+0000", },
//     { id: "4ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Heli", description: "earum quo at dolar tempore nisi.", is_active: true, deleted_at: null, created_at: "2022-08-15T10:59:09+0000", Updated_at: "2022-08-15T10:59:09+0000", },
// ]

// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState: initialState,
//     reducers: {
//         createCategory(state, action) {
//             state.push(action.payload);
//         },
//         updateCategory(state, action) {
//             //find index on state of category to update
//             const index = state.findIndex((category) => category.id === action.payload.id)
//             //update category on state
//             state[index] = action.payload

//         },
//         deleteCategory(state, action) {

//             const index = state.findIndex(
//                 (category) => category.id === action.payload.id
//             );
//             state.splice(index, 1);
//         },
//     },
// })
// //Selectors
// export const selectCategories = (state: RootState) => state.categories;

// //Select category by id
// export const selectCategoryById = (state: RootState, id: string) => {
//     const category = state.categories.find((category) => category.id === id);
//     return (
//         category || {
//             id: "",
//             name: "",
//             description: "",
//             is_active: false,
//             deleted_at: null,
//             created_at: "",
//             Updated_at: "",
//         }
//     );
// }

// export default categoriesSlice.reducer;
// export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const {
    useGetCategoriesQuery
} = categoriesApiSlice;