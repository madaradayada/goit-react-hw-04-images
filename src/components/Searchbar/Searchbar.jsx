import { Component } from 'react';
import PropTypes from 'prop-types';
import { MdImageSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import {
  SearchHeader,
  SearchForm,
  SearchFormInput,
  SearchButton,
} from './SearchbarStyled';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    query: '',
  };

  handleChange = evt => {
    this.setState({ query: evt.currentTarget.value });
  };
  //form submission
  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.reset();
  };
  //clearing the form
  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <MdImageSearch style={{ width: 30, height: 30 }} />
          </SearchButton>

          <SearchFormInput
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
