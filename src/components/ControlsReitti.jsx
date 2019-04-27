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
        /*
        style= {{width: 550}}
        */
        return (
            <React.Fragment>
                <div className="ControlsReitti-form-div">
                <form
                    onSubmit={(event) => this.props.onSubmitHaku(event,  this.state)}
                >
                    <div className="form-row">
                        <div className="col-0">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Lähtö- ja saapumispaikka</span>
                                </div>
                                    <input 
                                        type="text" 
                                        aria-label="Lähtöpaikka" 
                                        className="form-control"
                                        onChange={(event) => this.onChange(event,0)}
                                    />
                                    <input 
                                        type="text" 
                                        aria-label="Saapumispaikka" 
                                        className="form-control"
                                        onChange={(event) => this.onChange(event,1)}
                                    />
                            </div>
                        </div>   
                    </div>
                    <div className="form-row">
                        <label for="staticEmail" className="col-sm-0 col-form-label">Klo:</label>
                        <div className="col-0">
                            <input 
                                type="time" 
                                className="form-control" 
                                value= {this.state.time}
                                onChange= {this.onChangeTimeDateCheckbox}
                            />
                        </div>
   
                        <label className="col-sm-0 col-form-label" for="customCheck1">Perillä: </label>
                        <div className="col-0">
                            <input 
                                type="checkbox" 
                                className="col-sm-0" 
                                id="customCheck1"
                                checked= {this.state.checkbox}
                                onChange= {this.onChangeTimeDateCheckbox}
                            />      
                        </div>                              
          
                        <label for="staticEmail" className="col-sm-0 col-form-label">Päivä: </label>
                        <div className="col-0">
                            <input 
                                type="date"
                                className="form-control"
                                type="date"
                                value={this.state.date}
                                onChange={this.onChangeTimeDateCheckbox}
                            />
                        </div>
                        
                        <div className="col-0">
                            <button type="submit" className="btn btn-outline-primary">Hae reitti</button>
                        </div>

                    </div>
                </form>
                </div>
            </React.Fragment>
          );
    }
}
 
export default ControlsReitti;

/*
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">First and last name</span>
  </div>
  <input type="text" aria-label="First name" class="form-control">
  <input type="text" aria-label="Last name" class="form-control">
</div>
*/

/*
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
*/