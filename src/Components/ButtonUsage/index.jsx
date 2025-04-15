import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage(props) {
  const { label } = props
  return <Button variant="contained">{label}</Button>;
}