// src/sections/overview/diagnostics/view/overview-diagnostics-view.jsx

import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useDiagnostics } from 'src/hooks/use-diagnostics';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DiagnosticsConfigForm } from '../diagnostics-config-form';
import { DiagnosticsSearchSection } from '../diagnostics-search-section';
import { DiagnosticsHealthPackages } from '../diagnostics-health-package';
import {
   DiagnosticsAllCategories,
   DiagnosticsFeaturedCategories,
 } from '../dignostics-categories-sections';
 import {
   DiagnosticsEmptyState,
   DiagnosticsErrorState,
   DiagnosticsLoadingState
} from '../diagnostics-empty-states';

// ----------------------------------------------------------------------

export function OverviewDiagnosticsView() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    config,
    configLoading,
    configError,
    configEmpty,
    categories,
    featuredCategories,
    categoriesLoading,
    packages,
    packagesLoading,
    isLoading,
  } = useDiagnostics();

  // Event handlers
  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.name);
    // Navigate to category details or tests listing
    router.push(paths.dashboard.diagnostics.category(category.id));
  };

  const handlePackageClick = (pkg) => {
    console.log('Package clicked:', pkg.name);
    // Navigate to package details
    router.push(paths.dashboard.diagnostics.package(pkg.id));
  };

  const handleTestClick = (test) => {
    console.log('Test clicked:', test.name);
    // Navigate to test details
    router.push(paths.dashboard.diagnostics.test(test.id));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
    console.log('Search query:', query);
  };

  const handleCreateNew = () => {
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Filter categories based on search query
  const filteredFeaturedCategories = featuredCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAllCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render loading state
  if (isLoading && !editMode) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <DiagnosticsLoadingState />
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Diagnostics Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Healthcare', href: paths.dashboard.healthcare?.root },
            { name: 'Diagnostics' },
          ]}
          action={
            !editMode && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={config ? handleEdit : handleCreateNew}
              >
                {config ? 'Edit Configuration' : 'Configure Diagnostics'}
              </Button>
            )
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        {/* Search Section */}
        {config && !editMode && (
          <DiagnosticsSearchSection onSearch={handleSearch} />
        )}

        {/* Featured Categories */}
        {config && !editMode && (
          <DiagnosticsFeaturedCategories
            categories={searchQuery ? filteredFeaturedCategories : featuredCategories}
            loading={categoriesLoading}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {/* Health Packages */}
        {config && !editMode && (
          <DiagnosticsHealthPackages
            packages={searchQuery ? filteredPackages : packages}
            loading={packagesLoading}
            onPackageClick={handlePackageClick}
          />
        )}

        {/* All Categories */}
        {config && !editMode && (
          <DiagnosticsAllCategories
            categories={searchQuery ? filteredAllCategories : categories}
            loading={categoriesLoading}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {/* Search Results Message */}
        {config && !editMode && searchQuery && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredFeaturedCategories.length + filteredAllCategories.length + filteredPackages.length > 0
                ? `Found ${filteredFeaturedCategories.length + filteredAllCategories.length + filteredPackages.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </Typography>
          </Box>
        )}

        {/* Edit Mode */}
        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h4">
                {config ? 'Edit Diagnostics Configuration' : 'Setup Diagnostics Configuration'}
              </Typography>
              <Button
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="solar:arrow-left-bold" />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>

            <DiagnosticsConfigForm
              currentConfig={config}
              onSuccess={handleFormSuccess}
            />
          </>
        )}

        {/* Empty State */}
        {!editMode && configEmpty && (
          <DiagnosticsEmptyState onCreateNew={handleCreateNew} />
        )}

        {/* Error State */}
        {!editMode && configError && (
          <DiagnosticsErrorState
            onRetry={handleRetry}
            error={configError.message || configError}
          />
        )}
      </Container>
    </DashboardContent>
  );
}
