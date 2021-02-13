import "./UserInput.css";

const UserInput = (props) => {
    return(
        <div className="UserInput">
            <input type="text" onChange={props.changed} value={props.text} />
        </div>
    );
}

export default UserInput