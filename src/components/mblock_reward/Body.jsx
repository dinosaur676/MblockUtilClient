import {useEffect, useState} from "react";
import axios from "axios";
import RewardTable from "./RewardTable.jsx";

const Body = () => {
    const [balanceDict, setBalanceDict] = useState({});
    const [priceDict, setPriceDict] = useState({});
    const [total, setTotal] = useState(0)
    const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`;

    const getCoinPrice = async () => {
        const response = await axios.get(SERVER_URL + "/api/price");
        return response.data;
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