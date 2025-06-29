import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// Helper function to get icon for categories
const getCategoryIcon = (categoryName, iconUrl) => {
  // Fallback icons if API icons fail to load
  const iconMap = {
    'Blood Tests': '🩸',
    'Imaging': '🏥',
    'Cardiac': '❤️',
    'Hormonal': '🧬',
    'Genetic': '🧪',
    'Allergy': '🤧',
    'Cancer Screening': '🎗️',
    'Diabetes': '📊',
    'Liver Function': '🫀',
    'Kidney Function': '🫘',
    'Lipid Profile': '💚',
    'Vitamin Profile': '⚡',
  };

  return iconMap[categoryName] || '🔬';
};

// Helper function to get color for categories
const getCategoryColors = (index) => {
  const colorPairs = [
    { color: '#2196F3', bgColor: '#E3F2FD' },
    { color: '#4CAF50', bgColor: '#E8F5E8' },
    { color: '#FF9800', bgColor: '#FFF3E0' },
    { color: '#9C27B0', bgColor: '#F3E5F5' },
    { color: '#F44336', bgColor: '#FFEBEE' },
    { color: '#00BCD4', bgColor: '#E0F2F1' },
    { color: '#673AB7', bgColor: '#EDE7F6' },
    { color: '#E91E63', bgColor: '#FCE4EC' },
    { color: '#FF5722', bgColor: '#FBE9E7' },
    { color: '#8BC34A', bgColor: '#F1F8E9' },
  ];

  return colorPairs[index % colorPairs.length];
};

// ----------------------------------------------------------------------

export function DiagnosticsFeaturedCategories({
  categories,
  loading,
  onCategoryClick
}) {
  if (loading || !categories || categories.length === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Featured Categories"
        subheader="Popular diagnostic tests"
        sx={{ pb: 1 }}
      />
      <CardContent
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={3}>
          {categories.map((category, index) => {
            const colors = getCategoryColors(index);
            const icon = getCategoryIcon(category.name, category.icon);

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={category.id}
                sx={{
                  display: 'flex',
                }}
              >
                <Card
                  onClick={() => onCategoryClick(category)}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: colors.bgColor,
                    color: colors.color,
                    boxShadow: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 10,
                    },
                  }}
                >
                  <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: '#ffffff22',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          color: 'inherit',
                        }}
                      >
                        {icon}
                      </Box>
                      <Typography variant="caption" fontWeight={500}>
                        ₹{category.price?.toLocaleString() || 'N/A'}
                      </Typography>
                    </Stack>

                    <Typography variant="subtitle1" fontWeight={600}>
                      {category.name}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                      <Chip
                        label={`${category.test_count} Tests`}
                        size="small"
                        sx={{
                          bgcolor: '#ffffff33',
                          color: 'inherit',
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function DiagnosticsAllCategories({
  categories,
  loading,
  onCategoryClick
}) {
  if (loading || !categories || categories.length === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="All Categories"
        subheader="Browse all available tests"
        sx={{ pb: 1 }}
      />
      <CardContent
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 2.5 },
        }}
      >
        <Grid container spacing={2}>
          {categories.map((category, index) => {
            const colors = getCategoryColors(index);
            const icon = getCategoryIcon(category.name, category.icon);

            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={category.id}
                sx={{ display: 'flex' }}
              >
                <Card
                  onClick={() => onCategoryClick(category)}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: { xs: 2, md: 3 },
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '&:hover': {
                      transform: 'translateY(-4px) translateX(6px)',
                      boxShadow: (theme) => theme.shadows[8],
                      '& .category-icon': {
                        transform: 'scale(1.2) rotateZ(5deg)',
                      },
                      '& .category-title': {
                        color: colors.color,
                      },
                      '& .category-chip': {
                        transform: 'translateX(3px) scale(1.1)',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-2px) translateX(3px)',
                      transition: 'all 0.1s ease',
                    },
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      width: { xs: 40, sm: 45, md: 50 },
                      height: { xs: 40, sm: 45, md: 50 },
                      borderRadius: { xs: 1.5, md: 2 },
                      bgcolor: colors.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: { xs: 1, sm: 1.25 },
                      fontSize: { xs: 20, sm: 22, md: 24 },
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {icon}
                  </Box>

                  <Typography
                    className="category-title"
                    variant="subtitle2"
                    fontWeight={600}
                    mb={0.5}
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      lineHeight: 1.2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {category.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    mb={0.75}
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {category.description}
                  </Typography>

                  <Chip
                    className="category-chip"
                    label={`${category.test_count} Tests`}
                    size="small"
                    sx={{
                      bgcolor: colors.bgColor,
                      color: colors.color,
                      fontWeight: 600,
                      fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                      height: { xs: 20, md: 24 },
                      transition: 'transform 0.3s ease',
                      mx: 'auto',
                    }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
