import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Input, Button, Dropdown, Modal, Col } from "antd";
import "./BoardCanvas.css";
import { useSelector } from "react-redux";
import { addTask, deleteTask, updateTask } from "../TableCreateNewBoard/projectSlice";
import { useDispatch } from "react-redux";
import { updateLesson } from "../TableLessonManage/lessonSlice";
import { toast } from "react-hot-toast";

const { TextArea } = Input;

const initialState = {
    id: '',
    projectId: '',
    name: '',
    type: '',
}

const BoardCanvas = (projectInfo) => {
    //const [newCardTitle, setNewCardTitle] = useState("");
    const [newCardTodoTitle, setNewCardTodoTitle] = useState("");
    const [newCardInProgressTitle, setNewCardInProgressTitle] = useState("");
    const [newCardDoneTitle, setNewCardDoneTitle] = useState("")
    const tasks = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const [tmpTask, setTmpTask] = useState(initialState)
    console.log(tmpTask);
    const [dataEditTask, setDataEditTask] = useState("")
    const [isOpenModalEditTask, setIsOpenModalEditTask] = useState(false)
    const todo = [];
    const inProgress = [];
    const done = []




    const hideModalEditTask = () => {
        if (dataEditTask != "") {
            console.log(tmpTask);
            const updatedTask = { ...tmpTask, name: dataEditTask };
            console.log(updatedTask);
            dispatch(
                updateTask({
                    ...updatedTask,
                })
            );
            setDataEditTask("");
            setIsOpenModalEditTask(false)
        } else {
            toast.error("Vui lòng nhập đầy đủ thông tin ", {
                position: 'top-right'
            })
        }

    }

    const cancelModalEditTask = () => {
        setDataEditTask("");
        setIsOpenModalEditTask(false)
    }

    const showModalEditTask = () => {
        setDataEditTask("");
        setIsOpenModalEditTask(true)
    }


    const handleEditTask = () => {
        showModalEditTask()
    }

    const handleDeleteTask = () => {
        dispatch(
            deleteTask({
                ...tmpTask,
            })
        );
    }

    const handleMove = (newType) => {
        console.log("tmpTask",tmpTask);
        const updatedTask = {...tmpTask, type: newType}
        console.log("updateTask",updatedTask);
        dispatch(
            updateTask({
                ...updatedTask,
            })
        );
    }

    const items = [
        {
            key: 'edit',
            label: (
                <p
                    onClick={() => handleEditTask()}
                >Sửa</p>
            ),
        },
        {
            key: 'delete',
            label: (
                <p
                    onClick={() => handleDeleteTask()}
                >Xóa</p>
            ),
        },
        {
            key: 'moveTodo',
            label: (
                <p
                    onClick={() => handleMove(1)}
                >Cần làm</p>
            )
        },
        {
            key: 'moveInProgress',
            label: (
                <p
                    onClick={() => handleMove(2)}
                >Đang làm</p>
            )
        },
        {
            key: 'moveDone',
            label: (
                <p
                    onClick={() => handleMove(3)}
                >Đã làm</p>
            )
        }

    ];




    const renderTask = () => {
        tasks.taskList.map(item => {
            console.log("item.projectId: ",item.projectId );
            if(item.projectId == projectInfo.projectInfo.id)
            {
                if (item.type == 1) {
                    todo.push(item);
                } else if (item.type == 2) {
                    inProgress.push(item)
                } else {
                    done.push(item);
                }
            } 
        })
    }
    renderTask();

    const addNewCard = (newCardTitle, type) => {
        let tmpData = {
            id: Date.now(),
            projectId: projectInfo.projectInfo.id,
            name: newCardTitle,
            type: type,
        }

        console.log(tmpData);

        dispatch(
            addTask({
                ...tmpData,
            })
        );

        setNewCardDoneTitle("");
        setNewCardInProgressTitle("");
        setNewCardTodoTitle("");
    }

    const handleMouseEnter = (task) => {
        setTmpTask(task)
    }

    useEffect(() => {
        console.log(tmpTask);
    }, [tmpTask])




    return (
        <div className="board-canvas" style={{ backgroundColor: projectInfo.projectInfo.bg_color }}>
            <div className="board-canvas__list">
                <h3 className="board-canvas__list-title">Cần làm</h3>
                {todo.map((taskItem) => {
                    return (
                        <div
                            onMouseEnter={() => handleMouseEnter(taskItem)}
                            className="board-canvas__card">
                            <div className="board-canvas__card__task-name">{taskItem.name}</div>
                            <div className="board-canvas__card__control">
                                <Dropdown
                                    menu={{
                                        items: items.filter(item => item.key != 'moveTodo'),
                                    }}

                                >
                                    <div>

                                        <Button>...</Button>
                                    </div>
                                </Dropdown>
                            </div>

                        </div>
                    )
                })}

                <div className="board-canvas__add-card">
                    <TextArea
                        rows={2}
                        placeholder="Add a new task"
                        value={newCardTodoTitle}
                        onChange={(e) => setNewCardTodoTitle(e.target.value)}
                    />

                    <Button
                        type="primary"
                        onClick={() => addNewCard(newCardTodoTitle, 1)}
                        disabled={!newCardTodoTitle}
                    >
                        Add Card
                    </Button>
                </div>
            </div>

            <div className="board-canvas__list">
                <h3 className="board-canvas__list-title">Đang làm</h3>
                {inProgress.map((taskItem) => {
                    return (
                        <div
                            onMouseEnter={() => handleMouseEnter(taskItem)}
                            className="board-canvas__card">
                            <div className="board-canvas__card__task-name">{taskItem.name}</div>
                            <div className="board-canvas__card__control">
                                <Dropdown
                                    menu={{
                                        items: items.filter(item => item.key != 'moveInProgress'),
                                    }}

                                >
                                    <div>

                                        <Button>...</Button>
                                    </div>
                                </Dropdown>
                            </div>

                        </div>
                    )
                })}

                <div className="board-canvas__add-card">
                    <TextArea
                        placeholder="Add a new task"
                        value={newCardInProgressTitle}
                        onChange={(e) => setNewCardInProgressTitle(e.target.value)}
                    />

                    <Button
                        type="primary"
                        onClick={() => addNewCard(newCardInProgressTitle, 2)}
                        disabled={!newCardInProgressTitle}
                    >
                        Add Card
                    </Button>
                </div>
            </div>

            <div className="board-canvas__list">
                <h3 className="board-canvas__list-title">Đã làm</h3>
                {done.map((taskItem) => {
                    return (
                        <div
                            onMouseEnter={() => handleMouseEnter(taskItem)}
                            className="board-canvas__card">
                            <div className="board-canvas__card__task-name">{taskItem.name}</div>
                            <div className="board-canvas__card__control">
                                <Dropdown
                                    menu={{
                                        items: items.filter(item => item.key != 'moveDone'),
                                    }}

                                >
                                    <div>

                                        <Button>...</Button>
                                    </div>
                                </Dropdown>
                            </div>

                        </div>
                    )
                })}

                <div className="board-canvas__add-card">
                    <TextArea
                        rows={2}
                        placeholder="Add a new task"
                        value={newCardDoneTitle}
                        onChange={(e) => setNewCardDoneTitle(e.target.value)}
                    />

                    <Button
                        type="primary"
                        onClick={() => addNewCard(newCardDoneTitle, 3)}
                        disabled={!newCardDoneTitle}
                    >
                        Add Card
                    </Button>
                </div>
            </div>
            <Modal className='modalEditTask' title='Sửa thông tin'
                onClick={showModalEditTask}
                open={isOpenModalEditTask}
                onOk={hideModalEditTask}
                onCancel={cancelModalEditTask}
            >
                <Input
                    onChange={(e) => setDataEditTask(e.target.value)}
                    value={dataEditTask}
                    placeholder={tmpTask.name}></Input>
            </Modal>
        </div>



    )
}

export default BoardCanvas