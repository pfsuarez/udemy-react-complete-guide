
const Validation = props => {
    let validationMessage = "Text long enough";

    if(props.textLength <= 5) {
        validationMessage = "Text to short";
    }

    return (
        <div>
            {validationMessage}
        </div>
    );
};

export default Validation;