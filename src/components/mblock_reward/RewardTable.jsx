import "./RewardTable.css"
// eslint-disable-next-line react/prop-types
const Row = ({index, dictKey, balance, coinPrice}) => {
    return (
        <tr key={index}>
            <td>{dictKey}</td>
            <td>{fixAndLocale(balance)}</td>
            <td>{fixAndLocale(coinPrice)}</td>
            <td>{fixAndLocale(balance * coinPrice)}</td>
        </tr>
    )
}

const fixAndLocale = (value) => {
    let output = value.toFixed(2)
    output = parseFloat(output).toLocaleString();

    return output;
}

// eslint-disable-next-line react/prop-types
const RewardTable = ({balanceDict, coinPriceDict}) => {

    return (
        <table className="custom-table">
            <thead>
            <tr>
                <th>Network</th>
                <th>Balance</th>
                <th>개당 금액</th>
                <th>총 금액</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(balanceDict).map((key, index) => (
                <Row key={index} dictKey={key} index={index} balance={balanceDict[key]} coinPrice={coinPriceDict[key]}/>
            ))}
            </tbody>
        </table>
    );
}

export default RewardTable