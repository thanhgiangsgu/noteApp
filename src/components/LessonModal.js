import React from 'react'
import { Modal } from 'antd';

const LessonModal = (isOpenLessonBtn, handleCancel) => {
  return (
    <Modal
    title="Schedule a Lesson"
    isOpenLessonBtn={isOpenLessonBtn}
    onCancel={handleCancel}
    footer={null}
  >
    {/* Your modal content goes here */}
  </Modal>
  )
}

export default LessonModal