import React from "react";

const Modal = (props) => {
  const { modalTitle, modalBody, btnTitle, btnType, handler } = props;
  return (
    <>
      {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button> */}
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {modalTitle}
              </h5>
              <button class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{modalBody}</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Đóng
              </button>
              {btnType === "delete" ? (
                <button type="button" class="btn btn-danger" onClick={() => handler()} data-dismiss="modal">
                  {btnTitle}
                </button>
              ) : btnType === "confirm" ? (
                <button type="button" class="btn btn-primary" onClick={() => handler()} data-dismiss="modal">
                  {btnTitle}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
