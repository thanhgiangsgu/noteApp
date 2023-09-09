import React, { useEffect, useState } from 'react'
import './Schedule.css'
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import TableSubjectManage from '../components/TableSubjectManage';
import '../components/ModalSubjectManage.css'
import { Typography } from 'antd';
import { Button, Modal, Space, message, Dropdown, Select, Input, InputNumber, Row, Col } from 'antd';
import { toDropdownSubject } from '../utils/toDropdownSubject';
import { useSelector, useDispatch } from 'react-redux';
import TableLessonManage from '../components/TableLessonManage';
import { addLesson } from '../components/TableLessonManage/lessonSlice'
import { addTickArray } from './tickArraySlice';
import { toast } from 'react-hot-toast'
import { addSubject } from '../components/TableSubjectManage/subjectSlice';
import { deleteDataTickArray } from './tickArraySlice'
import { deleteLesson, reRenderTickArray, handleEdit, updateLesson } from '../components/TableLessonManage/lessonSlice'

const Schedule = () => {

  const dataSubject = JSON.parse(localStorage.getItem("Subjects")) || [];
  const Schedule = useState(localStorage.getItem("Schedule") || [[]])
  const options = toDropdownSubject(dataSubject)
  const dataLessons = useSelector((state) => state.lessons);
  console.log(dataLessons.lessonList);
  const data = useSelector((state) => state.subjects);
  const [tmpLesson, setTmpLesson] = useState([])
  const [titleModalManageLesson, setTitleModalManageLesson] = useState("Thêm tiết học");
  const dispatch = useDispatch();
  const initarrSubject = {
    label: "",
    key: '',
  }


  // let tickArray = []

  // let rows = 11;
  //   let columns = 11;



  //   for (let i = 0; i < rows; i++) {
  //     let row = [];
  //     let subjectRow = [];
  //     for (let j = 0; j < columns; j++) {
  //       row.push(0);
  //       subjectRow.push("");
  //     }
  //     tickArray.push(row);
  //   }


  // const reRenderTickArray = () => {
  //   console.log(dataLessons.lessonList);
  //   dataLessons.lessonList.forEach((item) => {
  //     for (let i = item.start_lesson; i <= item.end_lesson; i++) {
  //       console.log(i);
  //       tickArray[item.date][i] = item.end_lesson - i + 1;
  //     }
  //   })
  //   console.log(tickArray);
  // }



  const day = [
    {
      label: "Chọn ngày",
      value: "0"
    },
    {
      label: "Thứ 2",
      value: "2"
    },
    {
      label: "Thứ 3",
      value: "3"
    },
    {
      label: "Thứ 4",
      value: "4"
    },
    {
      label: "Thứ 5",
      value: "5"
    },
    {
      label: "Thứ 6",
      value: "6"
    },
    {
      label: "Thứ 7",
      value: "7"
    },
    {
      label: "Chủ Nhật",
      value: "8"
    },

  ]

  const initState = {
    subject_name: options[0].value,
    teacher_name: "",
    date: day[0].value,
    start_lesson: 1,
    end_lesson: 1,
    word_color: "white",
    bg_color: "rgb(102, 153, 204)",
    room: "",
    note: ""
  };




  const [info, setInfo] = useState(initState);
  const { subject_name, teacher_name, date, start_lesson, end_lesson, word_color, bg_color, room, note } = info

  const arrSubject = initarrSubject;


  const item = new Array(2);

  // item là mảng để lưu các thành phần của các tab 

  item[0] = {
    label: `Quản lý môn học`,
    key: 1,
    children: <TableSubjectManage />,
    style: 1 === 0 ? { height: 200 } : undefined,
  }
  item[1] = {
    label: `Quản lý tiết học`,
    key: 2,
    children: "hello",
    style: 2 === 0 ? { height: 200 } : undefined,
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1, width: '100%' }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer, textAlign: 'center', justifyContent: 'center' }} />
    </StickyBox>
  );
  //const [selectionType, setSelectionType] = useState('checkbox');
  // isOpen là  biến để kiểm tra mở hay đóng Modal 
  const [isOpen, setIsOpen] = useState(false)
  // isOpenLessonBtn để kiểm tra mở hay đóng của nút Thêm tiết học
  const [isOpenLessonBtn, setIsOpenLessonBtn] = useState(false);
  // thay đổi tiêu đề của button
  const [titleLessonBtn, setTitleLessonBtn] = useState("Thêm tiết học")

  //const [data, setData] = useState(JSON.parse(localStorage.getItem("Lessons")) || [])

  const lessonControl = [
    {

    }
  ]
  // hàm show modal 
  const show = () => {
    setIsOpen(true);
  }
  // ẩn modal
  const hide = () => {
    setIsOpen(false);
  }

  // ẩn modal
  const cancel = () => {
    setIsOpen(false)
  }

  const handleLessonBtn = () => {
    setTitleModalManageLesson("Thêm tiết học")
    setIsOpenLessonBtn(true)
  }

  // let twoDimensionalArray = [];
  // let twoDimensionalNameSubjectArr = [];

  // for (let i = 0; i < rows; i++) {
  //   let row = [];
  //   let rowName = [];
  //   for (let j = 0; j < columns; j++) {
  //     row.push(0);
  //     rowName.push("");
  //   }
  //   twoDimensionalArray.push(row);
  //   twoDimensionalNameSubjectArr.push(rowName);
  // }




  //const [tickArray, setTickArray] = useState(JSON.parse(localStorage.getItem("tickArray")) || twoDimensionalArray)
  //const [tickNameSubjectArr, setTickNameSubjectArr] = useState(JSON.parse(localStorage.getItem("tickNameSubjectArr")) || []);

  const checkLesson = (info, list) => {
    let check = true;
    console.log("dataLessons.lessonList", list);
    list.forEach(element => {
      if (element.date == info.date) {

        if ((element.start_lesson <= info.start_lesson && element.end_lesson >= info.start_lesson)
          || (info.start_lesson <= element.start_lesson && info.end_lesson >= element.start_lesson)) {
          check = false;
        }
      }
    }
    );
    return check;
  }

  const handleTickArray = (info) => {

    // for (let i = info.start_lesson; i <= info.end_lesson; i++) {
    //   console.log(i);
    //   tickArray.tic[info.date][i] = info.end_lesson - i + 1
    // }


    // setTickArray([...tickArray])
    // localStorage.setItem("tickArray", JSON.stringify(tickArray));
    // //ocalStorage.setItem("tickNameSubjectArray", JSON.stringify(setTickNameSubjectArray));
    // console.log("co gia tri ", info);
    // tickNameSubjectArr[info.date][info.start_lesson] = info.subject_name;
    // setTickNameSubjectArr([...tickNameSubjectArr]);
    // localStorage.setItem("tickNameSubjectArr", JSON.stringify(tickNameSubjectArr));


  }
  const hideLessonModal = () => {
    if (titleModalManageLesson == "Thêm tiết học") {
      console.log("them tiet hoc");
      if (info.subject_name == "Chọn môn học") {
        alert("Vui lòng chọn môn học")
      } else {
        if (checkLesson(info, dataLessons.lessonList)) {
          if (info.teacher_name == "")
            info.teacher_name = "Chưa rõ thông tin giáo viên"
          if (info.room == "")
            info.room = "Chưa rõ thông tin phòng"
          if (info.note == "")
            info.note = "Không có ghi chú"
          //   dataLessons.lessonList.push(info)
          // alert("Theem thanfh cong")
          // // xử lý bảng đánh dấu

          {
            dispatch(
              addLesson({
                ...info,
              })
            );
            dispatch(
              reRenderTickArray({
              })
            );
            toast.success("Thanh cong")
          }
          setIsOpenLessonBtn(false)
        } else {
          toast.error("Dữ liệu đã tồn tại", {
            position: 'top-right'
          })
        }
      }
    } else {
      let check = true;
      dataLessons.lessonList.forEach(element => {
        if (element.date != dataLessons.currentLesson.date || element.start_lesson != dataLessons.currentLesson.start_lesson) {
          let checkTmp = checkLesson(info, dataLessons.lessonList)
          
          if (!checkTmp)
          {
            check = false;
          }
        }
      })

      if (check) {
        dispatch(
          updateLesson({
            ...info
          })
        )
        dispatch(
          reRenderTickArray({
            
          })
        )

      } else 
      {
        toast.error("Thời khóa biểu bị trùng", {
          position: 'top-right'
        })
      }


    }
  }



  const cancelLessonModal = () => {
    setIsOpenLessonBtn(false)
  }

  const receiveDataFromChild = (data) => {
    setInfo(data);
  };


  const handleEditLesson = () => {
    setTitleModalManageLesson("Sửa tiết học")
    dispatch(
      handleEdit({
        ...tmpLesson,
      })
    );
    setIsOpenLessonBtn(true)
  }

  const handleDeleteLesson = () => {
    console.log("handleDeleteLesson");
    dispatch(
      deleteLesson({
        ...tmpLesson,
      })
    )
    dispatch(
      reRenderTickArray({
      })
    );
    console.log("dataLesson before render ", dataLessons);
  };

  const items = [
    {
      key: 'edit',
      label: (
        <p
          onClick={() => handleEditLesson()}
        >Sửa</p>
      ),
    },
    {
      key: 'delete',
      label: (
        <p
          onClick={() => handleDeleteLesson()}
        >Xóa</p>
      ),
    },

  ];

  const handleDropdownClick = (data) => {
    console.log(data);
  }

  const handleSetTmpLesson = (subject) => {
    console.log(subject);
  }

  const handleMouseEnter = (subject) => {
    setTmpLesson(subject)
  }

  useEffect(() => {
    console.log(tmpLesson);
  }, [])


  return (
    <>
      <h1>Thời khóa biểuuuu</h1>
      <>

        <Space style={{ float: 'right', marginRight: '5%', marginBottom: '5px' }}>

          <Button type="primary" onClick={handleLessonBtn}>{titleLessonBtn}</Button>
          <Button type="primary" onClick={show}>Quản lý môn học</Button>

        </Space>
        <Space>
          <div>
            <Modal style={{ width: '1200px' }} className='sizeModal' title="Basic Modal" open={isOpen} onOk={hide} onCancel={cancel}>

              <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={item} />;

            </Modal>

            <Modal style={{ width: '1200px !important' }} className='sizeModalAddLesson' title={titleModalManageLesson} open={isOpenLessonBtn} onOk={hideLessonModal} onCancel={cancelLessonModal}>
              <TableLessonManage sendDataToParent={receiveDataFromChild} titleModal={titleModalManageLesson} dataCurrent={tmpLesson} />
            </Modal>
          </div>
        </Space>





      </>
      <table className='scheduleTable'>
        <tr>
          <th style={{ width: '30px' }}>Time</th>
          <th>Thứ 2</th>
          <th>Thứ 3</th>
          <th>Thứ 4</th>
          <th>Thứ 5</th>
          <th>Thứ 6</th>
          <th>Thứ 7</th>
          <th>Chủ Nhật</th>
        </tr>


        {

          [...Array(10).keys()].map(index => (
            <tr key={index}>
              <td>{index + 1}</td>
              {[...Array(7).keys()].map(colIndex => {
                if (dataLessons.tickList[colIndex + 2][index + 1] == 0) {
                  // return <td rowSpan={tickArray[index][colIndex]} key={colIndex}>data</td>;
                  return <td></td>
                } else if (dataLessons.tickList[colIndex + 2][index + 1] > 0) {
                  if (dataLessons.tickList[colIndex + 2][index] <= 1) {
                    const subject = dataLessons.lessonList.find(item => item.date == colIndex + 2 && item.start_lesson == index + 1);
                    return (
                      <>
                        <td
                          onMouseEnter={() => handleMouseEnter(subject)}
                          className='lesson-box' style={{ backgroundColor: subject.bg_color, color: subject.word_color }}
                          rowSpan={subject.end_lesson - subject.start_lesson + 1}>
                          {subject.subject_name + " " + "(" + subject.room + " - " + subject.teacher_name + " )"}
                          <div className="lesson-controls">
                            <Dropdown
                              menu={{
                                items,
                              }}
                              placement="topRight"

                            >
                              <div>

                                <Button>...</Button>
                              </div>
                            </Dropdown>
                          </div>

                          <div className="hover-bubble">
                            <p>{subject.note}</p>
                          </div>

                        </td>

                      </>
                    )
                  }
                }
              })}
            </tr>
          ))}

      </table>

    </>
  )
}

export default Schedule	


