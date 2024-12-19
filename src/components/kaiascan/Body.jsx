import {useState} from "react";
import Calendar from "react-calendar";
import './Body.css'
import './KaiaScan.css'
import Transaction from "./TransactionList.jsx";
import axios from "axios";

const Body = () => {
    const [addressDict, setAddressDict] = useState({
        Contract: "",
        Reward: "" ,
        Commission: "",
        MyAddress: ""
    });
    const [total, setTotal] = useState(0.0)
    const [txList, setTxList] = useState([])
    const [dateRange, setDateRange] = useState([new Date(), new Date()])
    const [loading, setLoading] = useState(false)

    const url = "https://th-api.klaytnapi.com/v2/transfer/account/"
    const basicKey = import.meta.env.VITE_KAS_KEY
    const headers = {
        "x-chain-id": "8217",
        "Authorization": basicKey,
        "Content-Type": "application/json"
    }

    const handleAddressDict = (addressKey, value) => {
        setAddressDict((prev) => ({
            ...prev,
            [addressKey]: value,
        }));
    };

    const handleDateRange = (range) => {
        setDateRange(range)
    }

    const getTxList = async () => {
        const startDate = Math.floor(dateRange[0] / 1000)
        const endDate = Math.floor(dateRange[1] / 1000)


        const param = {
            "kind": "klay",
            "range": `${startDate},${endDate}`,
            "size": 1000,
            "exclude-zero-klay": true
        }

        try {
            return axios.get(url + addressDict["Reward"], {headers: headers, params: param});

        }
        catch (error) {
            console.log(error)
        }
    }

    const resultButton = async () => {
        for(let addr in addressDict) {
            if(addressDict[addr] === "") {
                alert("주소와 날짜를 다시 한번 확인해주세요.");
                return;
            }
        }

        setLoading(true)
        const response = await getTxList()
        let totalReward = 0.0;

        for(let item of response.data.items) {
            if(item["to"].toLowerCase() === addressDict["Commission"].toLowerCase() || item["to"].toLowerCase() === addressDict["Contract"].toLowerCase()) {
                totalReward += parseFloat((parseInt(item["value"], 16) / 1000000000000000000))
            }
            else if(item["to"].toLowerCase() === addressDict["Reward"].toLowerCase()) {
                totalReward -= parseFloat((parseInt(item["value"], 16) / 1000000000000000000))
            }
        }

        setTxList(response.data.items)
        setTotal(totalReward.toFixed(2))
        setLoading(false)
    }

    return (
        <div className={loading ? 'loading' : ''}>
            <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <label style={{fontSize: "18px"}}>주소 입력</label>
                <div style={{marginBottom: "20px"}}/>
                <Address id1={"Contract"} id2={"Commission"} onValueChange={handleAddressDict}/>
                <div style={{marginBottom: "20px"}}/>
                <Address id1={"Reward"} id2={"MyAddress"} onValueChange={handleAddressDict}/>
                <div style={{marginBottom: "20px"}}/>
            </div>
            <div>
                <label style={{fontSize: "18px"}}>날짜 입력</label>
                <div style={{marginBottom: "20px"}}/>
                <CalendarBody dateRange={dateRange} onChangeDateRange={handleDateRange}/>

                <button className="custom-button" onClick={resultButton}>결과</button>
            </div>
            <hr/>
            <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <label style={{fontSize: "18px"}}>총 보상</label>
                <div style={{marginBottom: "20px"}}/>
                <Total value={total}/>
                <div className="bordered-box" style={{marginBottom: "20px", marginTop: "20px"}}>
                    <Transaction items={txList}/>
                </div>
            </div>

        </div>


    )
}

// eslint-disable-next-line react/prop-types
const Address = ({id1, id2, onValueChange}) => {
    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <label>{id1} 주소</label>
            <input type="text" onChange={(e) => onValueChange(id1, e.target.value)} style={{width: "300px"}}/>
            <label>{id2} 주소</label>
            <input type="text" onChange={(e) => onValueChange(id2, e.target.value)} style={{width: "300px"}}/>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
const CalendarBody = ({dateRange, onChangeDateRange}) => {
    const formatToKoreanDate = (date) => {
        return new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        }).format(date);
    };

    const tileClassName = ({ date, view }) => {

        if(date > new Date())
            return

        if (view === 'month' && date.getDay() === 0) { // 일요일
            return 'sunday-tile';
        }
        else if(view === 'month' && date.getDay() === 6) {
            return 'satDay-tile';
        }
    };

    return (
        <div>
            <Calendar
                calendarType="hebrew"
                tileClassName={tileClassName}
                showNeighboringMonth={false}
                onChange={onChangeDateRange}
                value={dateRange}
                selectRange={true}
                maxDate={new Date()}
            />
            <p>
                {formatToKoreanDate(dateRange[0])} - {formatToKoreanDate(dateRange[1])}
            </p>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const Total = ({value}) => {

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <label>
                총 보상
            </label>

            <input type="text" value={value} readOnly={true} style={{width: "100px"}}/>

        </div>

    )
}

export default Body