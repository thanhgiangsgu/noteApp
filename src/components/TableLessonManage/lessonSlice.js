import { createSlice, current } from "@reduxjs/toolkit"

const ROWS = 11;
const COLS = 11;

const lessonSlice = createSlice(

    {
        name: "lessons",
        initialState: {
            info: {},
            lessonList: [],
            tickList: Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0)),
            currentLesson: undefined,
        },
        reducers: {
            addLesson: (state, action) => {
                const lesson = action.payload;
                state.lessonList.push(lesson)
                console.log(lesson);
            },
            deleteLesson: (state, action) => {
                const lesson = action.payload;
                console.log("lesson : ", lesson);

                const listLessonAfterUpdate = current(state.lessonList)
                console.log("listLessonAfterUpdate", listLessonAfterUpdate);
                const tmpDataLesson = [];
                for (let i = 0; i < listLessonAfterUpdate.length; i++) {

                    if (listLessonAfterUpdate[i].date != lesson.date && listLessonAfterUpdate.start_lesson != lesson.start_lesson) {

                        tmpDataLesson.push(listLessonAfterUpdate[i]);
                    }
                    console.log(listLessonAfterUpdate[i]);
                }
                console.log("tmpData", tmpDataLesson);
                state.lessonList = [...tmpDataLesson];
                console.log(state.lessonList);
            },
            updateLesson: (state, action) => {
                const updatedLesson = action.payload;
                const currentLesson = current(state.currentLesson)
                let listLesson = current(state.lessonList)
                // listLesson.forEach((item, index) => {
                //     if (item.date == currentLesson.date && item.start_lesson == currentLesson.start_lesson)
                //     {
                //         // console.log("listLesson[index]", listLesson[index]);
                //         // console.log("updatedLesson: ", updatedLesson);
                //         for (let key in updatedLesson) {
                //             if (listLesson[index].hasOwnProperty(key) ) {
                //                 listLesson[index][key] = updateLesson[key];
                //                 console.log(listLesson[index][key]);
                //                 console.log(updatedLesson[key]);
                //             }
                //           }
                //         // listLesson[index] = updateLesson
                //     }
                // })
                // state.listLesson = [...listLesson]

                const listLessonAfterUpdate = current(state.lessonList).map((item, index) => {
                    if (item.date == currentLesson.date && item.start_lesson == currentLesson.start_lesson) {
                        console.log("tim duoc ", item);
                        return {
                            ...item,
                            subject_name: updatedLesson.subject_name,
                            teacher_name: updatedLesson.teacher_name,
                            date: Number(updatedLesson.date),
                            start_lesson: Number(updatedLesson.start_lesson),
                            end_lesson: Number(updatedLesson.end_lesson),
                            word_color: updatedLesson.word_color,
                            bg_color: updatedLesson.bg_color,
                            room: updatedLesson.room,
                            note: updatedLesson.note,
                        }
                    } else {
                        return item;
                    }
                })
                console.log("listLessonAfterUpdate: ", listLessonAfterUpdate);
                state.lessonList = [...listLessonAfterUpdate];

            },
            reRenderTickArray: (state, action) => {
                const tmpData = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
                console.log(tmpData);
                const dataLesosn = current(state.lessonList)
                console.log("dataLesosn", dataLesosn);
                dataLesosn.forEach((data) => {
                    console.log("data: ", data);
                    for (let i = data.start_lesson; i <= data.end_lesson; i++) {
                        tmpData[data.date][i] = data.end_lesson - i + 1;
                    }
                })
                console.log(tmpData);
                state.tickList = [...tmpData];
            },
            handleEdit: (state, action) => {
                state.currentLesson = action.payload;
            }
        }
    }
)


export const { addLesson, deleteLesson, reRenderTickArray, handleEdit, updateLesson } = lessonSlice.actions
export default lessonSlice.reducer
export const lessonList = (state) => state.lesson.lessonList;
