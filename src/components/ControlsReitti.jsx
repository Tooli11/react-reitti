import React, { Component } from 'react';

class ControlsReitti extends Component {
    constructor(){
        super();
        this.state = {
            paikat : ['Sello', 'Rautatientori'],
            koordinaatit : ['koordinaatit1', 'koordinaatit2'],   // Tätä ei sitten käytettykään.
            date: new Date().toISOString().slice(0, 10),   // Tämä on väärä päivämäärä tiettyyn aikaan. 
            time: '',
            checkbox: false
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeTimeDateCheckbox = this.onChangeTimeDateCheckbox.bind(this);
    }

    onChange(event, index){
        console.log(event.target.value);
        console.log(index);
        console.log(this.state.paikat[index]);
        const paikat = [...this.state.paikat]
        paikat[index] = event.target.value;
        this.setState({
            paikat
        }) 
    }

    onChangeTimeDateCheckbox(event){
        const name = event.target.type;   // dokumentaatio react forms
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        console.log(value);
        this.setState({
            [name] : value
        })
    }

    /*
    onSubmit={(event) => {
                        event.preventDefault()
                        this.props.( this.state)}
                    }
    */


    render() { 
        return (
            <React.Fragment>
                <form>
                    <input 
                        type="text"
                        onChange={(event) => this.onChange(event,0)}
                    />
                    <input
                        type="text"
                        onChange={(event) => this.onChange(event,1)}
                    />
                </form>
                <form
                    onSubmit={(event) => this.props.onSubmitHaku(event,  this.state)}
                >
                    <label>
                        Klo:
                        <input
                            type="time"
                            value= {this.state.time}
                            onChange= {this.onChangeTimeDateCheckbox}
                        />
                    </label>
                    <label>
                        Perillä
                        <input
                            type="checkbox"
                            checked= {this.state.checkbox}
                            onChange= {this.onChangeTimeDateCheckbox}
                        />
                    </label>
                    <label>
                        Päivä:
                        <input
                            type="date"
                            value={this.state.date}
                            onChange={this.onChangeTimeDateCheckbox}
                        />
                    </label>
                    <button type="submit" className="btn btn-light">Hae reitti</button>
                </form>
            </React.Fragment>
          );
    }
}
 
export default ControlsReitti;