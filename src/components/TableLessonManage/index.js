import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Space, message, Dropdown, Select, Input, InputNumber, Row, Col, Timeline } from 'antd';
import StickyBox from 'react-sticky-box';
import TableSubjectManage from '../TableSubjectManage';
import { toDropdownSubject } from '../../utils/toDropdownSubject';
import { } from './lessonSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';




const { Text, Title } = Typography;

const { TextArea } = Input


const TableLessonManage = ({ sendDataToParent, titleModal, dataCurrent }) => {
  const dataSubject = useSelector((state) => state.subjects)
  console.log("titleModal", titleModal);

  const dispatch = useDispatch();
  let dataLesson = useSelector((state) => state.lessons) || null;
  //console.log("dataLesson.currentLesson",dataLesson.currentLesson);



  console.log("currentLesson : ", dataLesson.currentLesson);


  const options = toDropdownSubject(dataSubject.subjectList)

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

  console.log(dataLesson.currentLesson);

  if (dataLesson.currentLesson == undefined)
    {
      console.log("join to if ");
      dataLesson.currentLesson = initState;
      dataLesson.currentLesson = {}
    }

  console.log(dataLesson.currentLesson);


  const [info, setInfo] = useState(dataLesson.currentLesson);
  console.log("info after setState", info);
  const { subject_name, teacher_name, date, start_lesson, end_lesson, word_color, bg_color, room, note } = info


  // const setDataEdit = () => {
  //   info.subject_name = infoEdit.subject_name;
  //   info.teacher_name = infoEdit.teacher_name;
  //   info.date = infoEdit.date
  //   info.start_lesson = infoEdit.start_lesson;
  //   info.end_lesson = infoEdit.end_lesson;
  //   info.word_color = infoEdit.word_color;
  //   info.bg_color = infoEdit.bg_color;
  //   info.room = infoEdit.room;
  //   info.note = infoEdit.note
  // }

  // if (infoEdit)
  // {
  //   console.log("info before setDataEdit", info);
  //   setDataEdit()
  //   console.log("info after setDataEdit", info);
  // }


  const handleChange = e => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
    sendDataToParent(info)
  }

  const handleChangeInput = (name, value) => {
    setInfo((prevInfo) => {
      if (name === 'start_lesson') {
        return { ...prevInfo, start_lesson: value, end_lesson: value };
      } else {
        return { ...prevInfo, [name]: value };
      }
    });
  };

  useEffect(() => {
    sendDataToParent(info)
  }, [info])

  // useEffect(() => {
  //     setInfo(dataLesson.currentLesson)
  // }, [dataLesson.currentLesson])

  useEffect(() => {
    console.log("titleModal : ", titleModal);
    if (titleModal == "Thêm tiết học") {
      setInfo(initState)
    } else if (titleModal == "Sửa tiết học") {
      console.log("Vào sửa tiết học");
      setInfo(dataLesson.currentLesson)
    }
  }, [dataLesson.currentLesson, titleModal])  

  return (

    <Space style={{ width: '100%' }} direction="vertical">

      {console.log("render")}
      <Space >

        <Select
          style={{ width: '150px' }}
          options={options}
          value={subject_name}
          defaultValue={options[0].value}
          name="subject_name"
          onChange={(value) => handleChangeInput("subject_name", value)}
        />



        <Input
          style={{ width: '193px' }}
          placeholder="Tên giáo viên"

          name="teacher_name"
          value={teacher_name}
          // onChange={handleChange}
          onChange={(e) => handleChangeInput('teacher_name', e.target.value)}
        >
        </Input>
        <Select
          style={{ width: '80px' }}
          options={day}
          value={date}
          defaultValue={day[0].value}
          name="date"
          onChange={(value) => handleChangeInput("date", value)}

        />

      </Space>

      <Space direction='horizontal'>
        <Text >Tiết bắt đầu</Text>
        <InputNumber
          style={{ width: '60px' }}
          min={1}
          max={10}
          value={start_lesson}
          name="start_lesson"
          onChange={(value) => handleChangeInput('start_lesson', value)} />


        <Text >Tiết kết thúc</Text>
        <InputNumber style={{ width: '60px' }} min={1} max={10} value={end_lesson}
          onChange={(value) => handleChangeInput('end_lesson', value)} />
        <Text >Phòng</Text>
        <Input name='room' value={room}
          onChange={(e) => handleChangeInput('room', e.target.value)} style={{ width: '100px' }

          }

        />

      </Space>

      <Text type="success">Chọn màu</Text>

      <Space>
        <Text>Màu chữ</Text>
        <Input
          style={{ width: '170px' }}
          defaultValue="#FFFFFF"
          type="color"
          onChange={(e) => handleChangeInput("word_color", e.target.value)}
        />
        <Text>Nền</Text>
        <Input
          style={{ width: '170px' }}
          defaultValue="#6699cc"
          type="color"
          onChange={(e) => handleChangeInput("bg_color", e.target.value)}
        />
      </Space>

      <Space direction='vertical'>
        <Text type='danger'>Ghi chú</Text>
        <TextArea
          name='note'
          value={note}
          onChange={handleChange}
          rows={3} cols={57}></TextArea>

      </Space>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Text type='danger'>Mẫu xem trước</Text>
        <Row justifyContent='center' align={'center'} style={{ backgroundColor: bg_color, width: '100%', height: '100px' }}>
          <Col span={12}><Title style={{ color: word_color }} type='danger' level={6}>GiangCute</Title></Col>
        </Row>
      </Space>
    </Space>
  )
}

export default TableLessonManage


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