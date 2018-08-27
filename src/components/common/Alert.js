import React from "react";
import Dialog from "material-ui/Dialog";

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal) {
      this.setState({ open: true });
    }
  }
  handleConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    const actions = [
      <button
        className="btn btn-success"
        style={{ marginRight: 20 }}
        onClick={this.handleClose}
      >
        Cancel
      </button>,
      <button
        className="btn btn-success"
        style={{ marginRight: 20 }}
        onClick={this.handleConfirm}
      >
        Yes
      </button>
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}
