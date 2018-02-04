import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBins, removeBin, selectBin } from '../actions/index';
import Bins from '../components/Bins/Bins';

class BinList extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  componentDidMount() {
    this.props.onFetchBins();
  }

  render() {
    const searchRegex = new RegExp(this.state.search, 'gi');
    const filteredBins = this.props.bins.filter(bin => bin.name.match(searchRegex));

    return (
      <Bins {...this.props}
            bins={filteredBins}
            onSearchBin={this.handleSearchChange}
            onRemoveBin={this.removeBin}/>
    );
  }

  handleSearchChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  removeBin = (e, _id) => {
    e.stopPropagation();

    const { selectedBin, onRemoveBin } = this.props;

    if (_id === selectedBin._id) {
      console.log('about to remove selected bin');

      // onSelectBin({ _id: '', name: '', selection: '' });
    }

    onRemoveBin(_id);
  };
}

BinList.propTypes = {
  isFetching: PropTypes.bool,
  bins: PropTypes.array,
  selectedBin: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    selection: PropTypes.string
  })
};

const mapStateToProps = ({ bins }) => {
  return { ...bins };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchBins: (optionalId) => dispatch(fetchBins(optionalId)),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onRemoveBin: (_id) => dispatch(removeBin(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BinList);
