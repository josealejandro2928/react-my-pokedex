import React from 'react';
import './Badge.scss';

function Badge({
  backgroundColor = '#f44336',
  color = '#fff',
  value = 0,
}: {
  color?: string;
  backgroundColor?: string;
  value: number;
}): JSX.Element {
  return (
    <div data-testid="badge-testid" className="Badge" style={{ backgroundColor: backgroundColor, color: color }}>
      <span>{value}</span>
    </div>
  );
}
export default Badge;
