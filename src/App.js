import "./App.css";
import { useState } from "react";
import ListContent from "./ListContent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [lists, setLists] = useState([]);
  const [create, setCreate] = useState(false);
  const [title, setTitle] = useState("");

  const deleteList = (id) => {
    setLists((prev) => prev.filter((item) => item.id !== id));
  };
  const addContentData = (cardInfo, id) => {
    setLists((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              content: item.content
                ? [...item.content, { cardInfo: cardInfo, id: Math.random() }]
                : [{ cardInfo: cardInfo, id: Math.random() }],
            }
          : item
      )
    );
  };

  const deleteContent = (listId, id) => {
    setLists((prev) =>
      prev.map((list) => {
        return list.id === listId
          ? {
              ...list,
              content: list.content?.filter((content) => content.id !== id),
            }
          : list;
      })
    );
  };

  const handleEditContent = (listId, id, value) => {
    setLists((prev) =>
      prev.map((list) => {
        return list.id === listId
          ? {
              ...list,
              content: list.content?.map((content) =>
                content.id === id ? { ...content, cardInfo: value } : content
              ),
            }
          : list;
      })
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const targetItem = lists.find((item) => item.id == source.droppableId)
      .content[source.index];
    if (source.droppableId === destination.droppableId) {
      setLists((prev) =>
        prev.map((item) => {
          const itemToMove = item.content[source.index];
          const newArray = [...item.content];

          newArray.splice(source.index, 1);
          newArray.splice(destination.index, 0, itemToMove);
          return item.id == destination.droppableId
            ? {
                ...item,
                content: newArray,
              }
            : item;
        })
      );
    } else {
      setLists((prev) =>
        prev.map((item) => {
          const tempArr = item.content ? [...item.content] : [];
          tempArr.splice(destination.index, 0, targetItem);
          return item.id == destination.droppableId
            ? {
                ...item,
                content: tempArr,
              }
            : item;
        })
      );
      setLists((prev) =>
        prev.map((item) => {
          const tempArr = item.content ? [...item.content] : [];
          tempArr.splice(source.index, 1);
          return item.id == source.droppableId
            ? {
                ...item,
                content: tempArr,
              }
            : item;
        })
      );
    }
  };
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#101204",
    padding: grid,
    width: 250,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-100">
        <div style={{ backgroundColor: "#005485" }}>
          <div className="row">
            {lists?.map((list, i) => {
              return (
                <div className="col-4" key={i}>
                  <Droppable droppableId={`${list.id}`}>
                    {(provided, snapshot) => (
                      <div
                        className="card m-2 text-white w-100"
                        style={getListStyle(snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                      >
                        <div
                          style={{
                            backgroundColor: "#101204",
                          }}
                        >
                          <ListContent
                            list={list}
                            handleContentData={(cardInfo, id) =>
                              addContentData(cardInfo, id)
                            }
                            handleListDelete={(id) => deleteList(id)}
                            deleteContent={(listId, id) =>
                              deleteContent(listId, id)
                            }
                            handleEditContent={(listID, id, value) =>
                              handleEditContent(listID, id, value)
                            }
                          />
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
            <div className="col-4">
              <div className=" m-2 p-1">
                {!create ? (
                  <div
                    className="card"
                    onClick={() => setCreate(true)}
                    onBlur={() => setCreate(false)}
                    style={{ backgroundColor: "#1b6794", color: "#fff" }}
                  >
                    <div className="card-body" role="button">
                      <h5 className="card-title">+ Add List</h5>
                    </div>
                  </div>
                ) : (
                  <div className="card" style={{ backgroundColor: "#1b6794" }}>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      style={{ backgroundColor: "#1b6794", color: "#fff" }}
                    />
                    <div className="d-flex justify-content-end m-1">
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          setLists((prev) =>
                            prev
                              ? [...prev, { title: title, id: Math.random() }]
                              : [{ title: title }]
                          );
                          setCreate(false);
                          setTitle("");
                        }}
                        disabled={title === ""}
                      >
                        Add List
                      </button>
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          setCreate(false);
                          setTitle("");
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
