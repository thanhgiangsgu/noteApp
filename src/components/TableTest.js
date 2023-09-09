import React from 'react'
import { Divider, Radio, Table, Button, Input, Space } from 'antd';
import { useState } from 'react';
import { FileAddOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
const columns = [
    {
        title: 'Tên môn học',
        dataIndex: 'subject_name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Note',
        dataIndex: 'note',
    },
   
];
const data = [
    {
        key:  'John Brown',
        subject_name: 'John Brown',
        note: 'ccas',
    },
    {
        key: 'Jim Green',
        subject_name: 'Jim Green',
        note: 'ccas',
    },
    {
        key: 'Joe Black',
        subject_name: 'Joe Black',
        note: 'ccas',
    },
    {
        key: 'Disabled User',
        subject_name: 'Disabled User',
        note: 'ccas',
    },
];




const TableSubjectManage = () => {

    const initState = {
        subject_name: "",
        note: "",
    }

    const [selectionType, setSelectionType] = useState('checkbox');
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState(initState);
    const { subject_name, note } = info



    const handleChangeInput = e => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
        console.log(info);
    }

    const handleAddButton = () => {
        setIsOpen(!isOpen);
    }

    const handleSaveButton = () => {
        if (info.subject_name == "" || info.note == "") {
            alert("chua du thong tin")
        } else {
            const found = data.find(element => element.subject_name == info.subject_name);
            if (!found) {
                data.push(info);
                console.log(data);
                localStorage.setItem("Subjects", JSON.stringify(data));
            } else {
                alert("du lieu da ton tai")
            }
        }
    }

    const onChangSelection = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }

    const getCheckboxProps = (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    })

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

    return (
        <>
            <div>
                <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                    <Radio value="checkbox">Checkbox</Radio>
                    <Radio value="radio">radio</Radio>
                </Radio.Group>

                <Button onClick={handleAddButton} style={{ float: 'right' }} type="primary"><PlusOutlined /></Button>

                {isOpen ? <Space style={{ float: 'right', marginRight: '5px' }}>
                    <Input placeholder="Tên môn học" allowClear name='subject_name' value={subject_name} onChange={handleChangeInput} required />
                    <Input placeholder="Ghi chú" allowClear name='note' value={note} onChange={handleChangeInput} required />
                    <Button onClick={handleSaveButton} style={{ float: 'right' }} type="primary"><SaveOutlined /></Button>
                </Space> : ""}

                <Divider />

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </>
    )
}

export default TableSubjectManage