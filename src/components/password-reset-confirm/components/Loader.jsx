import React from 'react';
import { Spinner } from 'reactstrap';

function Loader() {
  return (
    <div>
      <Spinner color="light" size="sm" />
    </div>
  );
}

export default Loader;
