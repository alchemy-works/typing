export const { createElement, useRef, useState } = window['React']
export const { render } = window['ReactDOM']
export const styled = window['styled']
export const marked = window['marked']

const htm = window['htm']
export const html = htm.bind(createElement)
