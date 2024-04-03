import React, { useState } from "react";
import CardContent from "./CardContent";
import { FaTrash } from "react-icons/fa";

const ListContent = ({
  list,
  handleContentData,
  handleListDelete,
  deleteContent,
  handleEditContent,
}) => {
  const [createCard, setCreateCard] = useState(false);
  const [cardInfo, setCardInfo] = useState();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-2">
        <span>{list.title}</span>
        <br />
        <button
          className="btn btn-transparent text-danger"
          style={{ color: "red" }}
          onClick={() => handleListDelete(list.id)}
        >
          <FaTrash />
        </button>
      </div>
      {!!list.content?.length && (
        <CardContent
          content={list.content}
          deleteContent={(id) => deleteContent(list.id, id)}
          handleEditValue={(id, value) => handleEditContent(list.id, id, value)}
        />
      )}
      <div className="row">
        {!createCard ? (
          <div
            onClick={() => setCreateCard(true)}
            onBlur={() => setCreateCard(false)}
          >
            <div className="card-body" role="button">
              <h5 className="card-title">+ Add Card</h5>
            </div>
          </div>
        ) : (
          <div className="create-card w_30 mh_10">
            <input
              className="form-control text-white bg-black"
              value={cardInfo}
              onChange={(e) => {
                setCardInfo(e.target.value);
              }}
            />
            <button
              className="btn btn-transparent text-white"
              onClick={() => {
                handleContentData(cardInfo, list.id);
                setCreateCard(false);
                setCardInfo("");
              }}
              disabled={cardInfo === ""}
            >
              Save
            </button>
            <button
              className="btn btn-transparent text-white"
              onClick={() => {
                setCardInfo("");
                setCreateCard(false);
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListContent;
