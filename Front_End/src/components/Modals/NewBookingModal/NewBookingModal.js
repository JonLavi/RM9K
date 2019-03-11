import React, { Component, Fragment } from 'react';
import NewBookingModalContent from './NewBookingModalContent'
import NewBookingModalTrigger from './NewBookingModalTrigger';

class NewBookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tableId: null,
      customerId: null,
      customerName: null,
      customerContact: null,
      covers: null
    };
    this.handleCustomerIdChange = this.handleCustomerIdChange.bind(this);
    this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
    this.handleCustomerContactChange = this.handleCustomerContactChange.bind(this);
    this.handleTableIdChange = this.handleTableIdChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus(); // draw keyboard focus to the modal when opens
    });
    this.toggleScrollLock();
  };

  onClose = () => {
    this.setState({ isOpen: false });
    this.openButtonNode.focus(); // return keyboard focus to main page when close
    this.toggleScrollLock();
  };

  onKeyDown = evt => {
    return evt.keyCode === 27 && this.onClose();
  };

  onClickAway = evt => {
    if (this.modalNode && this.modalNode.contains(evt.target)) return;
    this.onClose();
  };

  toggleScrollLock = () =>
    document.querySelector("html").classList.toggle("u-lock-scroll");

  handleCustomerIdChange(evt) {
    this.setState({ customerId: evt.target.value });
  }

  handleCustomerNameChange(evt){
    this.setState({customerName: evt.target.value});
  }

  handleCustomerContactChange(evt) {
    this.setState({ customerContact: evt.target.value });
  }

  handleTableIdChange(evt) {
    this.setState({ tableId: evt.target.value });
  }

  handleStartTimeChange(evt) {
    this.setState({ startTime: evt.target.value });
  }

  handleDateChange(evt) {
    // change date format
    const date = evt.target.value;
    const reversedDate = date
      .split(`-`)
      .reverse()
      .join(`-`);
    this.setState({ bookingDate: reversedDate });
  }

  handleCoverChange(evt) {
    this.setState({ covers: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // posting data happens here
    const path = "http://localhost:8080";
    fetch(`${path}/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.prepJson())
    });
    this.onClose();
  }

  prepJson() {
    const path = "http://localhost:8080";
    let newBooking = {
      customer: `${path}/customers/${this.state.customerId}`,
      restaurantTable: `${path}/restaurantTables/${this.state.tableId}`,
      date: `${this.state.bookingDate}`,
      startTime: `${this.state.startTime}`,
      covers: `${this.state.covers}`
    };
    return newBooking;
  }

  render() {
    const { isOpen } = this.state;
    const { triggerText } = this.props;
    return (
      <Fragment>
        <NewBookingModalTrigger
          buttonRef={n => (this.openButtonNode = n)}
          buttonText={triggerText}
          onOpen={this.onOpen}
        />

        {isOpen && (
          <NewBookingModalContent
            restaurantTables={this.props.restaurantTables}
            buttonRef={n => (this.closeButtonNode = n)}
            handleSubmit={this.handleSubmit}
            modalRef={n => (this.modalNode = n)}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            role="dialog"
            handleCustomerIdChange={this.handleCustomerIdChange}
            handleCustomerNameChange={this.handleCustomerNameChange}
            handleCustomerContactChange={this.handleCustomerContactChange}
            handleTableIdChange={this.handleTableIdChange}
            handleStartTimeChange={this.handleStartTimeChange}
            handleCoverChange={this.handleCoverChange}
            handleDateChange={this.handleDateChange}
          />
        )}
      </Fragment>
    );
  }
}
 
export default NewBookingModal;