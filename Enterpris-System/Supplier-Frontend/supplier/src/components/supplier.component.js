import React, { Component } from "react";
import SupplierDataService from "../services/Supplier_service";

export default class Supplier extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.getSupplier = this.getSupplier.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSupplier = this.updateSupplier.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
    this.updateRequestInfo = this.updateRequestInfo.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);

    this.state = {
      currentSupplier: {
      id: null,
      name: "",
      number: "",
      company: "",
      phone: "",
      
      purchased: false,

      },
      message: "",
      message2: "",
      message3: ""
    };
  }

  componentDidMount() {
    
    this.getSupplier( this.props.match.params.id);
  }
 
  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSupplier: {
          ...prevState.currentSupplier,
          name: name
        }
      };
    });
  }

  onChangeNumber(e) {
    const number = e.target.value;
    
    this.setState(prevState => ({
      currentSupplier: {
        ...prevState.currentSupplier,
        number: number
      }
    }));
  }

    onChangeCompany(e) {
    const company = e.target.value;
    
    this.setState(prevState => ({
      currentSupplier: {
        ...prevState.currentSupplier,
        company: company
      }
    }));
  }

   onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentSupplier: {
        ...prevState.currentSupplier,
        phone: phone
      }
    }));
  }

  getSupplier(id) {
    SupplierDataService.get(id)
      .then(response => {
        this.setState({
          currentSupplier: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSupplier.id,
      name: this.state.currentSupplier.name,
      number: this.state.currentSupplier.number,
      company: this.state.currentSupplier.company,
      phone: this.state.currentSupplier.phone,
      purchased: status,
    };

    SupplierDataService.update(this.state.currentSupplier.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSupplier: {
            ...prevState.currentSupplier,
            purchased: status,
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSupplier() {
    SupplierDataService.update(
      this.state.currentSupplier.id,
      this.state.currentSupplier
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The supplier was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRequest() {
    SupplierDataService.update(
      this.state.currentSupplier.id,
      this.state.currentSupplier
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message2: "Your request has been send to be authorised!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

    updateRequestInfo() {
    SupplierDataService.update(
      this.state.currentSupplier.id,
      this.state.currentSupplier
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message3: "Please add more information!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSupplier() {    
    SupplierDataService.delete(this.state.currentSupplier.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/suppliers') 
      })
      .catch(e => {
        console.log(e);
      });
  }

 render() {
    const { currentSupplier } = this.state;

    return (
      <div>
        {currentSupplier ? (
          <div className="edit-form">
            <h4>Supplier Information</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentSupplier.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={currentSupplier.number}
                  onChange={this.onChangeNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  value={currentSupplier.company}
                  onChange={this.onChangeCompany}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentSupplier.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {/* {currentSupplier.purchased ? "supply completed!" : "Pending"} */}
                
              </div>
            </form>

            {currentSupplier.purchased ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnSupplied
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                // onClick={() => this.updatePublished(false)}
              >
               
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSupplier}
            >
              Cancel Supplier
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSupplier}
            >
              Update
            </button>
            <p>{this.state.message}</p>

            {/* <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRequest}
            >
              Ask For Authorisation!
            </button>
            <p>{this.state.message2}</p>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRequestInfo}
            >
              Add more information!
            </button>
            <p>{this.state.message3}</p> */}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}