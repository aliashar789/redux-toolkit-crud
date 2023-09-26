import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        items: []
    },
    reducers: {

        addUser: (state, action) => {
            state.items.push(action.payload);
        },

        updateUser: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        deleteUser: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer