import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _coursesContinue, _coursesFeatured } from 'src/_mock';

import { CourseProgress } from '../course-progress';
import { CourseContinue } from '../course-continue';
import { CourseFeatured } from '../course-featured';
import { CourseHoursSpent } from '../course-hours-spent';
import { CourseWidgetSummary } from '../course-widget-summary';

// ----------------------------------------------------------------------

export function OverviewCourseView() {
  const theme = useTheme();

  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={{
        borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}` },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            minWidth: { lg: 0 },
            py: { lg: 3, xl: 5 },
            flexDirection: 'column',
            flex: { lg: '1 1 auto' },
            px: { xs: 2, sm: 3, xl: 5 },
            borderRight: {
              lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
            },
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Hi, Patient 👋
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>`How is your health today!`</Typography>
          </Box>

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            <CourseWidgetSummary
              title="Schedule your next visit"
              total="Book Appointment"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-progress.svg`}
            />

            <CourseWidgetSummary
              title="Order your medications"
              total="Pharmacy"
              color="success"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-completed.svg`}
            />

            <CourseWidgetSummary
              title="Book Checkups & Lab Tests"
              total="Diagnostics"
              color="secondary"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-certificates.svg`}
            />
            <CourseWidgetSummary
              title="Healthcare at your doorstep"
              total="Home Visit"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-progress.svg`}
            />

            <CourseWidgetSummary
              title="Quick Assistance"
              total="Emergency"
              color="success"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-completed.svg`}
            />

            <CourseWidgetSummary
              title="Covid"
              total="Covid"
              color="secondary"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-certificates.svg`}
            />
          </Box>

          <CourseHoursSpent
            title="Hours spent"
            chart={{
              series: [
                {
                  name: 'Weekly',
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: 'Monthly',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Yearly',
                  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          />

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              alignItems: 'flex-start',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            }}
          >
            <CourseProgress
              title="Course progress"
              chart={{
                series: [
                  { label: 'To start', value: 45 },
                  { label: 'In progress', value: 25 },
                  { label: 'Completed', value: 20 },
                ],
              }}
            />

            <CourseContinue title="Continue course" list={_coursesContinue} />
          </Box>

          <CourseFeatured title="Featured course" list={_coursesFeatured} />
        </Box>
      </Box>
    </DashboardContent>
  );
}
