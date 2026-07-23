import React from 'react';

export default function Slot({ id, placeholder, src, fit = 'cover', shape = 'rect', className }) {
  return React.createElement('image-slot', { id, shape, fit, placeholder, src, class: className });
}

