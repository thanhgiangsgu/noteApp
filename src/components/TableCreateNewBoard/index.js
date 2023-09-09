import React, { useState , useEffect} from 'react'

import { Space, Typography, Radio, Input } from 'antd'
import './TableCreateNewBoard.css'
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const TableCreateNewBoard = ({sendDataToParent, projectInfo, titleModal}) => {

    const dataProject = useSelector((state) => state.projects)
    console.log("projectInfo: ",projectInfo);
    const initState = {
        id: "",
        name: "",
        bg_color: "#6699cc",
    }

    // if (projectInfo == undefined){
    //     projectInfo = initState;
    // }

    const [info, setInfo] = useState(projectInfo);
    const {id, name, bg_color} = info;

    const handleChange = e => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
      }
    
      const handleChangeInput = (name, value) => {
        setInfo({...info, [name]:value})
        console.log(info);
      };

    useEffect(() => {
        sendDataToParent(info);
    },[info])

    useEffect(() => {
        if (titleModal == "Tạo bảng mới")
        {
            setInfo(initState)
        } else if (titleModal == "Chỉnh sửa thông tin")
        {
            console.log("join vao chinh sua thong tin");
            setInfo(projectInfo);
        }
    }, [projectInfo, titleModal])
      

    return (
        <Space direction='vertical' className='container' style={{ witdh: '500px', justifyContent: 'center' }} >
            <Space direction='vertical' className='table-title'>
                <Title level={4}>Tiêu đề</Title>
                <Input 
                    value={name}
                    onChange={(e) => handleChangeInput("name",e.target.value)}
                style={{ width: '450px' }}></Input>
            </Space>



            <Space direction='vertical' className='background-picker' >
                <Title level={4}>Nền</Title>
                <Space>
                    <Radio.Group defaultValue="#6699cc" 
                    onChange={(e) => handleChangeInput("bg_color" , e.target.value)}
                    style={{ justifyContent: 'space-between' }}>
                        <Radio.Button className='radio-item' value="#6699cc" style={{ backgroundColor: "#6699cc" }}><span></span></Radio.Button>
                        <Radio.Button className='radio-item' value="#D29034" style={{ backgroundColor: "#D29034" }}><span></span></Radio.Button>
                        <Radio.Button className='radio-item' value="#519839" style={{ backgroundColor: "#519839" }}><span></span></Radio.Button>
                        <Radio.Button className='radio-item' value="#B04632" style={{ backgroundColor: "#B04632" }}><span></span></Radio.Button>
                        <Radio.Button className='radio-item' value="#89609E" style={{ backgroundColor: "#89609E" }}><span></span></Radio.Button>
                        <Radio.Button className='radio-item' value="#838C91" style={{ backgroundColor: "#838C91" }}><span></span></Radio.Button>
                    </Radio.Group>

                </Space>
            </Space>
            <Title level={5}>Xem trước</Title>
            <Space className='preview-panel' style={{ width: '450px', justifyContent: 'center', backgroundColor: bg_color }}>

                <Space className='left-box-preview box-preview'>
                    <Title className='box-preview-title' level={1}>III</Title>
                </Space>

                <Space className='center-box-preview box-preview' style={{ height: '50px', marginBottom: '100%' }}>
                    <Title className='box-preview-title' level={1}>III</Title>
                </Space>

                <Space className='right-box-preview box-preview'>
                    <Title className='box-preview-title' level={1}>III</Title>
                </Space>

            </Space>
        </Space>

    )
}

export default TableCreateNewBoard