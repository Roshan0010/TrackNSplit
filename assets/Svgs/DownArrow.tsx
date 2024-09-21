import React from 'react';
import Svg, { Path } from 'react-native-svg';

const GraphIcon = ({ fillColor = "#C4C5C4" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" id="graph">
    <Path
      fill={fillColor}
      d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
      transform="translate(2 2)"
    />
  </Svg>
);

export default GraphIcon;