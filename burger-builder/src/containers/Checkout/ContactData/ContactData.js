import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zipcode'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'fastest'},
                        {value:'cheapest',displayValue:'cheapest'}
                ]
                },
                value:'',
                validation:{
                    required:false
                },
                valid:true,
                touched:false
            }
        },
        loading: false,
        allValid:false
    }
    orderHandler = (event) => {
        event.preventDefault(); //this prevents from routing to another page by default i.e when no path is provided
        
        this.setState({
            loading: true
        });
        const formData={};
        for(let formElementidentifier in this.state.orderForm)
        {
            formData[formElementidentifier]=this.state.orderForm[formElementidentifier].value;
        }
        //created some dummy data
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData
        }

        axios.post('/orders.json', orders)
            .then(response => {
                console.log(this.props);
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/');
            })
            .catch(error => { this.setState({ loading: false, purchasing: false }); });
    }
    checkValidity(value,rules){
        let isValid=true;
        if(rules.required)
        {
            isValid=value.trim()!==''&&isValid;
        }
        return isValid;
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        
        const updatedOrderForm={...this.state.orderForm};
        const updatedFormElement={...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value=event.target.value;
        updatedFormElement.touched=true;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedOrderForm[inputIdentifier]=updatedFormElement
        let isFormValid=true;
        for(let identifier in updatedOrderForm)
        {
            isFormValid=updatedOrderForm[identifier].valid&&isFormValid;
        }
        console.log(isFormValid);
        this.setState({
            orderForm:updatedOrderForm,
            allValid:isFormValid
        });
    }
    render() {
        // we are doing this so that we can dynamically create input elements
        const formElementArray=[];
        for(let key in this.state.orderForm)
        {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit>
                {formElementArray.map(element=>{
                    return <Input id={element.id} elementType={element.config.elementType} 
                                                elementConfig={element.config.elementConfig}
                                                value={element.config.value}
                                                invalid={!element.config.valid}
                                                shouldValidate={element.config.validation.required}
                                                touched={element.config.touched}
                                                changed={(event,)=>this.inputChangedHandler(event,element.id)}/>
                })}

                <Button btnType='Success' 
                    disbaled={!this.state.allValid} 
                    clicked={this.orderHandler}>Order
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>

                {form}
            </div>
        );
    }
}

export default ContactData;