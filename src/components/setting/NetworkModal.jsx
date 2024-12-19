// eslint-disable-next-line react/prop-types
import {useState} from "react";

const NetworkModal = ({networkData, onChange, onClose, onAddNetwork}) => {

    const [selectedValue, setSelectedValue] = useState()

    const postDefaultValue = `
    {
        "apiKey": "<apiKey>",
        "apiType": 1,
        "div": 1e18,
        "headers": {"<header 값>"},
        "params": {"<parameter 값>"},
        "response": "<Balance까지 Data 순서 (문서 참고)>"
    }
    `
    const getDefaultValue = `
    {
        "apiType": 0,
        "div": 1e18,
        "headers": {"<header 값>"},
        "params": {"<parameter 값>"},
        "response": "<Balance까지 Data 순서 (문서 참고)>"
    }
    `

    const onSelectedChange = (event) => {
        let str = "";
        if(event.target.value === "get") {
            str = getDefaultValue;
        }
        else {
            str = postDefaultValue;
        }

        setSelectedValue(event.target.value);
        onChange("form", str);
    }

    const codeInputTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            onChange("form", networkData["form"] + "\t");
        }
    }

    const onAdd = async () => {
        for (let key in networkData) {
            if (networkData[key] === "") {
                alert("입력값을 다시 한번 확인해주세요.")
                return;
            }
        }

        const result = await onAddNetwork();
        if(result)
            onClose(0, false);
    }


    return (
        <div className={"input-div"}>
            <div>
                <button className={"modal-close-button"} onClick={() => {
                    onClose(0, false)
                }}>X
                </button>
            </div>
            <label style={{fontSize: "18px"}}>네트워크 추가</label>
            <input type={"text"} placeholder={"network"}
                   onChange={(e) => {
                       onChange("network", e.target.value)
                   }}
                   value={networkData["network"]}
                   className="short-input"/>

            <input type={"text"} placeholder={"category"}
                   onChange={(e) => {
                       onChange("category", e.target.value)
                   }}
                   value={networkData["category"]}
                   className="short-input"/>

            <input type={"text"} placeholder={"API ID"}
                   value={networkData["api_id"]}
                   onChange={(e) => {
                       onChange("api_id", e.target.value)
                   }}
                   className="short-input"/>

            <input type={"text"} placeholder={"getBalance API URL"}
                   value={networkData["url"]}
                   onChange={(e) => {
                       onChange("url", e.target.value)
                   }}
                   className="long-input"/>

            <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <label>
                    <input
                        type="radio"
                        value="get"
                        checked={selectedValue === 'get'}
                        onChange={onSelectedChange}
                    />
                    Get
                </label>
                <label>
                    <input
                        type="radio"
                        value="post"
                        checked={selectedValue === 'post'}
                        onChange={onSelectedChange}
                    />
                    Post
                </label>
            </div>

            <textarea placeholder={"Json Form"}
                      value={networkData["form"]}
                      onChange={(e) => {
                          onChange("form", e.target.value)
                      }}
                      onKeyDown={codeInputTabHandler}
                      style={{textAlign: networkData["form"].length === 0 ? "center" : "start"}}
                      className="form-input"
            />
            <button className="custom-button" onClick={onAdd}>추가</button>
        </div>
    )
}

export default NetworkModal