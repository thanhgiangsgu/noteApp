import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "../components/TableSubjectManage/subjectSlice"
import lessonReducer from "../components/TableLessonManage/lessonSlice"
import tickArrayReducer from "../pages/tickArraySlice"
import projectReducer from "../components/TableCreateNewBoard/projectSlice"
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whileList: ['subjects', 'lessons', 'projects']
};



const rootReducer = combineReducers({
  subjects: subjectReducer,
  lessons: lessonReducer,
  tickArray: tickArrayReducer,
  projects: projectReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
      }),
});


export const persistor = persistStore(store);