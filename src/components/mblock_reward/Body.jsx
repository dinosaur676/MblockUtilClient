import {useEffect, useState} from "react";
import axios from "axios";
import RewardTable from "./RewardTable.jsx";

const Body = () => {
    const [networkDict, setNetworkDict] = useState({})
    const [walletDict, setWalletDict] = useState({});
    const [balanceDict, setBalanceDict] = useState({});
    const [priceDict, setPriceDict] = useState({});
    const [total, setTotal] = useState(0)
    const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`;

    const getCoinPrice = async () => {
        const response = await axios.get(SERVER_URL + "/api/price");
        return response.data;
    }

    const getNetwork = async () => {
        try {
            const response = await axios.get(SERVER_URL + "/api/network");
            const dict = {}
            for(let net of response.data) {
                if(dict[net["network"]] == null)
                    dict[net["network"]] = []

                dict[net["network"]].push(net);
            }

            return dict;
        }
        catch (e) {
            console.log(e)
        }
    }

    const getWallet = async () => {
        try {
            const response = await axios.get(SERVER_URL + "/api/wallet");
            const dict = {}
            for(let wallet of response.data) {
                if(dict[wallet["network"]] == null)
                    dict[wallet["network"]] = [];

                dict[wallet["network"]].push(wallet);
            }

            return dict;
        }
        catch (e) {
            console.log(e)
        }
    }

    const getBalance = async () => {
        const response = await axios.get(SERVER_URL + "/api/balance");

        return response.data;
    }


    useEffect(() => {
        const init = async () => {
            const balanceTempDict = await getBalance();
            const priceTempDict = await getCoinPrice();


            let sum = 0;

            for(const key of Object.keys(balanceTempDict)) {
                sum += balanceTempDict[key] * priceTempDict[key];
            }

            sum = Math.round(sum / 10) * 10;

            setTotal(sum);
            setBalanceDict(balanceTempDict);
            setPriceDict(priceTempDict);

        }

        init();
    }, [])


    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", gap:"10px", alignItems:"end", justifyContent:"end", paddingRight:"15px"}}>
                <label style={{padding: "5px"}}>총 금액</label>
                <input type={"text"} value={total.toLocaleString()} readOnly={true}
                       style={{padding: "5px", fontSize: "16px"}}
                />
            </div>
            <RewardTable balanceDict={balanceDict} coinPriceDict={priceDict}/>
        </div>
    )
}

export default Body