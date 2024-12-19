// eslint-disable-next-line react/prop-types
const FormModal = ({onClose, form}) => {
    return (
        <div className={"input-div"}>
            <div>
                <button className={"modal-close-button"} onClick={() => {
                    onClose(2, false)
                }}>X
                </button>
                <textarea placeholder={"Json Form"}
                          value={form}
                          readOnly={true}
                          style={{textAlign: "start"}}
                          className="form-input"
                />
            </div>
        </div>
    )
}

export default FormModal