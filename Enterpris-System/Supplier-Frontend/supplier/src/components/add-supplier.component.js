import React, { Component } from "react";
import SupplierDataService from "../services/Supplier_service"

export default class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.saveSupplier = this.saveSupplier.bind(this);
    this.newSupplier = this.newSupplier.bind(this);

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

  saveSupplier() {
   
    var data = {
      name: this.state.name,
      number: this.state.number,
      company: this.state.company,
      phone: this.state.phone,
    };

    SupplierDataService.create(data)
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

  newSupplier() {
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
            <h4>You added new supplier successfully!</h4>
            <button className="btn btn-success" onClick={this.newSupplier}>
              Add New Supplier
            </button>
          </div>
         ) : (
              
             <div>                
              <div className="form-group">
                  <h4>Enter Supplier Information</h4>
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
              <label htmlFor="number">Number</label>
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
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                required
                value={this.state.author}
                onChange={this.onChangeCompany}                    
                name="company"
              />
               </div> 
                <div className="form-group">
              <label htmlFor="phone">Phone</label>
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
              <button onClick={this.saveSupplier} className="btn btn-success">
              Add Supplier
              </button>             
              </div>          
        )}
      </div>
    );
  }
}


