const htm = window.htm
const { createElement, useRef, useState } = window.React
const { render } = window.ReactDOM
const styled = window.styled
const marked = window.marked

const html = htm.bind(createElement)

export {
    html,
    styled,
    marked,
    render,
    useRef,
    useState,
    createElement,
}
