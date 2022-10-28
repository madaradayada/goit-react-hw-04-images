import { useState } from 'react';
import { MdImageSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import {
  SearchHeader,
  SearchForm,
  SearchFormInput,
  SearchButton,
} from './SearchbarStyled';

export function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <MdImageSearch style={{ width: 30, height: 30 }} />
        </SearchButton>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
}
