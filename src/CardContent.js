import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

const CardContent = ({ content, deleteContent, handleEditValue }) => {
  const [options, setOptions] = useState("");
  const [editInfo, setEditInfo] = useState({ id: "", value: "" });
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    color: "black",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <div className="w-full">
      {content?.map((item, i) => (
        <Draggable key={item.id} draggableId={`${item.id}`} index={i}>
          {(provided, snapshot) => (
            <div
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className="card text-white m-1 p-1"
                style={{
                  backgroundColor: "gray",
                }}
              >
                <div className="ms-2 me-2 d-flex justify-content-between align-items-center position-relative z-1">
                  {editInfo.id === item.id ? (
                    <div className="create-card w_30 mh_10">
                      <input
                        className="form-control bg-black text-white"
                        value={editInfo.value}
                        onChange={(e) => {
                          setEditInfo((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }));
                        }}
                      />
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          handleEditValue(item.id, editInfo.value);
                          setEditInfo((prev) => ({ ...prev, id: "" }));
                        }}
                        disabled={editInfo.value === ""}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-transparent text-white"
                        onClick={() => {
                          setEditInfo({ id: "", value: "" });
                          setOptions("");
                        }}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <span>{item.cardInfo}</span>
                  )}

                  <button
                    className="btn btn-transparent z-1"
                    onClick={() =>
                      setOptions((prev) => (prev === "" ? item.id : ""))
                    }
                  >
                    <FaEdit />
                  </button>
                  {options === item?.id && (
                    <div className="position-absolute end-0 top-100 z-5">
                      <div className="card bg-gray border-color-white">
                        <button
                          className="btn btn-transparent d-flex justify-content-start"
                          onClick={() => {
                            deleteContent(item.id);
                            setOptions("");
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-transparent d-flex justify-content-start"
                          onClick={() => {
                            setEditInfo({ id: item.id, value: item.cardInfo });
                            setOptions("");
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default CardContent;
