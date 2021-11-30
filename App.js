import { html, styled, marked, useRef, useState } from './modules.js'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  box-sizing: border-box;
  padding: 0.5rem;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Editor = styled.div`
  padding: 0.25rem;
  width: 50%;
  outline: none;
  border: 1px solid #dddddd;
  overflow: auto;

  @media (max-width: 768px) {
    width: unset;
    height: 50%;
  }

`

const Previewer = styled.div`
  padding: 0.25rem;
  width: 50%;
  border: 1px solid #dddddd;
  overflow: auto;

  @media (max-width: 768px) {
    width: unset;
    height: 50%;
  }
`

function synchronouslyScroll(current, target) {
    const scale = (target.scrollHeight - target.clientHeight) / (current.scrollHeight - current.clientHeight)
    target.scrollTo({ top: current.scrollTop * scale })
}

export default function App(props) {

    const [inputText, setInputText] = useState('')
    const editorRef = useRef()
    const previewerRef = useRef()
    const sign = useRef(0)

    function handleEditorInput(ev) {
        const text = ev.target.innerText
        setInputText(text)
    }

    function handleEditorScroll(ev) {
        if (sign.current !== 0) {
            sign.current = sign.current - 1
            return
        }
        sign.current = 1
        //
        synchronouslyScroll(ev.target, previewerRef.current)
    }

    function handlePreviewerScroll(ev) {
        if (sign.current !== 0) {
            sign.current = sign.current - 1
            return
        }
        sign.current = 1
        //
        synchronouslyScroll(ev.target, editorRef.current)
    }

    return html`
        <${Container}>
            <${Editor} onScroll=${handleEditorScroll}
                       ref=${editorRef}
                       contentEditable="true"
                       onInput=${handleEditorInput} />
            <${Previewer} className="markdown-body"
                          onScroll=${handlePreviewerScroll}
                          dangerouslySetInnerHTML=${{ __html: marked.parse(inputText) }}
                          ref=${previewerRef} />
        </Container>
    `
}
