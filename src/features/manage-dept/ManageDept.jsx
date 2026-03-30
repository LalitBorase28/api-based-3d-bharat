import React, { useState } from "react";
import DeptBanner from "./components/DeptBanner.jsx";
import DeptForm from "./components/DeptForm.jsx";

const ManageDept = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <DeptBanner onAddClick={() => setIsModalOpen(true)} />
      <DeptForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ManageDept;
