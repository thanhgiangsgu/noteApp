import { createSlice } from "@reduxjs/toolkit"
import { lessonList } from "../components/TableLessonManage/lessonSlice";


const ROWS = 11;
const COLS = 11;


const tickArraySlice = createSlice(
    {
    name: "tickArray",
    initialState: {
        tickList: Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0)),
        lessonList: lessonList,
    },
    reducers: {
        // addTickArray: (state, action) => {
        //     const data = action.payload;
        //     for (let i = data.start_lesson; i<= data.end_lesson; i++)
        //     {
        //         state.tickList[data.date][i] = data.end_lesson - i + 1;
        //     }
        // },
        // deleteDataTickArray: (state, action) => {
        //     const data = action.payload;
        //     for (let i = data.start_lesson; i<= data.end_lesson; i++)
        //     {
        //         state.tickList[data.date][i] = 0;
        //     }
        // }

        reRenderTickArray: (state, action) => {
            console.log(state.tickList);
        }
    }
}
)
export const { addTickArray, deleteDataTickArray, reRenderTickArray } = tickArraySlice.actions
export default tickArraySlice.reducer