import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Space, Tag } from 'antd';
import { Tabs, theme } from 'antd';
import { Divider, Radio, Table } from 'antd';
import StickyBox from 'react-sticky-box';
import './ModalSubjectManage.css'
import TableSubjectManage from './TableSubjectManage';
import TableTest from './TableTest'
const { Column, ColumnGroup } = Table;

// data tmp


// 


const item = new Array(2);
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

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};


const ModalSubjectManage = () => {

   
    return (
        <>
            
            

        </>
    )
}

export default ModalSubjectManage