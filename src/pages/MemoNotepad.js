import React from 'react'
import { useState } from 'react'
import { Space, Button, Layout, Input } from 'antd'
import { MinusOutlined, PlusOutlined, EditTwoTone, FileSearchOutlined, RestTwoTone, SearchOutlined, BulbOutlined } from '@ant-design/icons'
import './MemoNotepad.css'
const { Header, Content } = Layout;
const MemoNotepad = () => {

  const [isDark, setIsDark] = useState(false);
  const [sizeInput, setSizeInput] = useState(16);

  const handleCreateNewContent = () => {

  }

  const handleSearch = () => {

  }

  const handleDeleteContent = () => {

  }

  const handleChangeTheme = () => {
    console.log("join to change theme");
    setIsDark(!isDark);
  }

  const handleIncreaseFontSize = () => {
    if (sizeInput < 25){
      setSizeInput(sizeInput + 2);
    }
  }

  const handleDecreaseFontSize = () => {
    if (sizeInput > 15){
      setSizeInput(sizeInput - 2);
    }
  }


  return (
    <div className={`container ${isDark ? 'dark' : ''}`} >
      <Space className='nav-bar'>
        <Space className='actions'>
          <Button className={`icon-item ${isDark ? 'dark' : ''}`} onClick={handleCreateNewContent}><EditTwoTone /></Button>
          <Button className={`icon-item ${isDark ? 'dark' : ''}`} onClick={handleSearch}><SearchOutlined /></Button>
          <Button className={`icon-item ${isDark ? 'dark' : ''}`} c onClick={handleDeleteContent}><RestTwoTone /></Button>
        </Space>
      </Space>

      <Space className='paper'>
        <Layout>
          <Content>
            <Input.TextArea style={{fontSize: sizeInput}}  rows={40} className={`input ${isDark ? 'dark' : ''}`}
              
            />
          </Content>
        </Layout>
      </Space>

      <Space className='authorized' style={{ height: '100%' }}>
        <Space className='settings'>
          <Space className='lable-options'>

            <Button className={`icon-item ${isDark ? 'dark' : ''}`} onClick={handleChangeTheme}><BulbOutlined /></Button>
            <Button className={`icon-item ${isDark ? 'dark' : ''}`} onClick={handleIncreaseFontSize}><PlusOutlined /></Button>
            <Button className={`icon-item ${isDark ? 'dark' : ''}`} onClick={handleDecreaseFontSize}><MinusOutlined /></Button>


          </Space>
        </Space>
      </Space>
    </div>
  )
}

export default MemoNotepad