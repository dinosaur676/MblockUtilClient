// eslint-disable-next-line react/prop-types
import {useEffect} from "react";

const WalletModal = ({walletData, networkList, onChange, onClose, onAddWallet}) => {

    useEffect(() => {
        const network = networkList[0] != null ? networkList[0].network : "";
        const category = networkList[0] != null ? networkList[0].category : "";
        onChange("network", network)
        onChange("category", category)
    }, [])

    const onChangeSelect = (value, selectedIndex) => {
        const selectNetwork = getNewList()[selectedIndex];
        let network = null;

        for(network of networkList) {
            if(network.network === selectNetwork) {
                break;
            }
        }

        const category = network != null ? network.category : "";

        onChange("network", value)
        onChange("category", category)
    }

    const onAdd = async () => {
        console.log(walletData)

        for (let key in walletData) {
            if(key === "id")
                continue;

            if (walletData[key] === "") {
                alert("입력값을 다시 한번 확인해주세요.")
                return;
            }
        }

        await onAddWallet();
        onClose(1, false);
    }


    const getNewList = () => {
        let newList = networkList.map((item) => item.network);
        newList = new Set(newList);

        const output = [...newList];

        return output;
    }


    return (
        <div className={"input-div"}>
            <div>
                <button className={"modal-close-button"} onClick={() => {
                    onClose(1, false)
                }}>X
                </button>
            </div>
            <label style={{fontSize: "18px"}}>지갑 주소 추가</label>
            {/* eslint-disable-next-line react/prop-types */}
            <select value={walletData["network"]}
                    className="short-input"
                    onChange={(e) => {
                        onChangeSelect(e.target.value, e.target.selectedIndex)
                    }}>
                {
                    getNewList().map((item) => {
                        return <option key={item} value={item}>{item}</option>
                    })
                }
            </select>
            <select value={walletData["category"]}
                    className="short-input"
                    onChange={(e) => {
                        onChange("category", e.target.value)
                    }}>
                {networkList.map((item) => {
                    if (item["network"] === walletData["network"])
                        return <option key={item.category} value={item.category}>{item.category}</option>
                })}
            </select>
            <input type={"text"} placeholder={"name"}
                   value={walletData["name"]}
                   onChange={(e) => {
                       onChange("name", e.target.value)
                   }}
                   className="middle-input"/>
            <input type={"text"} placeholder={"address"}
                   value={walletData["address"]}
                   onChange={(e) => {
                       onChange("address", e.target.value)
                   }}
                   className="long-input"/>
            <button className="custom-button" onClick={onAdd}>추가</button>
        </div>
    )
}

export default WalletModal