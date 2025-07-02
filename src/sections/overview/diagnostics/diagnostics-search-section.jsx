// src/sections/overview/diagnostics/diagnostics-search-section.jsx

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const POPULAR_SEARCHES = [
  'Blood Test',
  'CBC',
  'Lipid Profile',
  'Thyroid',
  'Diabetes',
  'X-Ray',
  'ECG',
  'Ultrasound',
];

// ----------------------------------------------------------------------

export function DiagnosticsSearchSection({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback((query) => {
    setSearchValue(query);
    onSearch?.(query);
  }, [onSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleSearch(searchValue);
  }, [handleSearch, searchValue]);

  const handlePopularSearch = useCallback((query) => {
    handleSearch(query);
  }, [handleSearch]);

  const handleClear = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Main Search */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Diagnostic Tests
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Search for tests, packages, or health checkups..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" />
                    </InputAdornment>
                  ),
                  endAdornment: searchValue && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={handleClear}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        <Iconify icon="eva:close-fill" />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Popular Searches */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              Popular Searches:
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {POPULAR_SEARCHES.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  variant="outlined"
                  size="small"
                  clickable
                  onClick={() => handlePopularSearch(search)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.lighter',
                      borderColor: 'primary.main',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
}
