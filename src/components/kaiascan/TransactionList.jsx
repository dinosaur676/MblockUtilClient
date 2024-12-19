
// eslint-disable-next-line react/prop-types
const Row = ({ item }) => {
    // eslint-disable-next-line react/prop-types
    const fromAddr = item["from"].slice(0, 12) + "...." + item["from"].slice(-5);
    // eslint-disable-next-line react/prop-types
    const toAddr = item["to"].slice(0, 12) + "...." + item["to"].slice(-5);
    // eslint-disable-next-line react/prop-types
    const value = parseFloat((parseInt(item["value"], 16) / 1000000000000000000))
    const strValue = `${value.toFixed(2)} Kaia`

    return (
        <div>{fromAddr} {"->"} {toAddr} : {strValue}</div>
    )
}
// eslint-disable-next-line react/prop-types
const Transaction = ({ items }) => {
    return (
        <div style={{ maxHeight: '150px', overflow: 'auto', padding: '5px' }}>
            {/* eslint-disable-next-line react/prop-types */}
            {items.map((item, index) => (
                <Row key={index} item={item} />
            ))}
        </div>
    );
}

export default Transaction;