import React, { useState } from "react";
import Option from "./Option";
import "./Columns.css";
import OptionsData from "./optionsData";
import { Droppable } from "react-beautiful-dnd";

const ActionOptions = () => {
  const [column, setColumn] = useState(OptionsData);

  return (
    <div className="columns">
      <h3>Options</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className="draggables"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.options.map((option, i) => (
              <Option key={option.id} option={option} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ActionOptions;
