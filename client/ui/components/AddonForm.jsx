import React, { PropTypes as pt } from 'react';

import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import ErrorSnackbar from './stateless/ErrorSnackbar';
import FetchErrorList from './stateless/FetchErrorList';
import LoadingIndicator from './stateless/LoadingIndicator';
import containAddonDetails from '../containers/AddonDetailsContainer';
import goTo from '../utils/goTo';


const style = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class AddonForm extends React.Component {
  static propTypes = {
    activeAddon: pt.object.isRequired,
    createAddon: pt.object.isRequired,
    fetchAddon: pt.func.isRequired,
    handleSubmit: pt.func.isRequired,
    initialize: pt.func.isRequired,
    initialValues: pt.object,
    pk: pt.any,
    resetAll: pt.func.isRequired,
    save: pt.func.isRequired,
    saveAndContinue: pt.func.isRequired,
    updateAddon: pt.object.isRequired,
  }

  componentWillMount() {
    const { fetchAddon, pk } = this.props;
    if (pk) {
      fetchAddon();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { initialize, initialValues } = this.props;

    if (initialValues !== nextProps.initialValues) {
      initialize('addon', nextProps.initialValues, false);
    }
  }

  componentWillUnmount() {
    this.props.resetAll();
  }

  render() {
    const {
      activeAddon, createAddon, handleSubmit, save, saveAndContinue, updateAddon,
    } = this.props;
    const isSaving = createAddon.loading || updateAddon.loading;
    const saveError = createAddon.error || updateAddon.error;

    if (activeAddon.loading) {
      return (
        <div className="wrapper align-center">
          <LoadingIndicator />
        </div>
      );
    }

    if (activeAddon.error) {
      return (
        <div className="wrapper align-center">
          <FetchErrorList errors={activeAddon.error} />
        </div>
      );
    }

    return (
      <form>
        <ErrorSnackbar error={saveError} />
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={() => goTo('/addons/')}
              label="Back to Addon List"
              icon={<NavigationChevronLeft />}
              disabled={isSaving}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          isSaving ?
            <LinearProgress /> : ''
        }
        <div className="wrapper">
          <div>
            <Field
              name="name"
              floatingLabelText="Name"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="version"
              floatingLabelText="Version"
              disabled={isSaving}
              component={TextField}
            />
          </div>
          <div>
            <Field
              name="ftp_url"
              floatingLabelText="FTP URL"
              disabled={isSaving}
              component={TextField}
            />
          </div>
        </div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(saveAndContinue)}
              label="Save & Continue"
              disabled={isSaving}
            />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild>
            <RaisedButton
              onClick={handleSubmit(save)}
              label="Save"
              disabled={isSaving}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
      </form>
    );
  }
}

const ContainedAddonForm = containAddonDetails(AddonForm);

export default reduxForm({
  form: 'addon',
})(ContainedAddonForm);
