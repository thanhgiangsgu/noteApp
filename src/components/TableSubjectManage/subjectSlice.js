import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    info: {},
    subjectList: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    
    addSubject: (state, action) => {
      const subject = action.payload;
      if (validateSubject(subject,state.subjectList)) {
        state.subjectList.push(subject)
        console.log(subject);
      }
    }, 
    updateSubject: (state, action) => {
      const updatedSubject = action.payload
      const listSubjectAfterUpdate = current(state.subjectList).map((item, index) => {
        if(item.subject_name  == updatedSubject.subject_name)
        {
          return {...item, note: updatedSubject.note}
        }else{
          return item;
        }
      })
      state.subjectList = [...listSubjectAfterUpdate];
    }, 
    deleteSubject: (state, action) => {
      state.subjectList = [...action.payload];
    }
  },
});

const validateSubject = (subject, subjectList) => {
  if (subject.subject_name == "" || subject.note == "") {
    toast.error("Chưa đủ thông tin", {
      position: 'top-right'
    })
    return false
} else {
    const found = subjectList.find(element => element.subject_name == subject.subject_name);
    if (!found) {
        subject.id = Date.now();
        subject.key = subject.id;
        return true;
    } else {
        toast.error("Dữ liệu đã tồn tại", {
          position: 'top-right'
        })
        return false
    }
}
}

console.log("vao subjectList");

export const { addSubject, updateSubject,deleteSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
