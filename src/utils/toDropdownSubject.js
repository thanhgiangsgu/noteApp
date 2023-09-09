export const toDropdownSubject = (subjects) => {
    return [
      {
        label: "Chọn môn học",
        value: "Chọn môn học"
      },
      ...subjects.map(item => {
        return {
          id: item.id,
          key: item.key,
          label: item.subject_name,
          value: item.subject_name
        };
      })
    ];
  };