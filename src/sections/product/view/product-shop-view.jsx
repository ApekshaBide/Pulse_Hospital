import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { useSearchProducts } from 'src/actions/product';

import { EmptyContent } from 'src/components/empty-content';

import { AboutTeamInner } from 'src/sections/about/about-team-inner';

import { useCheckoutContext } from '../../checkout/context';

// ----------------------------------------------------------------------

export function ProductShopView({ products, loading }) {
  const checkout = useCheckoutContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('featured');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const filters = useSetState({
    gender: [],
    colors: [],
    rating: '',
    category: 'all',
    priceRange: [0, 200],
  });

  const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);

  const dataFiltered = applyFilter({ inputData: products, filters: filters.state, sortBy });

  const canReset =
    filters.state.gender.length > 0 ||
    filters.state.colors.length > 0 ||
    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange[0] !== 0 ||
    filters.state.priceRange[1] !== 200;

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const productsEmpty = !loading && !products.length;

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;

  return (
    <Container sx={{ mb: 15 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Doctors
      </Typography>

      {(notFound || productsEmpty) && renderNotFound}

      <AboutTeamInner />
    </Container>
  );
}

function applyFilter({ inputData, filters, sortBy }) {
  const { gender, category, colors, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // Sort by
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }

  // filters
  if (gender.length) {
    inputData = inputData.filter((product) => product.gender.some((i) => gender.includes(i)));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }

  if (colors.length) {
    inputData = inputData.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    );
  }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  }

  return inputData;
}
