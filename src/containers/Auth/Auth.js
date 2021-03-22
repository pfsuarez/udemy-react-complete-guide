import { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

class Auth extends Component {
    state = {
        authControls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                value: ''
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedAuthControls = {
            ...this.state.authControls,
            [controlName]: {
                ...this.state.authControls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authControls[controlName].validation),
                touched: true
            }
        };

        // let formIsValid = true;
        // for (const inputIdentifier in updatedAuthForm) {
        //     formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        // }

        this.setState({ authControls: updatedAuthControls });
    }

    render() {
        const formElementsArray = [];

        for (const key in this.state.authControls) {
            formElementsArray.push({
                id: key,
                config: this.state.authControls[key]
            })
        }

        const form = <form>
            {formElementsArray.map(formElement => {
                return <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
        </form>;

        return (
            <div className={classes.Auth}>
                {form}
            </div>
        );
    }
}

export default Auth;