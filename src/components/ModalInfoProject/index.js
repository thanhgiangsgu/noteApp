import React from 'react'
import { Space, Typography, Button } from 'antd'
import "./ModalInfoProject.css"
import BoardCanvas from '../BoardCanvas';
const { Title, Text } = Typography;

const ModalInfoProject = () => {
    return (
        // <Space direction='vertical' className='project-container'>
        //     <Space>
        //         <Title level={2} className='project-title'>Ten Project</Title>
        //     </Space>
        //     <Space className='board-canvas' style={{ justifyContent: '' }}>
        //         <Space className='task-box' direction='vertical'>
        //             <Space>
        //                 <Title level={4} className='task-box-title'>Cần làm</Title>
        //             </Space>
        //             <Space className='list-task' direction='vertical'>
        //                 <Space className='task-item'>
        //                     <Space className='task-name'>
        //                         <Title level={5}>Cong viec A </Title>
        //                     </Space>
        //                     <Space className='task-control'>
        //                         <Button>...</Button>
        //                     </Space>
        //                 </Space>
        //                 <Space className='task-item'>
        //                     <Space className='task-name'>
        //                         <Title level={5}>Cong viec A </Title>
        //                     </Space>
        //                     <Space className='task-control'>
        //                         <Button>...</Button>
        //                     </Space>
        //                 </Space>
        //                 <Space className='task-item'>
        //                     <Space className='task-name'>
        //                         <Title level={5}>Cong viec A </Title>
        //                     </Space>
        //                     <Space className='task-control'>
        //                         <Button>...</Button>
        //                     </Space>
        //                 </Space>
        //             </Space>
        //         </Space>
        //         <Space className='task-box'>
        //             <Title level={4} className='task-box-title'>Đang làm</Title>
        //         </Space>
        //         <Space className='task-box'>
        //             <Title level={4} className='task-box-title'>Đã làm</Title>
        //         </Space>
        //     </Space>
        // </Space>

        <BoardCanvas />
    )
}

export default ModalInfoProject