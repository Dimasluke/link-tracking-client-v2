import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
  return (
    <div>
      <Spinner color="light" size="sm" />
    </div>
  );
}

export default Loading;
