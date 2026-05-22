declare module 'postcss-scss' {
    import { Parser, Stringifier } from 'postcss';
    const parse: Parser;
    const stringify: Stringifier;
    export { parse, stringify };
    const _default: { parse: Parser; stringify: Stringifier };
    export default _default;
}

declare module 'postcss-less' {
    import { Parser, Stringifier } from 'postcss';
    const parse: Parser;
    const stringify: Stringifier;
    export { parse, stringify };
    const _default: { parse: Parser; stringify: Stringifier };
    export default _default;
}

declare module 'postcss-sass' {
    import { Parser, Stringifier } from 'postcss';
    const parse: Parser;
    const stringify: Stringifier;
    export { parse, stringify };
    const _default: { parse: Parser; stringify: Stringifier };
    export default _default;
}
