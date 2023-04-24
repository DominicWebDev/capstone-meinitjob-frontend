import React, { FunctionComponent, ReactNode } from "react";
import { useSwipeable, UP, DOWN, SwipeEventData } from "react-swipeable";

const SwipeComponent = () => {
  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    onTouchStartOrOnMouseDown: ({ event }) => event.preventDefault(),
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return <>{...handlers}</>;
};

export default SwipeComponent;
