import { createSlice, current } from "@reduxjs/toolkit"

const projectSlice = createSlice(
    {
        name: "projects",
        initialState: {
            info: {},
            projectList: [],
            taskList: [],
            currentProject: undefined,
        },
        reducers: {
            addProject: (state, action) => {
                const project = action.payload;
                state.projectList.push(project);
            },

            updateProject: (state, action) => {
                const projectUpdated = action.payload;
                const currentProject = current(state.currentProject)
                const listProjectAfterUpdate = current(state.projectList).map((item, index) => {
                    if (item.id == currentProject.id)
                    {
                        return {
                            ...item,
                            name: projectUpdated.name,
                            bg_color: projectUpdated.bg_color,
                        }
                    } else {
                        return item; 
                    }
                })

                state.projectList = [...listProjectAfterUpdate];
            },

            deleteProject: (state, action) => {
                const projectDeleted = action.payload;
                const listProject = current(state.projectList)
                const listProjectAfterUpdate = []
                listProject.forEach((item) => {
                    if (item.id != projectDeleted.id)
                    {
                        listProjectAfterUpdate.push(item)
                    }
                })
                state.projectList = [...listProjectAfterUpdate]
            },              



            addTask: (state, action) => {
                const task = action.payload
                state.taskList.push(task);
            },
            updateTask: (state, action) => {
                console.log("updateTask");
                const task = action.payload;
                console.log(task);
                const listTaskAfterUpdate = current(state.taskList).map((item, index) => {
                    if (item.id == task.id) {
                        return {
                            ...item,
                            name: task.name,
                            type: task.type,
                        }
                    } else {
                        return item;
                    }
                })
                return {
                    ...state,
                    taskList: listTaskAfterUpdate,
                  };
            },
            deleteTask: (state, action) => {
                console.log("deleteTask");
                let task = action.payload;

                const taskListAfterUpdate = [];
                current(state.taskList).map((item) => {
                    if (item.id != task.id) {
                        taskListAfterUpdate.push(item);
                    }
                })
                console.log(taskListAfterUpdate);
                state.taskList = [...taskListAfterUpdate]
            }, 
            handleEdit: (state, action)=> {
                state.currentProject = action.payload;
            }, 
            clearCurrentProject: (state, action) => {
                state.currentProject = undefined;
            }
        }
    }
)

export const { addProject, addTask, deleteTask, updateTask ,handleEdit, updateProject, deleteProject, clearCurrentProject} = projectSlice.actions
export default projectSlice.reducer
