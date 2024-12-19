import {useEffect, useState} from "react";
import NetworkTable from "./NetworkTable.jsx";
import "./Body.css"
import WalletTable from "./WalletTable.jsx";
import axios from "axios";
import Modal from "react-modal"
import NetworkModal from "./NetworkModal.jsx";
import WalletModal from "./WalletModal.jsx";
import FormModal from "./FormModal.jsx";


const Body = () => {
    const [networkList, setNetworkList] = useState([])
    const [networkData, setNetworkData] = useState({network: "", url: "", form: "", api_id: "", category: ""})
    const [walletList, setWalletList] = useState([])
    const [walletData, setWalletData] = useState({network: "", category:"", name: "", address: ""})

    const [isOpen, setIsOpen] = useState([false, false, false]);
    const [form, setForm] = useState("");
    const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`;

    useEffect(  () => {
        const getData = async (url, func) => {
            try {
                const response = await axios.get(url);
                func(response.data)
            }
            catch (e) {
                console.log(e)
            }
        }

        getData(SERVER_URL + "/api/network", setNetworkList)
        getData(SERVER_URL + "/api/wallet", setWalletList)

    }, []);


    const onViewForm = (form) => {
        setForm(form)
        onChangeIsOpen(2, true);
    }

    const onDeleteNetwork = async (network, category) => {
        try {
            const result = await axios.delete(SERVER_URL + "/api/network", {params: {network: network, category: category}});

            if(result.status === 200) {
                const updateList = networkList.filter((item) => !(item.network === network && item.category === category))
                setNetworkList(updateList)
            }
        }
        catch (e) {
            alert("삭제를 실패하였습니다.")
        }
    }

    const onDeleteWallet = async (id) => {

        try {
            const result = await axios.delete(SERVER_URL + "/api/wallet", {params: {id: id}});

            if(result.status === 200) {
                const updateList = walletList.filter((item) => item.id !== id)
                setWalletList(updateList)
            }
        }
        catch (e) {
            alert("삭제를 실패하였습니다.")
        }
    }

    const onChangeIsOpen = (index, value) => {
        const updateList = isOpen.map((item, i) => (i === index ? value : item));
        setIsOpen(updateList);
    }


    const onAddNetwork = async () => {
        try {
            const result = await axios.put(SERVER_URL + "/api/network", networkData);


            if (result.status === 200) {
                setNetworkList((prevItem) => [...prevItem, {
                    network: networkData["network"],
                    category: networkData["category"],
                    url: networkData["url"],
                    form: networkData["form"],
                    api_id: networkData["api_id"]
                }]);
                console.log(networkData);
                setNetworkData({network: "", url: "", form: "", api_id: "", category: ""})
            }

            return true;

        }
        catch (e) {
            alert("값을 다시한번 확인해주세요")
            return false;
        }
    }

    const onAddWallet = async () => {
        const result = await axios.put(SERVER_URL + "/api/wallet", walletData);

        console.log(result)

        if (result.status !== 200) {
            alert("실패")
        } else {
            setWalletList((prevItem) =>
                [...prevItem, {
                    network: walletData["network"],
                    category: walletData["category"],
                    name: walletData["name"],
                    address: walletData["address"],
                    id: result.data.id
                }])
            setWalletData({network: "", category: "", name: "", address: ""});
        }
    }

    const onChangeNeteworkData = (key, value) => {
        setNetworkData((prevData) => ({...prevData, [key]: value}))
    }

    const onChangeWalletData = (key, value) => {
        setWalletData((prevData) => ({...prevData, [key]: value}))
    }


    return (
        <div>
            <label style={{fontSize: "18px"}}>네트워크 API 리스트</label>
            <div style={{maxHeight: '450px', overflow: 'auto', padding: '5px'}}>
                <NetworkTable networkList={networkList} onDelete={onDeleteNetwork} onViewForm={onViewForm}/>
            </div>

            <div style={{marginBottom: "10px"}}/>
            <button className="custom-button" onClick={() => onChangeIsOpen(0, true)}>추가</button>
            <div style={{marginBottom: "10px"}}/>

            <hr/>

            <div style={{maxHeight: '450px', overflow: 'auto', padding: '5px'}}>
                <WalletTable walletList={walletList} onDelete={onDeleteWallet}/>
            </div>

            <div style={{marginBottom: "10px"}}/>
            <button className="custom-button" onClick={() => onChangeIsOpen(1, true)}>추가</button>
            <div style={{marginBottom: "10px"}}/>

            <Modal isOpen={isOpen[0]} className={'custom-modal'} overlayClassName={'custom-overlay'}
                   appElement={document.getElementById('root')} onRequestClose={() => {
                onChangeIsOpen(0, false)
            }}>
                <NetworkModal networkData={networkData} onChange={onChangeNeteworkData} onAddNetwork={onAddNetwork} onClose={onChangeIsOpen}/>
            </Modal>

            <Modal isOpen={isOpen[1]} className={'custom-modal'} overlayClassName={'custom-overlay'}
                   appElement={document.getElementById('root')} onRequestClose={() => {
                onChangeIsOpen(0, false)
            }}>
                <WalletModal walletData={walletData} networkList={networkList} onChange={onChangeWalletData} onAddWallet={onAddWallet} onClose={onChangeIsOpen}/>
            </Modal>

            <Modal isOpen={isOpen[2]} className={'custom-modal'} overlayClassName={'custom-overlay'}
                   appElement={document.getElementById('root')} onRequestClose={() => {
                onChangeIsOpen(0, false)
            }}>
                <FormModal onClose={onChangeIsOpen} form={form}/>
            </Modal>


        </div>
    )
}

export default Body