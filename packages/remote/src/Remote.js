/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { loadComponent } from "./loadComponent";

//import Loading from "./Loading";

export const Remote = forwardRef((props, ref) => {
  const {
    system,
    system: { remote, url, module },
    componentProps,
    Loading
  } = props;

  if (!system || !remote || !url || !module) {
    return <h2>No system specified</h2>;
  }

  // remote =>name (webpack name),sharedScope,module (shared component),url
  const Component = React.lazy(loadComponent(remote, "default", module, url));
  const Fallback = Loading|| "Loading...";
  return (
    <React.Suspense fallback={Fallback} >
      <div ref={ref}>
         <Component {...componentProps} />
      </div>

    </React.Suspense>
  );
});

Remote.propTypes = {
  system: PropTypes.object.isRequired,
  componentProps: PropTypes.object,
  Loading: PropTypes.node
};
