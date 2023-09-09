// Import thu vien
import React from 'react'
import { useState, useEffect } from 'react';
import { Typography, Space, Button, Modal, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, handleEdit, updateProject, deleteProject, clearCurrentProject } from '../components/TableCreateNewBoard/projectSlice';

// import component
import TableCreateNewBoard from '../components/TableCreateNewBoard';
import './Task.css'
//import ModalInfoProject from '../components/ModalInfoProject';
import BoardCanvas from '../components/BoardCanvas';


const { Title, Text } = Typography;
const Task = () => {

  const dispatch = useDispatch()
  const [isOpenModalCreateBoard, setIsOpenMidalCreateBoard] = useState(false);
  const [isOpenModalProject, setIsOpenModalProject] = useState(false);
  const [info, setInfo] = useState({});
  const [tmpProject, setTmpProject] = useState([])
  const [titleModalManageProject, setTitleModalManageProject] = useState("Tạo bảng mới")


  const handleEditProject = () => {
    dispatch(
      handleEdit({
        ...tmpProject
      }))
    setTitleModalManageProject("Chỉnh sửa thông tin")
    setIsOpenMidalCreateBoard(true)
  }

  const handleDeleteProject = () => {
    dispatch(
      deleteProject({
        ...tmpProject
      }))
      toast.success("Xoa thanh cong", {
        position: 'top-right'
      })
    setIsOpenModalProject(false)
  }

  const cancelModalCreateBoard = () => {
    setIsOpenMidalCreateBoard(false);
  }

  const cancelModalProject = () => {
    setIsOpenModalProject(false)
  }

  const showModalCreateBoad = () => {
    setTitleModalManageProject("Tạo bảng mới")
    setIsOpenMidalCreateBoard(true)
  }

  const showModalProject = () => {
    setIsOpenModalProject(true)
  }

  const receiveDataFromChild = (data) => {
    setInfo(data);
  };
  const handleMouseEnter = (project) => {
    setTmpProject(project);
  }

  const items = [
    {
      key: 'edit',
      label: (
        <p
          onClick={() => handleEditProject()}
        >Sửa</p>
      ),
    },
    {
      key: 'delete',
      label: (
        <p
          onClick={() => handleDeleteProject()}
        >Xóa</p>
      ),
    },
    {
      key: 'detail',
      label: (
        <p
          onClick={showModalProject}
        >Chi tiết</p>
      ),
    }
  ]


  const projects = useSelector((state) => state.projects)

  const hideModalCreateBoard = () => {
    if (info.name != "") {
      if (titleModalManageProject == "Tạo bảng mới") {
        info.id = Date.now();
        dispatch(
          addProject({
            ...info,
          })
        );
        toast.success("Thêm thành công")
       
        
      } else 
      {
        dispatch(
          updateProject({
            ...info,
          })
        );
        toast.success("Cap nhat thanh cong")
      }
      dispatch(
        clearCurrentProject({
        }))
        setIsOpenMidalCreateBoard(false)
    } else {
      toast.error("Vui long nhap day du thong tin ")
    }

  }

  const hideModalProject = () => {
    
  }





  useEffect(() => {
    console.log(tmpProject);
  }, [tmpProject])

  return (
    <>

      <Title level={1}>Không gian làm việc</Title>
      <Space style={{ float: 'right', marginRight: '5%', marginBottom: '5px' }}>
        <Button type="primary" onClick={showModalCreateBoad}>Tạo bảng mới </Button>
      </Space>
      <Space direction='vertical'>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <UserOutlined style={{ fontSize: '40px' }} />
            <Title level={3}>Các bảng của bạn</Title>
          </Space>
        </Space>
        <Space className='boards-page-team-section' style={{ width: '95%', margin: 'auto 10px', display: 'flex', flexWrap: 'wrap' }}>
          {projects.projectList && projects.projectList.map((item) => {
            return (
              <Space

                onMouseEnter={() => handleMouseEnter(item)}
                className='board-item' style={{ backgroundColor: item.bg_color }}>
                <Title className='board-item-title'>{item.name}</Title>
                <div className='board-item_control'>
                  <Dropdown
                    menu={{
                      items,
                    }}

                  >
                    <div>

                      <Button>...</Button>
                    </div>
                  </Dropdown>
                </div>
              </Space>
            )
          })}

          {/* <Space className='board-item' style={{backgroundColor: 'blue'}}>
            <Title className='board-item-title'>MyNoteApp</Title>
          </Space> */}
        </Space>

        <Modal style={{ width: '1200px !important' }} className='sizeModalCreateBoard' title={"Tạo bảng mới"}
          open={isOpenModalCreateBoard}
          onOk={hideModalCreateBoard}
          onCancel={cancelModalCreateBoard}>
          <TableCreateNewBoard sendDataToParent={receiveDataFromChild} projectInfo={tmpProject} titleModal={titleModalManageProject} />
        </Modal>

        <Modal className='sizeModalProject' title={"Thông tin dự án"}
          open={isOpenModalProject}
          onOk={hideModalProject}
          onCancel={cancelModalProject}>
          <BoardCanvas projectInfo={tmpProject} />
        </Modal>

      </Space>



    </>
  )

  //how to center the div?
}

export default Task