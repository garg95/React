import React from 'react'

const withClasses = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
}

// const WithClass=props =>{
//     return (
//         <div className={props.classes}>{props.children}</div>
//     );
// }
export default withClasses;