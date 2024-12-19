import "./NetworkTable.css"
// eslint-disable-next-line react/prop-types
const Row = ({item, onDelete}) => {
    return (
        <tr key={item.id}>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.network}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.category}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.name}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.address}</td>
            <td>
                {/* eslint-disable-next-line react/prop-types */}
                <button className={"custom-table-delete-button"} onClick={() => onDelete(item.id)}>삭제</button>
            </td>
        </tr>
    )
}


// eslint-disable-next-line react/prop-types
const WalletTable = ({walletList, onDelete}) => {

    return (
        <table className="custom-table">
            <thead>
            <tr>
                <th>Network</th>
                <th>Category</th>
                <th>Wallet Name</th>
                <th>Wallet Address</th>
                <th>삭제 버튼</th>
            </tr>
            </thead>
            <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {walletList.map((item, index) => (
                <Row key={index} item={item} onDelete={onDelete}/>
            ))}
            </tbody>
        </table>
    )
}

export default WalletTable