import React, { Component } from "react";
import CustomerDataService from "../services/Customer_service"

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

      this.state = {
      id: null,
      name: "",
      number: "",
      company: "",
      phone: "",
      
      purchased: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    });
  }
  
      onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

     onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  saveCustomer() {
   
    var data = {
      name: this.state.name,
      number: this.state.number,
      company: this.state.company,
      phone: this.state.phone,
    };

    CustomerDataService.create(data)
      .then(response => {
          this.setState({
          id: response.data.id,
          name: response.data.name,
          number: response.data.number,
          company: response.data.company,
          phone: response.data.phone,
          
          purchased: response.data.purchased,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCustomer() {
      this.setState({
      id: null,
      name: "",
      number: "",
      company: "",
      phone: "",
      purchased: false,

      submitted: false
    });
  }

  render() {
     return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You Added customer successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add Customer
            </button>
          </div>
         ) : (
              
             <div>                
              <div className="form-group">
                  <h4>Enter Customer Information</h4>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                  onChange={this.onChangeName}  
                  name="name"                                 
              />
                </div>
                <div className="form-group">
              <label htmlFor="number">Customer NO</label>
              <input
                type="text"
                className="form-control"
                id="number"
                required
                value={this.state.number}
                onChange={this.onChangeNumber}     
                name="number"
              />
                </div>
                <div className="form-group">
              <label htmlFor="query">Customer Query</label>
              <input
                type="text"
                className="form-control"
                id="query"
                required
                value={this.state.query}
                onChange={this.onChangeCompany}                    
                name="query"
              />
               </div> 
                <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
              </div>                
              <button onClick={this.saveCustomer} className="btn btn-success">
              Add Customer
              </button>             
              </div>          
        )}
      </div>
    );
  }
}


