import { memo } from "react";

const withMemo = Component => {
  function areEqual(prevProps, nextProps) {
    let isEqual = true;

    if (JSON.stringify(prevProps) !== JSON.stringify(nextProps)) {
      isEqual = false;
    }

    return isEqual;
  }

  return memo(Component, areEqual);
};

export default withMemo;
