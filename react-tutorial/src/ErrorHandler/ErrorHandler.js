import React ,{Component} from 'react';

class errorHandler extends Component{
    state={
        hasError:false,
        ErrorMessage:''
    }
    componentDidCatch=(error,info)=>{
        this.setState({
            hasError:true,
            ErrorMessage:error
        })
    }
    render()
    {
        if(this.state.hasError){
            return <h1>Something is wrong</h1>
        }
        else{
            return this.props.children;
        }
    }
}

export default errorHandler;