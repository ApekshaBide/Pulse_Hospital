import { paths } from 'src/routes/paths';

// import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  // {
  //   title: 'Components',
  //   path: paths.components,
  //   icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  // },
  {
    title: 'About',
    path: paths.about,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Doctors',
    path: paths.product.root,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Departments',
    path: '/departments',
    icon: <Iconify width={22} icon="healthicons:hospital-outline" />,
    children: [
      {
        // 1st column
        items: [
          { title: 'Bariatric Surgery', path: paths.service.root },
          { title: 'Cardiology', path: paths.service.root },
          { title: 'Dermatology', path: paths.service.root },
          { title: 'Gastroenterology', path: paths.service.root },
          { title: 'Haematology & BMT', path: paths.service.root },
          { title: 'Interventional Radiology', path: paths.service.root },
          { title: 'Neurology', path: paths.service.root },
          { title: 'Obs & Gynaecology', path: paths.service.root },
          { title: 'Organ Transplant', path: paths.service.root },
          { title: 'Pain Clinic', path: paths.service.root },
          { title: '', path: '' },
          { title: '', path: '' },
        ],
      },
      {
        // 2nd column
        items: [
          { title: 'Breast Care Center', path: paths.service.root },
          { title: 'Chest Medicine', path: paths.service.root },
          { title: 'ENT', path: paths.service.root },
          {
            title: 'General Surgery & Minimal Access',
            path: paths.service.root,
          },
          { title: 'Infectious Diseases', path: paths.service.root },
          { title: 'Mental Health', path: paths.service.root },
          { title: 'Neurosurgery', path: paths.service.root },
          { title: 'Oncology', path: paths.service.root },
          { title: 'Orthopaedics', path: paths.service.root },
          { title: 'Plastic & Cosmetic Surgery', path: paths.service.root },
          { title: '', path: '' },
          { title: '', path: '' },
        ],
      },
      {
        // 3rd column
        items: [
          { title: 'Cardiac Surgery', path: paths.service.root },
          { title: 'Dental Care', path: paths.service.root },
          { title: 'Endocrinology & Diabetes', path: paths.service.root },
          {
            title: 'HPB & Surgical Gastroenterology',
            path: paths.service.root,
          },
          { title: 'Internal Medicine', path: paths.service.root },
          { title: 'Nephrology', path: paths.service.root },
          { title: 'Nutrition & Dietetics', path: paths.service.root },
          { title: 'Ophthalmology', path: paths.service.root },
          { title: 'Paediatrics', path: paths.service.root },
          { title: '', path: '' },
          { title: '', path: '' },
        ],
      },
      {
        // 3rd column
        items: [
          { title: 'Rheumatology', path: paths.service.root },
          { title: 'TAVI / TAVR', path: paths.service.root },
          { title: 'Robotic Knee Replacement', path: paths.service.root },
          { title: 'Urology', path: paths.service.root },
          { title: 'Rehabilitation', path: paths.service.root },
          { title: 'Robotic Surgery', path: paths.service.root },
        ],
      },
    ],
  },
  {
    title: 'Blogs',
    path: paths.post.root,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Contact',
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
];
