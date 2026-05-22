import * as assert from 'assert';
import { decodeTailwindClass } from '../tailwindDecoder';

suite('tailwindDecoder', () => {
    test('decodes layout utilities', () => {
        assert.strictEqual(decodeTailwindClass('block'), 'display: block;');
        assert.strictEqual(decodeTailwindClass('flex'), 'display: flex;');
        assert.strictEqual(decodeTailwindClass('grid'), 'display: grid;');
        assert.strictEqual(decodeTailwindClass('hidden'), 'display: none;');
        assert.strictEqual(decodeTailwindClass('inline-block'), 'display: inline-block;');
        assert.strictEqual(decodeTailwindClass('inline-flex'), 'display: inline-flex;');
    });

    test('decodes flex utilities', () => {
        assert.strictEqual(decodeTailwindClass('flex-1'), 'flex: 1 1 0%;');
        assert.strictEqual(decodeTailwindClass('flex-auto'), 'flex: 1 1 auto;');
        assert.strictEqual(decodeTailwindClass('flex-initial'), 'flex: 0 1 auto;');
        assert.strictEqual(decodeTailwindClass('flex-none'), 'flex: none;');
        assert.strictEqual(decodeTailwindClass('flex-wrap'), 'flex-wrap: wrap;');
        assert.strictEqual(decodeTailwindClass('flex-nowrap'), 'flex-wrap: nowrap;');
        assert.strictEqual(decodeTailwindClass('flex-row'), 'flex-direction: row;');
        assert.strictEqual(decodeTailwindClass('flex-col'), 'flex-direction: column;');
        assert.strictEqual(decodeTailwindClass('flex-row-reverse'), 'flex-direction: row-reverse;');
        assert.strictEqual(decodeTailwindClass('flex-grow'), 'flex-grow: 1;');
        assert.strictEqual(decodeTailwindClass('flex-grow-0'), 'flex-grow: 0;');
        assert.strictEqual(decodeTailwindClass('flex-shrink'), 'flex-shrink: 1;');
        assert.strictEqual(decodeTailwindClass('flex-shrink-0'), 'flex-shrink: 0;');
    });

    test('decodes spacing utilities', () => {
        assert.strictEqual(decodeTailwindClass('p-0'), 'padding: 0px;');
        assert.strictEqual(decodeTailwindClass('p-1'), 'padding: 4px;');
        assert.strictEqual(decodeTailwindClass('p-4'), 'padding: 16px;');
        assert.strictEqual(decodeTailwindClass('px-2'), 'padding-left: 8px;\npadding-right: 8px;');
        assert.strictEqual(decodeTailwindClass('py-3'), 'padding-top: 12px;\npadding-bottom: 12px;');
        assert.strictEqual(decodeTailwindClass('pt-5'), 'padding-top: 20px;');
        assert.strictEqual(decodeTailwindClass('pr-6'), 'padding-right: 24px;');
        assert.strictEqual(decodeTailwindClass('pb-8'), 'padding-bottom: 32px;');
        assert.strictEqual(decodeTailwindClass('pl-10'), 'padding-left: 40px;');
    });

    test('decodes margin utilities', () => {
        assert.strictEqual(decodeTailwindClass('m-0'), 'margin: 0px;');
        assert.strictEqual(decodeTailwindClass('m-auto'), 'margin: auto;');
        assert.strictEqual(decodeTailwindClass('mx-auto'), 'margin-left: auto;\nmargin-right: auto;');
        assert.strictEqual(decodeTailwindClass('mt-4'), 'margin-top: 16px;');
        assert.strictEqual(decodeTailwindClass('-mt-4'), undefined); // negative not yet supported
    });

    test('decodes sizing utilities', () => {
        assert.strictEqual(decodeTailwindClass('w-0'), 'width: 0px;');
        assert.strictEqual(decodeTailwindClass('w-px'), 'width: 1px;');
        assert.strictEqual(decodeTailwindClass('w-full'), 'width: 100%;');
        assert.strictEqual(decodeTailwindClass('w-screen'), 'width: 100vw;');
        assert.strictEqual(decodeTailwindClass('h-10'), 'height: 40px;');
        assert.strictEqual(decodeTailwindClass('h-full'), 'height: 100%;');
        assert.strictEqual(decodeTailwindClass('h-screen'), 'height: 100vh;');
        assert.strictEqual(decodeTailwindClass('min-w-0'), 'min-width: 0px;');
        assert.strictEqual(decodeTailwindClass('max-w-full'), 'max-width: 100%;');
    });

    test('decodes color utilities', () => {
        assert.ok(decodeTailwindClass('bg-red-500')?.includes('#ef4444'));
        assert.ok(decodeTailwindClass('text-blue-600')?.includes('#2563eb'));
        assert.ok(decodeTailwindClass('border-gray-200')?.includes('#e5e7eb'));
        assert.strictEqual(decodeTailwindClass('bg-black'), 'background-color: #000000;');
        assert.strictEqual(decodeTailwindClass('text-white'), 'color: #ffffff;');
        assert.strictEqual(decodeTailwindClass('bg-transparent'), 'background-color: transparent;');
    });

    test('decodes typography utilities', () => {
        assert.ok(decodeTailwindClass('text-xs')?.includes('font-size: 0.75rem;'));
        assert.ok(decodeTailwindClass('text-lg')?.includes('font-size: 1.125rem;'));
        assert.strictEqual(decodeTailwindClass('font-bold'), 'font-weight: 700;');
        assert.strictEqual(decodeTailwindClass('font-normal'), 'font-weight: 400;');
        assert.strictEqual(decodeTailwindClass('tracking-wide'), 'letter-spacing: 0.025em;');
        assert.strictEqual(decodeTailwindClass('leading-tight'), 'line-height: 1.25;');
        assert.strictEqual(decodeTailwindClass('leading-none'), 'line-height: 1;');
    });

    test('decodes border utilities', () => {
        assert.strictEqual(decodeTailwindClass('border'), 'border-width: 1px;');
        assert.strictEqual(decodeTailwindClass('border-2'), 'border-width: 2px;');
        assert.strictEqual(decodeTailwindClass('border-t'), 'border-top-width: 1px;');
        assert.strictEqual(decodeTailwindClass('border-b-4'), 'border-bottom-width: 16px;');
        assert.ok(decodeTailwindClass('border-red-500')?.includes('#ef4444'));
        assert.strictEqual(decodeTailwindClass('rounded'), 'border-radius: 0.25rem;');
        assert.strictEqual(decodeTailwindClass('rounded-lg'), 'border-radius: 0.5rem;');
        assert.strictEqual(decodeTailwindClass('rounded-full'), 'border-radius: 9999px;');
        assert.strictEqual(decodeTailwindClass('rounded-t-md'), 'border-top-left-radius: 0.375rem;\nborder-top-right-radius: 0.375rem;');
    });

    test('decodes position utilities', () => {
        assert.strictEqual(decodeTailwindClass('static'), 'position: static;');
        assert.strictEqual(decodeTailwindClass('relative'), 'position: relative;');
        assert.strictEqual(decodeTailwindClass('absolute'), 'position: absolute;');
        assert.strictEqual(decodeTailwindClass('fixed'), 'position: fixed;');
        assert.strictEqual(decodeTailwindClass('sticky'), 'position: sticky;');
    });

    test('decodes inset utilities', () => {
        assert.strictEqual(decodeTailwindClass('top-0'), 'top: 0px;');
        assert.strictEqual(decodeTailwindClass('right-4'), 'right: 16px;');
        assert.strictEqual(decodeTailwindClass('bottom-full'), 'bottom: 100%;');
        assert.strictEqual(decodeTailwindClass('left-auto'), 'left: auto;');
        assert.strictEqual(decodeTailwindClass('inset-0'), 'inset: 0px;');
        assert.strictEqual(decodeTailwindClass('inset-x-2'), 'left: 8px;\nright: 8px;');
        assert.strictEqual(decodeTailwindClass('inset-y-4'), 'top: 16px;\nbottom: 16px;');
    });

    test('decodes display utilities', () => {
        assert.strictEqual(decodeTailwindClass('block'), 'display: block;');
        assert.strictEqual(decodeTailwindClass('inline'), 'display: inline;');
        assert.strictEqual(decodeTailwindClass('table'), 'display: table;');
        assert.strictEqual(decodeTailwindClass('contents'), 'display: contents;');
    });

    test('decodes z-index utilities', () => {
        assert.strictEqual(decodeTailwindClass('z-0'), 'z-index: 0;');
        assert.strictEqual(decodeTailwindClass('z-10'), 'z-index: 10;');
        assert.strictEqual(decodeTailwindClass('z-50'), 'z-index: 50;');
        assert.strictEqual(decodeTailwindClass('z-auto'), 'z-index: auto;');
    });

    test('decodes overflow utilities', () => {
        assert.strictEqual(decodeTailwindClass('overflow-auto'), 'overflow: auto;');
        assert.strictEqual(decodeTailwindClass('overflow-hidden'), 'overflow: hidden;');
        assert.strictEqual(decodeTailwindClass('overflow-visible'), 'overflow: visible;');
        assert.strictEqual(decodeTailwindClass('overflow-scroll'), 'overflow: scroll;');
        assert.strictEqual(decodeTailwindClass('overflow-x-auto'), 'overflow-x: auto;');
        assert.strictEqual(decodeTailwindClass('overflow-y-hidden'), 'overflow-y: hidden;');
    });

    test('decodes shadow utilities', () => {
        assert.ok(decodeTailwindClass('shadow')?.includes('box-shadow'));
        assert.ok(decodeTailwindClass('shadow-sm')?.includes('box-shadow'));
        assert.ok(decodeTailwindClass('shadow-lg')?.includes('box-shadow'));
        assert.ok(decodeTailwindClass('shadow-xl')?.includes('box-shadow'));
        assert.strictEqual(decodeTailwindClass('shadow-none'), 'box-shadow: 0 0 #0000;');
        assert.ok(decodeTailwindClass('shadow-red-500')?.includes('#ef4444'));
    });

    test('decodes opacity utilities', () => {
        assert.strictEqual(decodeTailwindClass('opacity-0'), 'opacity: 0;');
        assert.strictEqual(decodeTailwindClass('opacity-50'), 'opacity: 0.5;');
        assert.strictEqual(decodeTailwindClass('opacity-100'), 'opacity: 1;');
    });

    test('decodes cursor utilities', () => {
        assert.strictEqual(decodeTailwindClass('cursor-pointer'), 'cursor: pointer;');
        assert.strictEqual(decodeTailwindClass('cursor-default'), 'cursor: default;');
        assert.strictEqual(decodeTailwindClass('cursor-not-allowed'), 'cursor: not-allowed;');
    });

    test('decodes arbitrary value syntax', () => {
        assert.strictEqual(decodeTailwindClass('w-[32px]'), 'width: 32px;');
        assert.strictEqual(decodeTailwindClass('bg-[#ff0000]'), 'background-color: #ff0000;');
        assert.strictEqual(decodeTailwindClass('text-[14px]'), 'color: 14px;'); // arbitrary color values pass through
        assert.strictEqual(decodeTailwindClass('rotate-[17deg]'), '--tw-rotate: 17deg;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));');
        assert.strictEqual(decodeTailwindClass('p-[2rem]'), 'padding: 2rem;');
    });

    test('returns undefined for invalid classes', () => {
        assert.strictEqual(decodeTailwindClass('not-a-real-class'), undefined);
        assert.strictEqual(decodeTailwindClass(''), undefined);
        assert.strictEqual(decodeTailwindClass('randomstring123'), undefined);
    });

    test('decodes grid utilities', () => {
        assert.strictEqual(decodeTailwindClass('grid-cols-1'), 'grid-template-columns: repeat(1, minmax(0, 1fr));');
        assert.strictEqual(decodeTailwindClass('grid-cols-3'), 'grid-template-columns: repeat(3, minmax(0, 1fr));');
        assert.strictEqual(decodeTailwindClass('grid-rows-2'), 'grid-template-rows: repeat(2, minmax(0, 1fr));');
        assert.strictEqual(decodeTailwindClass('gap-4'), 'gap: 16px;');
        assert.strictEqual(decodeTailwindClass('gap-x-2'), 'column-gap: 8px;');
        assert.strictEqual(decodeTailwindClass('gap-y-3'), 'row-gap: 12px;');
    });

    test('decodes transition utilities', () => {
        assert.ok(decodeTailwindClass('transition')?.includes('transition-property'));
        assert.ok(decodeTailwindClass('transition-colors')?.includes('transition-property'));
        assert.strictEqual(decodeTailwindClass('duration-300'), 'transition-duration: 300ms;');
        assert.strictEqual(decodeTailwindClass('duration-500'), 'transition-duration: 500ms;');
        assert.strictEqual(decodeTailwindClass('ease-in'), 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);');
        assert.strictEqual(decodeTailwindClass('ease-out'), 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);');
        assert.strictEqual(decodeTailwindClass('delay-100'), 'transition-delay: 100ms;');
    });

    test('decodes transform utilities', () => {
        assert.ok(decodeTailwindClass('scale-100')?.includes('--tw-scale-x'));
        assert.ok(decodeTailwindClass('scale-x-50')?.includes('--tw-scale-x'));
        assert.ok(decodeTailwindClass('rotate-45')?.includes('--tw-rotate'));
        assert.ok(decodeTailwindClass('translate-x-4')?.includes('--tw-translate-x'));
        assert.ok(decodeTailwindClass('translate-y-2')?.includes('--tw-translate-y'));
    });

    test('decodes visibility utilities', () => {
        assert.strictEqual(decodeTailwindClass('visible'), 'visibility: visible;');
        assert.strictEqual(decodeTailwindClass('invisible'), 'visibility: hidden;');
    });

    test('decodes list utilities', () => {
        assert.strictEqual(decodeTailwindClass('list-none'), 'list-style-type: none;');
        assert.strictEqual(decodeTailwindClass('list-disc'), 'list-style-type: disc;');
        assert.strictEqual(decodeTailwindClass('list-decimal'), 'list-style-type: decimal;');
    });

    test('decodes ring utilities', () => {
        assert.ok(decodeTailwindClass('ring')?.includes('--tw-ring'));
        assert.ok(decodeTailwindClass('ring-2')?.includes('--tw-ring'));
        assert.ok(decodeTailwindClass('ring-red-500')?.includes('--tw-ring-color'));
    });
});
