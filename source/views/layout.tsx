import { css, Style } from "hono/css"
import type { JSXNode } from "hono/jsx"
import { Fragment, type JSX } from "hono/jsx/jsx-runtime"

interface LayoutProps {
    children: JSXNode | JSX.Element,
    title: string
}
const body = css`
:-hono-global {

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
  body {  
    background-color: rgb(16, 16, 16);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
  }
};
`
export default function Layout({ title, children }: LayoutProps) {
    return (
        <Fragment>
            <html lang="es">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Safe Track Verification</title>
                    <Style />
                </head>
                <body class={body}>
                    {children}
                </body>
            </html >
        </Fragment >

    )
};