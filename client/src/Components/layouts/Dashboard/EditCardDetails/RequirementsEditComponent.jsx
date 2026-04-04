import React, { useState } from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function RequirementsEditComponent({
  data_prop,
  updateReq_Res_Ben,
  icon_class,
  button,
  deletingReq_Res_Ben,
  addingReq_Res_Ben,
  section_id,
}) {
  // Remove key at the deleted index so remaining keys stay in sync
  const handleDelete = (key) => {
    deletingReq_Res_Ben(section_id, key);
  };

  // handling input change: sending the section id, key, and value
  const handleInputChange = (value, key) => {
    updateReq_Res_Ben(section_id, key, value);
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {Object.entries(data_prop?.[0] || {}).map(([key, value]) => (
        <div
          key={`prop-0-${key}`}
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <Input
            id={key}
            value={value}
            onchange={handleInputChange}
            class_name="py-1 px-2 rounded-small border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          <span
            className={`cursor-pointer transition-opacity ${
              Object.entries(data_prop?.[0]).length > 1
                ? ""
                : "opacity-30 pointer-events-none"
            }`}
            onClick={() => handleDelete(key)}
          >
            <Icon icon="ri-close-line" class_name={icon_class} />
          </span>
        </div>
      ))}

      <div
        onClick={() => addingReq_Res_Ben(section_id)}
        className="cursor-pointer hover:scale-105 transition-all"
      >
        <Label
          class_name="font-lighter text-sm text-nevy_blue"
          text={button || "+ Add Item"}
        />
      </div>
    </div>
  );
}

export default RequirementsEditComponent;
