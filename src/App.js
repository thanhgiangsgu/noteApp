import React from 'react';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';

import Schedule from './pages/Schedule';
import Task from './pages/Task';
import './App.css'

import { Toaster } from 'react-hot-toast'
import MemoNotepad from './pages/MemoNotepad';



const item = new Array(3);
item[0] = {
  label: `Schedule`,
    key: 1,
    children: <Schedule/>,
    style: 1 === 0 ? { height: 200 } : undefined,
}
item[1] = {
  label: `Task`,
    key: 2,
    children: <Task/>,
    style: 2 === 0 ? { height: 200 } : undefined,
}
item[2] = {
  label: `Note`,
    key: 3,
    children: <MemoNotepad/>,
    style: 3 === 0 ? { height: 200 } : undefined,
}

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1, width: '100%' }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer , textAlign: 'center', justifyContent: 'center'}} />
    </StickyBox>
    
  );
  return <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={item} />;
};

export default App;