import React, { Component } from "react";
import SupplierDataService from "../services/Supplier_service"
import { Link } from "react-router-dom";

export default class SupplierList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSuppliers = this.retrieveSuppliers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSupplier = this.setActiveSupplier.bind(this);
    this.removeAllSuppliers = this.removeAllSuppliers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      suppliers: [],
      currentSupplier: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveSuppliers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveSuppliers() {
    SupplierDataService.getAll()
      .then(response => {
        this.setState({
          suppliers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSuppliers();
    this.setState({
      currentSupplier: null,
      currentIndex: -1
    });
  }

  setActiveSupplier(supplier, index) {
    this.setState({
      currentSupplier: supplier,
      currentIndex: index
    });
  }

  removeAllSuppliers() {
    SupplierDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
   SupplierDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          suppliers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, suppliers, currentSupplier, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>List Suppliers</h4>

          <ul className="list-group">
            {suppliers &&
              suppliers.map((supplier, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSupplier(supplier, index)}
                  key={index}
                >
                  {supplier.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSuppliers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSupplier ? (
            <div>
              <h4>Supplier Details....</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentSupplier.name}
              </div>
              <div>
                <label>
                  <strong>Number:</strong>
                </label>{" "}
                {currentSupplier.number}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentSupplier.company}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentSupplier.phone}
              </div>
              
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSupplier.purchased ? "purchased" : "Pending"}
              
              </div>

              <Link
                to={"/suppliers/" + currentSupplier.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a supplier...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}