import React from 'react'
import { Divider, Radio, Table, Button, Input, Space, Checkbox } from 'antd';
import { useState } from 'react';
import { FileAddOutlined, PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { addSubject, updateSubject, deleteSubject } from './TableSubjectManage/subjectSlice'
import { useSelector, useDispatch } from "react-redux";





const columns = [
    {
        title: 'Tên môn học',
        dataIndex: 'subject_name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
    }
];




const TableSubjectManage = () => {

    const initState = {
        id: "",
        key: "",
        subject_name: "",
        note: "",
    }




    // const [selectionType, setSelectionType] = useState('checkbox');
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState(initState);
    // 
    const [selectedRows, setSelectedRow] = useState([]);
    const { id, key, subject_name, note } = info
    //const [data, setData] = useState(JSON.parse(localStorage.getItem("Subjects")) || [])
    const data = useSelector((state) => state.subjects);
    const dispatch = useDispatch();



    // hàm này sử dụng khi data của input thay đổi, thì giá trj của info thay đổi
    const handleChangeInput = e => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
        console.log(info);
    }

    // hàm xử lí khi ấn vào nút adđ

    const handleAddButton = () => {
        setIsOpen(!isOpen);
    }

    const handleSaveButton = () => {
        // if (info.subject_name == "" || info.note == "") {
        //     alert("chua du thong tin")
        // } else {
        //     const found = data.find(element => element.subject_name == info.subject_name);
        //     if (!found) {
        //         info.key = info.subject_name
        //         data.push(info);
        //         console.log(data);
        //         setData([...data])
        //         localStorage.setItem("Subjects", JSON.stringify(data));
        //     } else {
        //         alert("du lieu da ton tai")
        //     }
        // }

        dispatch(
            addSubject({
                ...info,
            })
        );
    }

    const handleEdit = (info) => {
        console.log("vao");
        // console.log("hello");
        // let data2 = [...data]
        // data2.forEach((item,index) => {
        //     if (item.key == info.key)
        //     {
        //         data2[index] = info;
        //     }
        // })
        // console.log(data2);
        // setData([...data2])
        // localStorage.setItem("Subjects", JSON.stringify(data2));
        dispatch(
            updateSubject({
                ...info,
            })
        );
    }

    const handleDelete = () => {
        console.log("In handleDelete ");
        console.log(data.subjectList);
        let data2 = [...data.subjectList];
        let data3 = [];
        for (let i = 0; i < data2.length; i++) {
            let check = true;
            for (let j = 0; j < selectedRows.length; j++) {
                if (data2[i].key == selectedRows[j].key) {
                    check = false;
                    break;
                }

            }
            if (check == true)
                data3.push(data2[i]);
            
        }
        console.log(data3);
        dispatch(deleteSubject(data3));
        // setData([...data3])
        localStorage.setItem("Subjects", JSON.stringify(data3));
        setInfo(initState)

    }

    // Code cua thang loz Thien 
    const handleDel = () => {
        let data2 = [...data];
        const data3 = data2.map((item, index) => {
            if (!selectedRows.find(itemRow => itemRow.key == item.key)) {
                return item;
            }
        })
        console.log(data3)
    }



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length == 1) {
                console.log("vafo day");
                setInfo({ ...info, key: selectedRows[0].id, subject_name: selectedRows[0].subject_name, note: selectedRows[0].note })
            }
            console.log(selectedRows);
            setSelectedRow(selectedRows)
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
                {/* <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                    <Radio value="checkbox">Checkbox</Radio>
                    <Radio value="radio">radio</Radio>
            </Radio.Group> */}

                {selectedRows.length == 1 && (
                    <>
                        <Space style={{ float: 'right', marginRight: '5px' }}>
                            <Input placeholder="Tên môn học" allowClear name='subject_name' value={subject_name} onChange={handleChangeInput} required />
                            <Input placeholder="Ghi chú" allowClear name='note' value={note} onChange={handleChangeInput} required />
                            <Button onClick={() => handleEdit(info)} style={{ float: 'right' }} type="primary"><EditOutlined /></Button>
                            <Button onClick={handleDelete} style={{ float: 'right' }} type="primary"><DeleteOutlined /></Button>

                        </Space>

                    </>
                )}

                {selectedRows.length > 1 && (
                    <>
                        <Space style={{ float: 'right', marginRight: '5px' }}>
                            <Button onClick={handleDelete} style={{ float: 'right' }} type="primary"><DeleteOutlined /></Button>
                        </Space>

                    </>
                )}

                {selectedRows.length == 0 && (
                    <>
                        <Button onClick={handleAddButton} style={{ float: 'right' }} type="primary"><PlusOutlined /></Button>

                        {isOpen ? <Space style={{ float: 'right', marginRight: '5px' }}>
                            <Input placeholder="Tên môn học" allowClear name='subject_name' value={subject_name} onChange={handleChangeInput} required />
                            <Input placeholder="Ghi chú" allowClear name='note' value={note} onChange={handleChangeInput} required />
                            <Button onClick={handleSaveButton} style={{ float: 'right' }} type="primary"><SaveOutlined /></Button>
                        </Space> : ""}

                    </>
                )}

                {/* <Button onClick={handleAddButton} style={{ float: 'right' }} type="primary"><PlusOutlined /></Button>

                {isOpen ? <Space style={{ float: 'right', marginRight: '5px' }}>
                    <Input placeholder="Tên môn học" allowClear name='subject_name' value={subject_name} onChange={handleChangeInput} required />
                    <Input placeholder="Ghi chú" allowClear name='note' value={note} onChange={handleChangeInput} required />
                    <Button onClick={handleSaveButton} style={{ float: 'right' }} type="primary"><SaveOutlined /></Button>
                </Space> : ""} */}

                <Divider />

                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data.subjectList}
                />


            </div>
        </>
    )
}

export default TableSubjectManage