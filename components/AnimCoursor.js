import React from 'react'
import AnimatedCursor from 'react-animated-cursor'
export default function AnimCoursor() {
  return (
    <AnimatedCursor 
    innerSize={20}
      outerSize={13}
      color='0, 0, 0'
      outerAlpha={0.3}
      innerScale={0.9}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
  )
}
