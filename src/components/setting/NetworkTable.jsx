import "./NetworkTable.css"
// eslint-disable-next-line react/prop-types
const Row = ({item, index, onDelete, onViewForm}) => {
    return (
        <tr key={index}>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.network}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.api_id}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.category}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{item.url}</td>
            <td>
                {/* eslint-disable-next-line react/prop-types */}
                <button className={"custom-button"} onClick={(e) => {
                    onViewForm(item.form)
                }}>보기
                </button>
            </td>
            <td>
                {/* eslint-disable-next-line react/prop-types */}
                <button className={"custom-table-delete-button"} onClick={() => onDelete(item.network, item.category)}>삭제</button>
            </td>
        </tr>
    )
}

// eslint-disable-next-line react/prop-types
const NetworkTable = ({networkList, onDelete, onViewForm}) => {

    return (
        <table className="custom-table">
            <thead>
            <tr>
                <th>Network</th>
                <th>API ID</th>
                <th>Category</th>
                <th>Balance RPC</th>
                <th>Form 확인</th>
                <th>삭제 버튼</th>
            </tr>
            </thead>
            <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {networkList.map((item, index) => (
                <Row key={index} item={item} index={index} onDelete={onDelete} onViewForm={onViewForm}/>
            ))}
            </tbody>
        </table>
    );
}

export default NetworkTable