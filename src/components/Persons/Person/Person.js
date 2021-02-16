import styled from "styled-components";

const StyleDiv = styled.div`
        width:60%;
        margin: 16px auto;
        border: 1px solid #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 16px;
        text-align: center;

        @media (min-width: 500px) {
            width: 200px;
        }
`;

const Person = (props) => {
    
    const style = {
        "@media (min-width: 500px)" : {
            width:"400px"
        }
    };

    return (
        <StyleDiv>
            <p onClick={props.click}>Name: {props.name} Age: {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </StyleDiv>
    );
}

export default Person;