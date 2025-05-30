import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import LogoImg from 'src/assets/logo.png';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------
export const Logo = forwardRef(
  ({ width = 100, height = 40, disableLink = false, className, href = '/', sx, ...other }, ref) => {
    const theme = useTheme();
    const gradientId = useId();

    // simply render the PNG
    const logo = (
      <Box
        component="img"
        src={LogoImg}
        alt="logo"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root + (className ? ` ${className}` : '')}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              verticalAlign: 'middle',
              backgroundColor: theme.palette.grey[200],
              ...sx,
            }}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
          className={logoClasses.root + (className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(disableLink && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);
