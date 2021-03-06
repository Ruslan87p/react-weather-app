import react from 'react';
import './../form-component/form-component.css';


const Form = (props) => {

    const isOnChange = (e) => {
        console.log(e);
    }

    return(
        <div className="container">
            <form onSubmit={props.loadWeather}>
                <div className="row mt-3 cm d-flex justify-content-between">
                    <div className="form-group field">
                        <input type="input" className="form-field" placeholder="city" name="city" id='city' required autoComplete="off"/>
                        <label htmlFor="city" className="form-label">City</label>
                    </div>

                    <div className="text-md-left d-flex justify-content-end align-items-end w-50 pl-3">
                        <button className="button"><span>Check weather</span></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export {
    Form
}