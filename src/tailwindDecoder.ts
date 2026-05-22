// Comprehensive Tailwind CSS utility class decoder
// Maps common Tailwind utility classes to their generated CSS equivalents

const SPACING_SCALE: Record<string, string> = {
    '0': '0px',
    'px': '1px',
    '0.5': '2px',
    '1': '4px',
    '1.5': '6px',
    '2': '8px',
    '2.5': '10px',
    '3': '12px',
    '3.5': '14px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '7': '28px',
    '8': '32px',
    '9': '36px',
    '10': '40px',
    '11': '44px',
    '12': '48px',
    '14': '56px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '28': '112px',
    '32': '128px',
    '36': '144px',
    '40': '160px',
    '44': '176px',
    '48': '192px',
    '52': '208px',
    '56': '224px',
    '60': '240px',
    '64': '256px',
    '72': '288px',
    '80': '320px',
    '96': '384px',
};

const PERCENTAGE_SCALE: Record<string, string> = {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    'full': '100%',
    'screen': '100vw',
    'min': 'min-content',
    'max': 'max-content',
    'fit': 'fit-content',
};

const COLOR_MAP: Record<string, string> = {
    'black': '#000000',
    'white': '#ffffff',
    'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0', 'slate-300': '#cbd5e1',
    'slate-400': '#94a3b8', 'slate-500': '#64748b', 'slate-600': '#475569', 'slate-700': '#334155',
    'slate-800': '#1e293b', 'slate-900': '#0f172a', 'slate-950': '#020617',
    'gray-50': '#f9fafb', 'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb', 'gray-300': '#d1d5db',
    'gray-400': '#9ca3af', 'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151',
    'gray-800': '#1f2937', 'gray-900': '#111827', 'gray-950': '#030712',
    'zinc-50': '#fafafa', 'zinc-100': '#f4f4f5', 'zinc-200': '#e4e4e7', 'zinc-300': '#d4d4d8',
    'zinc-400': '#a1a1aa', 'zinc-500': '#71717a', 'zinc-600': '#52525b', 'zinc-700': '#3f3f46',
    'zinc-800': '#27272a', 'zinc-900': '#18181b', 'zinc-950': '#09090b',
    'neutral-50': '#fafafa', 'neutral-100': '#f5f5f5', 'neutral-200': '#e5e5e5', 'neutral-300': '#d4d4d4',
    'neutral-400': '#a3a3a3', 'neutral-500': '#737373', 'neutral-600': '#525252', 'neutral-700': '#404040',
    'neutral-800': '#262626', 'neutral-900': '#171717', 'neutral-950': '#0a0a0a',
    'stone-50': '#fafaf9', 'stone-100': '#f5f5f4', 'stone-200': '#e7e5e4', 'stone-300': '#d6d3d1',
    'stone-400': '#a8a29e', 'stone-500': '#78716c', 'stone-600': '#57534e', 'stone-700': '#44403c',
    'stone-800': '#292524', 'stone-900': '#1c1917', 'stone-950': '#0c0a09',
    'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca', 'red-300': '#fca5a5',
    'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
    'red-800': '#991b1b', 'red-900': '#7f1d1d', 'red-950': '#450a0a',
    'orange-50': '#fff7ed', 'orange-100': '#ffedd5', 'orange-200': '#fed7aa', 'orange-300': '#fdba74',
    'orange-400': '#fb923c', 'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c',
    'orange-800': '#9a3412', 'orange-900': '#7c2d12', 'orange-950': '#431407',
    'amber-50': '#fffbeb', 'amber-100': '#fef3c7', 'amber-200': '#fde68a', 'amber-300': '#fcd34d',
    'amber-400': '#fbbf24', 'amber-500': '#f59e0b', 'amber-600': '#d97706', 'amber-700': '#b45309',
    'amber-800': '#92400e', 'amber-900': '#78350f', 'amber-950': '#451a03',
    'yellow-50': '#fefce8', 'yellow-100': '#fef9c3', 'yellow-200': '#fef08a', 'yellow-300': '#fde047',
    'yellow-400': '#facc15', 'yellow-500': '#eab308', 'yellow-600': '#ca8a04', 'yellow-700': '#a16207',
    'yellow-800': '#854d0e', 'yellow-900': '#713f12', 'yellow-950': '#422006',
    'lime-50': '#f7fee7', 'lime-100': '#ecfccb', 'lime-200': '#d9f99d', 'lime-300': '#bef264',
    'lime-400': '#a3e635', 'lime-500': '#84cc16', 'lime-600': '#65a30d', 'lime-700': '#4d7c0f',
    'lime-800': '#3f6212', 'lime-900': '#365314', 'lime-950': '#1a2e05',
    'green-50': '#f0fdf4', 'green-100': '#dcfce7', 'green-200': '#bbf7d0', 'green-300': '#86efac',
    'green-400': '#4ade80', 'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
    'green-800': '#166534', 'green-900': '#14532d', 'green-950': '#052e16',
    'emerald-50': '#ecfdf5', 'emerald-100': '#d1fae5', 'emerald-200': '#a7f3d0', 'emerald-300': '#6ee7b7',
    'emerald-400': '#34d399', 'emerald-500': '#10b981', 'emerald-600': '#059669', 'emerald-700': '#047857',
    'emerald-800': '#065f46', 'emerald-900': '#064e3b', 'emerald-950': '#022c22',
    'teal-50': '#f0fdfa', 'teal-100': '#ccfbf1', 'teal-200': '#99f6e4', 'teal-300': '#5eead4',
    'teal-400': '#2dd4bf', 'teal-500': '#14b8a6', 'teal-600': '#0d9488', 'teal-700': '#0f766e',
    'teal-800': '#115e59', 'teal-900': '#134e4a', 'teal-950': '#042f2e',
    'cyan-50': '#ecfeff', 'cyan-100': '#cffafe', 'cyan-200': '#a5f3fc', 'cyan-300': '#67e8f9',
    'cyan-400': '#22d3ee', 'cyan-500': '#06b6d4', 'cyan-600': '#0891b2', 'cyan-700': '#0e7490',
    'cyan-800': '#155e75', 'cyan-900': '#164e63', 'cyan-950': '#083344',
    'sky-50': '#f0f9ff', 'sky-100': '#e0f2fe', 'sky-200': '#bae6fd', 'sky-300': '#7dd3fc',
    'sky-400': '#38bdf8', 'sky-500': '#0ea5e9', 'sky-600': '#0284c7', 'sky-700': '#0369a1',
    'sky-800': '#075985', 'sky-900': '#0c4a6e', 'sky-950': '#082f49',
    'blue-50': '#eff6ff', 'blue-100': '#dbeafe', 'blue-200': '#bfdbfe', 'blue-300': '#93c5fd',
    'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8',
    'blue-800': '#1e40af', 'blue-900': '#1e3a8a', 'blue-950': '#172554',
    'indigo-50': '#eef2ff', 'indigo-100': '#e0e7ff', 'indigo-200': '#c7d2fe', 'indigo-300': '#a5b4fc',
    'indigo-400': '#818cf8', 'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
    'indigo-800': '#3730a3', 'indigo-900': '#312e81', 'indigo-950': '#1e1b4b',
    'violet-50': '#f5f3ff', 'violet-100': '#ede9fe', 'violet-200': '#ddd6fe', 'violet-300': '#c4b5fd',
    'violet-400': '#a78bfa', 'violet-500': '#8b5cf6', 'violet-600': '#7c3aed', 'violet-700': '#6d28d9',
    'violet-800': '#5b21b6', 'violet-900': '#4c1d95', 'violet-950': '#2e1065',
    'purple-50': '#faf5ff', 'purple-100': '#f3e8ff', 'purple-200': '#e9d5ff', 'purple-300': '#d8b4fe',
    'purple-400': '#c084fc', 'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7e22ce',
    'purple-800': '#6b21a8', 'purple-900': '#581c87', 'purple-950': '#3b0764',
    'fuchsia-50': '#fdf4ff', 'fuchsia-100': '#fae8ff', 'fuchsia-200': '#f5d0fe', 'fuchsia-300': '#f0abfc',
    'fuchsia-400': '#e879f9', 'fuchsia-500': '#d946ef', 'fuchsia-600': '#c026d3', 'fuchsia-700': '#a21caf',
    'fuchsia-800': '#86198f', 'fuchsia-900': '#701a75', 'fuchsia-950': '#4a044e',
    'pink-50': '#fdf2f8', 'pink-100': '#fce7f3', 'pink-200': '#fbcfe8', 'pink-300': '#f9a8d4',
    'pink-400': '#f472b6', 'pink-500': '#ec4899', 'pink-600': '#db2777', 'pink-700': '#be185d',
    'pink-800': '#9d174d', 'pink-900': '#831843', 'pink-950': '#500724',
    'rose-50': '#fff1f2', 'rose-100': '#ffe4e6', 'rose-200': '#fecdd3', 'rose-300': '#fda4af',
    'rose-400': '#fb7185', 'rose-500': '#f43f5e', 'rose-600': '#e11d48', 'rose-700': '#be123c',
    'rose-800': '#9f1239', 'rose-900': '#881337', 'rose-950': '#4c0519',
    'transparent': 'transparent',
    'current': 'currentColor',
    'inherit': 'inherit',
};

const FONT_SIZE_MAP: Record<string, string | string[]> = {
    'xs': ['0.75rem', '1rem'],
    'sm': ['0.875rem', '1.25rem'],
    'base': ['1rem', '1.5rem'],
    'lg': ['1.125rem', '1.75rem'],
    'xl': ['1.25rem', '1.75rem'],
    '2xl': ['1.5rem', '2rem'],
    '3xl': ['1.875rem', '2.25rem'],
    '4xl': ['2.25rem', '2.5rem'],
    '5xl': ['3rem', '1'],
    '6xl': ['3.75rem', '1'],
    '7xl': ['4.5rem', '1'],
    '8xl': ['6rem', '1'],
    '9xl': ['8rem', '1'],
};

const FONT_WEIGHT_MAP: Record<string, string> = {
    'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400',
    'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900',
};

const LINE_HEIGHT_MAP: Record<string, string> = {
    '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '7': '1.75rem',
    '8': '2rem', '9': '2.25rem', '10': '2.5rem', 'none': '1', 'tight': '1.25',
    'snug': '1.375', 'normal': '1.5', 'relaxed': '1.625', 'loose': '2',
};

const LETTER_SPACING_MAP: Record<string, string> = {
    'tighter': '-0.05em', 'tight': '-0.025em', 'normal': '0em',
    'wide': '0.025em', 'wider': '0.05em', 'widest': '0.1em',
};

const BORDER_RADIUS_MAP: Record<string, string> = {
    'none': '0px', 'sm': '0.125rem', 'DEFAULT': '0.25rem', 'md': '0.375rem',
    'lg': '0.5rem', 'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
};

const Z_INDEX_MAP: Record<string, string> = {
    '0': '0', '10': '10', '20': '20', '30': '30', '40': '40', '50': '50',
    'auto': 'auto',
};

function getSpacing(value: string): string | undefined {
    if (SPACING_SCALE[value] !== undefined) return SPACING_SCALE[value];
    if (value.endsWith('px')) return value;
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.slice(1, -1);
    }
    return undefined;
}

function getColor(value: string): string | undefined {
    if (COLOR_MAP[value] !== undefined) return COLOR_MAP[value];
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.slice(1, -1);
    }
    return undefined;
}

function getPercentage(value: string): string | undefined {
    if (PERCENTAGE_SCALE[value] !== undefined) return PERCENTAGE_SCALE[value];
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.slice(1, -1);
    }
    return undefined;
}

function getSize(value: string): string | undefined {
    const pct = getPercentage(value);
    if (pct !== undefined) return pct;
    const sp = getSpacing(value);
    if (sp !== undefined) return sp;
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.slice(1, -1);
    }
    return undefined;
}

export function decodeTailwindClass(cls: string): string | undefined {
    const parts = cls.split('-');
    const first = parts[0];

    // Layout
    if (first === 'block') return 'display: block;';
    if (first === 'inline') {
        if (parts[1] === 'block') return 'display: inline-block;';
        if (parts[1] === 'flex') return 'display: inline-flex;';
        if (parts[1] === 'grid') return 'display: inline-grid;';
        if (parts[1] === 'table') return 'display: inline-table;';
        return 'display: inline;';
    }
    if (first === 'flex') {
        if (parts[1] === undefined) return 'display: flex;';
        // flex-1, flex-auto, flex-initial, flex-none
        if (parts[1] === '1') return 'flex: 1 1 0%;';
        if (parts[1] === 'auto') return 'flex: 1 1 auto;';
        if (parts[1] === 'initial') return 'flex: 0 1 auto;';
        if (parts[1] === 'none') return 'flex: none;';
        // flex-wrap, flex-nowrap, flex-wrap-reverse
        if (parts[1] === 'wrap' && parts[2] === 'reverse') return 'flex-wrap: wrap-reverse;';
        if (parts[1] === 'wrap') return 'flex-wrap: wrap;';
        if (parts[1] === 'nowrap') return 'flex-wrap: nowrap;';
        // flex-row, flex-row-reverse, flex-col, flex-col-reverse
        if (parts[1] === 'row' && parts[2] === 'reverse') return 'flex-direction: row-reverse;';
        if (parts[1] === 'row') return 'flex-direction: row;';
        if (parts[1] === 'col' && parts[2] === 'reverse') return 'flex-direction: column-reverse;';
        if (parts[1] === 'col') return 'flex-direction: column;';
        // flex-grow, flex-shrink
        if (parts[1] === 'grow') {
            if (parts[2] === '0') return 'flex-grow: 0;';
            return 'flex-grow: 1;';
        }
        if (parts[1] === 'shrink') {
            if (parts[2] === '0') return 'flex-shrink: 0;';
            return 'flex-shrink: 1;';
        }
        // flex-basis
        if (parts[1] === 'basis') {
            const val = getSize(parts.slice(2).join('-'));
            if (val) return `flex-basis: ${val};`;
        }
    }
    if (first === 'grid') {
        if (parts[1] === undefined) return 'display: grid;';
        if (parts[1] === 'cols') {
            const val = parts[2];
            if (val === 'none') return 'grid-template-columns: none;';
            if (!isNaN(Number(val))) return `grid-template-columns: repeat(${val}, minmax(0, 1fr));`;
            const sub = parts.slice(2).join('-');
            if (sub.startsWith('[') && sub.endsWith(']')) {
                return `grid-template-columns: ${sub.slice(1, -1)};`;
            }
        }
        if (parts[1] === 'rows') {
            const val = parts[2];
            if (val === 'none') return 'grid-template-rows: none;';
            if (!isNaN(Number(val))) return `grid-template-rows: repeat(${val}, minmax(0, 1fr));`;
            const sub = parts.slice(2).join('-');
            if (sub.startsWith('[') && sub.endsWith(']')) {
                return `grid-template-rows: ${sub.slice(1, -1)};`;
            }
        }
        if (parts[1] === 'flow') {
            if (parts[2] === 'row' && parts[3] === 'dense') return 'grid-auto-flow: row dense;';
            if (parts[2] === 'row') return 'grid-auto-flow: row;';
            if (parts[2] === 'col' && parts[3] === 'dense') return 'grid-auto-flow: column dense;';
            if (parts[2] === 'col') return 'grid-auto-flow: column;';
            if (parts[2] === 'dense') return 'grid-auto-flow: dense;';
        }
        if (parts[1] === 'auto') {
            if (parts[2] === 'cols') {
                const val = getSize(parts.slice(3).join('-'));
                if (val) return `grid-auto-columns: ${val};`;
            }
            if (parts[2] === 'rows') {
                const val = getSize(parts.slice(3).join('-'));
                if (val) return `grid-auto-rows: ${val};`;
            }
        }
    }
    if (first === 'hidden') return 'display: none;';
    if (first === 'table') {
        if (parts[1] === undefined) return 'display: table;';
        if (parts[1] === 'caption') return 'display: table-caption;';
        if (parts[1] === 'cell') return 'display: table-cell;';
        if (parts[1] === 'column') {
            if (parts[2] === 'group') return 'display: table-column-group;';
            return 'display: table-column;';
        }
        if (parts[1] === 'footer') return 'display: table-footer-group;';
        if (parts[1] === 'header') return 'display: table-header-group;';
        if (parts[1] === 'row') {
            if (parts[2] === 'group') return 'display: table-row-group;';
            return 'display: table-row;';
        }
    }

    // Position
    if (first === 'static') return 'position: static;';
    if (first === 'fixed') return 'position: fixed;';
    if (first === 'absolute') return 'position: absolute;';
    if (first === 'relative') return 'position: relative;';
    if (first === 'sticky') return 'position: sticky;';

    // Top / Right / Bottom / Left / Inset
    const INSET_PROPS: Record<string, string> = { 'top': 'top', 'right': 'right', 'bottom': 'bottom', 'left': 'left', 'inset': 'inset', 'inset-x': 'left,right', 'inset-y': 'top,bottom' };
    const insetKey = (first === 'inset' && (parts[1] === 'x' || parts[1] === 'y')) ? `${first}-${parts[1]}` : first;
    if (INSET_PROPS[insetKey] !== undefined) {
        const sliceIndex = insetKey.includes('-') ? 2 : 1;
        const val = getSize(parts.slice(sliceIndex).join('-'));
        if (val) {
            const props = INSET_PROPS[insetKey].split(',');
            return props.map(p => `${p}: ${val};`).join('\n');
        }
        if (parts[sliceIndex] === 'auto') {
            const props = INSET_PROPS[insetKey].split(',');
            return props.map(p => `${p}: auto;`).join('\n');
        }
        if (parts[sliceIndex] === 'full') {
            const props = INSET_PROPS[insetKey].split(',');
            return props.map(p => `${p}: 100%;`).join('\n');
        }
    }

    // Z-index
    if (first === 'z') {
        const val = Z_INDEX_MAP[parts[1]];
        if (val !== undefined) return `z-index: ${val};`;
        if (!isNaN(Number(parts[1]))) return `z-index: ${parts[1]};`;
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) {
            return `z-index: ${parts[1].slice(1, -1)};`;
        }
    }

    // Box sizing
    if (first === 'box' && parts[1] === 'border') return 'box-sizing: border-box;';
    if (first === 'box' && parts[1] === 'content') return 'box-sizing: content-box;';

    // Container
    if (first === 'container') return 'width: 100%;\nmax-width: ...; /* responsive container */';

    // Columns
    if (first === 'columns') {
        const val = parts[1];
        if (!isNaN(Number(val))) return `columns: ${val};`;
        if (val === 'auto') return 'columns: auto;';
        if (val === '3xs') return 'columns: 16rem;';
        if (val === '2xs') return 'columns: 18rem;';
        if (val === 'xs') return 'columns: 20rem;';
        if (val === 'sm') return 'columns: 24rem;';
        if (val === 'md') return 'columns: 28rem;';
        if (val === 'lg') return 'columns: 32rem;';
        if (val === 'xl') return 'columns: 36rem;';
        if (val === '2xl') return 'columns: 42rem;';
        if (val === '3xl') return 'columns: 48rem;';
        if (val === '4xl') return 'columns: 56rem;';
        if (val === '5xl') return 'columns: 64rem;';
        if (val === '6xl') return 'columns: 72rem;';
        if (val === '7xl') return 'columns: 80rem;';
    }
    if (first === 'break') {
        if (parts[1] === 'after') {
            if (parts[2] === 'avoid') return 'break-after: avoid;';
            if (parts[2] === 'all') return 'break-after: all;';
            if (parts[2] === 'page') return 'break-after: page;';
            if (parts[2] === 'left') return 'break-after: left;';
            if (parts[2] === 'right') return 'break-after: right;';
            if (parts[2] === 'column') return 'break-after: column;';
        }
        if (parts[1] === 'before') {
            if (parts[2] === 'auto') return 'break-before: auto;';
            if (parts[2] === 'avoid') return 'break-before: avoid;';
            if (parts[2] === 'all') return 'break-before: all;';
            if (parts[2] === 'page') return 'break-before: page;';
            if (parts[2] === 'left') return 'break-before: left;';
            if (parts[2] === 'right') return 'break-before: right;';
            if (parts[2] === 'column') return 'break-before: column;';
        }
        if (parts[1] === 'inside') {
            if (parts[2] === 'auto') return 'break-inside: auto;';
            if (parts[2] === 'avoid') return 'break-inside: avoid;';
            if (parts[2] === 'page') return 'break-inside: page;';
            if (parts[2] === 'column') return 'break-inside: column;';
        }
    }

    // Float / Clear
    if (first === 'float') {
        if (parts[1] === 'right') return 'float: right;';
        if (parts[1] === 'left') return 'float: left;';
        if (parts[1] === 'none') return 'float: none;';
        if (parts[1] === 'start') return 'float: inline-start;';
        if (parts[1] === 'end') return 'float: inline-end;';
    }
    if (first === 'clear') {
        if (parts[1] === 'left') return 'clear: left;';
        if (parts[1] === 'right') return 'clear: right;';
        if (parts[1] === 'both') return 'clear: both;';
        if (parts[1] === 'none') return 'clear: none;';
        if (parts[1] === 'start') return 'clear: inline-start;';
        if (parts[1] === 'end') return 'clear: inline-end;';
    }

    // Object fit / position
    if (first === 'object') {
        if (parts[1] === 'contain') return 'object-fit: contain;';
        if (parts[1] === 'cover') return 'object-fit: cover;';
        if (parts[1] === 'fill') return 'object-fit: fill;';
        if (parts[1] === 'none') return 'object-fit: none;';
        if (parts[1] === 'scale' && parts[2] === 'down') return 'object-fit: scale-down;';
        if (parts[1] === 'bottom') return 'object-position: bottom;';
        if (parts[1] === 'center') return 'object-position: center;';
        if (parts[1] === 'left') {
            if (parts[2] === 'bottom') return 'object-position: left bottom;';
            if (parts[2] === 'top') return 'object-position: left top;';
            return 'object-position: left;';
        }
        if (parts[1] === 'right') {
            if (parts[2] === 'bottom') return 'object-position: right bottom;';
            if (parts[2] === 'top') return 'object-position: right top;';
            return 'object-position: right;';
        }
        if (parts[1] === 'top') return 'object-position: top;';
    }

    // Overflow
    if (first === 'overflow') {
        if (parts[1] === 'auto') return 'overflow: auto;';
        if (parts[1] === 'hidden') return 'overflow: hidden;';
        if (parts[1] === 'clip') return 'overflow: clip;';
        if (parts[1] === 'visible') return 'overflow: visible;';
        if (parts[1] === 'scroll') return 'overflow: scroll;';
        if (parts[1] === 'x') {
            if (parts[2] === 'auto') return 'overflow-x: auto;';
            if (parts[2] === 'hidden') return 'overflow-x: hidden;';
            if (parts[2] === 'clip') return 'overflow-x: clip;';
            if (parts[2] === 'visible') return 'overflow-x: visible;';
            if (parts[2] === 'scroll') return 'overflow-x: scroll;';
        }
        if (parts[1] === 'y') {
            if (parts[2] === 'auto') return 'overflow-y: auto;';
            if (parts[2] === 'hidden') return 'overflow-y: hidden;';
            if (parts[2] === 'clip') return 'overflow-y: clip;';
            if (parts[2] === 'visible') return 'overflow-y: visible;';
            if (parts[2] === 'scroll') return 'overflow-y: scroll;';
        }
    }
    if (first === 'overscroll') {
        if (parts[1] === 'auto') return 'overscroll-behavior: auto;';
        if (parts[1] === 'contain') return 'overscroll-behavior: contain;';
        if (parts[1] === 'none') return 'overscroll-behavior: none;';
        if (parts[1] === 'x') {
            if (parts[2] === 'auto') return 'overscroll-behavior-x: auto;';
            if (parts[2] === 'contain') return 'overscroll-behavior-x: contain;';
            if (parts[2] === 'none') return 'overscroll-behavior-x: none;';
        }
        if (parts[1] === 'y') {
            if (parts[2] === 'auto') return 'overscroll-behavior-y: auto;';
            if (parts[2] === 'contain') return 'overscroll-behavior-y: contain;';
            if (parts[2] === 'none') return 'overscroll-behavior-y: none;';
        }
    }

    // Visibility
    if (first === 'visible') return 'visibility: visible;';
    if (first === 'invisible') return 'visibility: hidden;';
    if (first === 'collapse') return 'visibility: collapse;';

    // Sizing - Width
    if (first === 'w') {
        const val = getSize(parts.slice(1).join('-'));
        if (val) return `width: ${val};`;
        if (parts[1] === 'auto') return 'width: auto;';
        if (parts[1] === 'screen') return 'width: 100vw;';
        if (parts[1] === 'min') return 'width: min-content;';
        if (parts[1] === 'max') return 'width: max-content;';
        if (parts[1] === 'fit') return 'width: fit-content;';
    }
    // Min-Width
    if (first === 'min' && parts[1] === 'w') {
        const val = getSize(parts.slice(2).join('-'));
        if (val) return `min-width: ${val};`;
        if (parts[2] === 'full') return 'min-width: 100%;';
        if (parts[2] === 'min') return 'min-width: min-content;';
        if (parts[2] === 'max') return 'min-width: max-content;';
        if (parts[2] === 'fit') return 'min-width: fit-content;';
    }
    // Max-Width
    if (first === 'max' && parts[1] === 'w') {
        const val = getSize(parts.slice(2).join('-'));
        if (val) return `max-width: ${val};`;
        if (parts[2] === 'none') return 'max-width: none;';
        if (parts[2] === 'full') return 'max-width: 100%;';
        if (parts[2] === 'min') return 'max-width: min-content;';
        if (parts[2] === 'max') return 'max-width: max-content;';
        if (parts[2] === 'fit') return 'max-width: fit-content;';
        if (parts[2] === 'prose') return 'max-width: 65ch;';
        if (parts[2] === 'screen') {
            const bp = parts[3];
            if (bp === 'sm') return 'max-width: 640px;';
            if (bp === 'md') return 'max-width: 768px;';
            if (bp === 'lg') return 'max-width: 1024px;';
            if (bp === 'xl') return 'max-width: 1280px;';
            if (bp === '2xl') return 'max-width: 1536px;';
        }
    }
    // Height
    if (first === 'h') {
        if (parts[1] === 'auto') return 'height: auto;';
        if (parts[1] === 'screen') return 'height: 100vh;';
        const val = getSize(parts.slice(1).join('-'));
        if (val) return `height: ${val};`;
        if (parts[1] === 'min') return 'height: min-content;';
        if (parts[1] === 'max') return 'height: max-content;';
        if (parts[1] === 'fit') return 'height: fit-content;';
    }
    // Min-Height
    if (first === 'min' && parts[1] === 'h') {
        const val = getSize(parts.slice(2).join('-'));
        if (val) return `min-height: ${val};`;
        if (parts[2] === 'full') return 'min-height: 100%;';
        if (parts[2] === 'screen') return 'min-height: 100vh;';
        if (parts[2] === 'min') return 'min-height: min-content;';
        if (parts[2] === 'max') return 'min-height: max-content;';
        if (parts[2] === 'fit') return 'min-height: fit-content;';
    }
    // Max-Height
    if (first === 'max' && parts[1] === 'h') {
        const val = getSize(parts.slice(2).join('-'));
        if (val) return `max-height: ${val};`;
        if (parts[2] === 'none') return 'max-height: none;';
        if (parts[2] === 'full') return 'max-height: 100%;';
        if (parts[2] === 'screen') return 'max-height: 100vh;';
        if (parts[2] === 'min') return 'max-height: min-content;';
        if (parts[2] === 'max') return 'max-height: max-content;';
        if (parts[2] === 'fit') return 'max-height: fit-content;';
    }

    // Aspect ratio
    if (first === 'aspect') {
        if (parts[1] === 'auto') return 'aspect-ratio: auto;';
        if (parts[1] === 'square') return 'aspect-ratio: 1 / 1;';
        if (parts[1] === 'video') return 'aspect-ratio: 16 / 9;';
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) {
            return `aspect-ratio: ${parts[1].slice(1, -1)};`;
        }
    }

    // Padding
    const PADDING_PROPS: Record<string, string> = {
        'p': 'padding',
        'px': 'padding-left,padding-right',
        'py': 'padding-top,padding-bottom',
        'pt': 'padding-top',
        'pr': 'padding-right',
        'pb': 'padding-bottom',
        'pl': 'padding-left',
        'ps': 'padding-inline-start',
        'pe': 'padding-inline-end',
    };
    if (PADDING_PROPS[first] !== undefined) {
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) {
            const props = PADDING_PROPS[first].split(',');
            return props.map(p => `${p}: ${val};`).join('\n');
        }
    }

    // Margin
    const MARGIN_PROPS: Record<string, string> = {
        'm': 'margin',
        'mx': 'margin-left,margin-right',
        'my': 'margin-top,margin-bottom',
        'mt': 'margin-top',
        'mr': 'margin-right',
        'mb': 'margin-bottom',
        'ml': 'margin-left',
        'ms': 'margin-inline-start',
        'me': 'margin-inline-end',
    };
    if (MARGIN_PROPS[first] !== undefined) {
        const rest = parts.slice(1).join('-');
        if (rest === 'auto') {
            const props = MARGIN_PROPS[first].split(',');
            return props.map(p => `${p}: auto;`).join('\n');
        }
        const val = getSpacing(rest);
        if (val) {
            const props = MARGIN_PROPS[first].split(',');
            return props.map(p => `${p}: ${val};`).join('\n');
        }
    }

    // Space-X / Space-Y (gap-like margins for flex/grid children)
    if (first === 'space' && (parts[1] === 'x' || parts[1] === 'y')) {
        const isX = parts[1] === 'x';
        const dir = isX ? 'margin-left' : 'margin-top';
        const invDir = isX ? 'margin-right' : 'margin-bottom';
        const rest = parts.slice(2).join('-');
        if (rest === 'reverse') {
            return `--tw-space-${parts[1]}-reverse: 1;`;
        }
        const val = getSpacing(rest);
        if (val) {
            return `& > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-${parts[1]}-reverse: 0;\n  ${dir}: calc(${val} * calc(1 - var(--tw-space-${parts[1]}-reverse)));\n  ${invDir}: calc(${val} * var(--tw-space-${parts[1]}-reverse));\n}`;
        }
    }

    // Gap
    if (first === 'gap') {
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) return `gap: ${val};`;
    }
    // Gap-x and gap-y
    if (first === 'gap' && parts[1] === 'x') {
        const val = getSpacing(parts.slice(2).join('-'));
        if (val) return `column-gap: ${val};`;
    }
    if (first === 'gap' && parts[1] === 'y') {
        const val = getSpacing(parts.slice(2).join('-'));
        if (val) return `row-gap: ${val};`;
    }

    // Justify / Align / Place
    if (first === 'justify') {
        if (parts[1] === 'normal') return 'justify-content: normal;';
        if (parts[1] === 'start') return 'justify-content: flex-start;';
        if (parts[1] === 'end') return 'justify-content: flex-end;';
        if (parts[1] === 'center') return 'justify-content: center;';
        if (parts[1] === 'between') return 'justify-content: space-between;';
        if (parts[1] === 'around') return 'justify-content: space-around;';
        if (parts[1] === 'evenly') return 'justify-content: space-evenly;';
        if (parts[1] === 'stretch') return 'justify-content: stretch;';
        if (parts[1] === 'items') {
            if (parts[2] === 'start') return 'justify-items: start;';
            if (parts[2] === 'end') return 'justify-items: end;';
            if (parts[2] === 'center') return 'justify-items: center;';
            if (parts[2] === 'stretch') return 'justify-items: stretch;';
        }
        if (parts[1] === 'self') {
            if (parts[2] === 'auto') return 'justify-self: auto;';
            if (parts[2] === 'start') return 'justify-self: start;';
            if (parts[2] === 'end') return 'justify-self: end;';
            if (parts[2] === 'center') return 'justify-self: center;';
            if (parts[2] === 'stretch') return 'justify-self: stretch;';
        }
    }
    if (first === 'content') {
        if (parts[1] === 'normal') return 'align-content: normal;';
        if (parts[1] === 'center') return 'align-content: center;';
        if (parts[1] === 'start') return 'align-content: flex-start;';
        if (parts[1] === 'end') return 'align-content: flex-end;';
        if (parts[1] === 'between') return 'align-content: space-between;';
        if (parts[1] === 'around') return 'align-content: space-around;';
        if (parts[1] === 'evenly') return 'align-content: space-evenly;';
        if (parts[1] === 'baseline') return 'align-content: baseline;';
        if (parts[1] === 'stretch') return 'align-content: stretch;';
    }
    if (first === 'items') {
        if (parts[1] === 'start') return 'align-items: flex-start;';
        if (parts[1] === 'end') return 'align-items: flex-end;';
        if (parts[1] === 'center') return 'align-items: center;';
        if (parts[1] === 'baseline') return 'align-items: baseline;';
        if (parts[1] === 'stretch') return 'align-items: stretch;';
    }
    if (first === 'self') {
        if (parts[1] === 'auto') return 'align-self: auto;';
        if (parts[1] === 'start') return 'align-self: flex-start;';
        if (parts[1] === 'end') return 'align-self: flex-end;';
        if (parts[1] === 'center') return 'align-self: center;';
        if (parts[1] === 'baseline') return 'align-self: baseline;';
        if (parts[1] === 'stretch') return 'align-self: stretch;';
    }
    if (first === 'place') {
        if (parts[1] === 'content') {
            if (parts[2] === 'center') return 'place-content: center;';
            if (parts[2] === 'start') return 'place-content: start;';
            if (parts[2] === 'end') return 'place-content: end;';
            if (parts[2] === 'between') return 'place-content: space-between;';
            if (parts[2] === 'around') return 'place-content: space-around;';
            if (parts[2] === 'evenly') return 'place-content: space-evenly;';
            if (parts[2] === 'baseline') return 'place-content: baseline;';
            if (parts[2] === 'stretch') return 'place-content: stretch;';
        }
        if (parts[1] === 'items') {
            if (parts[2] === 'start') return 'place-items: start;';
            if (parts[2] === 'end') return 'place-items: end;';
            if (parts[2] === 'center') return 'place-items: center;';
            if (parts[2] === 'baseline') return 'place-items: baseline;';
            if (parts[2] === 'stretch') return 'place-items: stretch;';
        }
        if (parts[1] === 'self') {
            if (parts[2] === 'auto') return 'place-self: auto;';
            if (parts[2] === 'start') return 'place-self: start;';
            if (parts[2] === 'end') return 'place-self: end;';
            if (parts[2] === 'center') return 'place-self: center;';
            if (parts[2] === 'stretch') return 'place-self: stretch;';
        }
    }

    // Typography
    if (first === 'font') {
        if (parts[1] === 'sans') return 'font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";';
        if (parts[1] === 'serif') return 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;';
        if (parts[1] === 'mono') return 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;';
        const fw = FONT_WEIGHT_MAP[parts[1]];
        if (fw !== undefined) return `font-weight: ${fw};`;
    }
    if (first === 'text') {
        // text color
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `color: ${color};`;
        // font size
        const fs = FONT_SIZE_MAP[parts[1]];
        if (fs) {
            if (Array.isArray(fs)) {
                return `font-size: ${fs[0]};\nline-height: ${fs[1]};`;
            }
            return `font-size: ${fs};`;
        }
    }
    if (first === 'tracking') {
        const ls = LETTER_SPACING_MAP[parts[1]];
        if (ls) return `letter-spacing: ${ls};`;
    }
    if (first === 'leading') {
        const lh = LINE_HEIGHT_MAP[parts[1]];
        if (lh) return `line-height: ${lh};`;
        if (!isNaN(Number(parts[1]))) return `line-height: ${parts[1]};`;
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) {
            return `line-height: ${parts[1].slice(1, -1)};`;
        }
    }
    if (first === 'antialiased') return '-webkit-font-smoothing: antialiased;\n-moz-osx-font-smoothing: grayscale;';
    if (first === 'subpixel' && parts[1] === 'antialiased') return '-webkit-font-smoothing: auto;\n-moz-osx-font-smoothing: auto;';
    if (first === 'underline') return 'text-decoration-line: underline;';
    if (first === 'overline') return 'text-decoration-line: overline;';
    if (first === 'line' && parts[1] === 'through') return 'text-decoration-line: line-through;';
    if (first === 'no' && parts[1] === 'underline') return 'text-decoration-line: none;';
    if (first === 'decoration') {
        if (parts[1] === 'solid') return 'text-decoration-style: solid;';
        if (parts[1] === 'double') return 'text-decoration-style: double;';
        if (parts[1] === 'dotted') return 'text-decoration-style: dotted;';
        if (parts[1] === 'dashed') return 'text-decoration-style: dashed;';
        if (parts[1] === 'wavy') return 'text-decoration-style: wavy;';
        if (parts[1] === 'auto') return 'text-decoration-thickness: auto;';
        if (parts[1] === 'from' && parts[2] === 'font') return 'text-decoration-thickness: from-font;';
        const thick = getSpacing(parts[1]);
        if (thick) return `text-decoration-thickness: ${thick};`;
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `text-decoration-color: ${color};`;
    }
    if (first === 'uppercase') return 'text-transform: uppercase;';
    if (first === 'lowercase') return 'text-transform: lowercase;';
    if (first === 'capitalize') return 'text-transform: capitalize;';
    if (first === 'normal' && parts[1] === 'case') return 'text-transform: none;';
    if (first === 'truncate') return 'overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;';
    if (first === 'text' && parts[1] === 'ellipsis') return 'text-overflow: ellipsis;';
    if (first === 'text' && parts[1] === 'clip') return 'text-overflow: clip;';
    if (first === 'whitespace') {
        if (parts[1] === 'normal') return 'white-space: normal;';
        if (parts[1] === 'nowrap') return 'white-space: nowrap;';
        if (parts[1] === 'pre') return 'white-space: pre;';
        if (parts[1] === 'pre' && parts[2] === 'line') return 'white-space: pre-line;';
        if (parts[1] === 'pre' && parts[2] === 'wrap') return 'white-space: pre-wrap;';
        if (parts[1] === 'break' && parts[2] === 'spaces') return 'white-space: break-spaces;';
    }
    if (first === 'break') {
        if (parts[1] === 'normal') return 'overflow-wrap: normal;\nword-break: normal;';
        if (parts[1] === 'words') return 'overflow-wrap: break-word;';
        if (parts[1] === 'all') return 'word-break: break-all;';
        if (parts[1] === 'keep' && parts[2] === 'all') return 'word-break: keep-all;';
    }
    if (first === 'hyphens') {
        if (parts[1] === 'none') return 'hyphens: none;';
        if (parts[1] === 'manual') return 'hyphens: manual;';
        if (parts[1] === 'auto') return 'hyphens: auto;';
    }
    if (first === 'indent') {
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) return `text-indent: ${val};`;
    }
    if (first === 'align') {
        if (parts[1] === 'baseline') return 'vertical-align: baseline;';
        if (parts[1] === 'top') return 'vertical-align: top;';
        if (parts[1] === 'middle') return 'vertical-align: middle;';
        if (parts[1] === 'bottom') return 'vertical-align: bottom;';
        if (parts[1] === 'text' && parts[2] === 'top') return 'vertical-align: text-top;';
        if (parts[1] === 'text' && parts[2] === 'bottom') return 'vertical-align: text-bottom;';
        if (parts[1] === 'sub') return 'vertical-align: sub;';
        if (parts[1] === 'super') return 'vertical-align: super;';
    }

    // Backgrounds
    if (first === 'bg') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `background-color: ${color};`;
        if (parts[1] === 'fixed') return 'background-attachment: fixed;';
        if (parts[1] === 'local') return 'background-attachment: local;';
        if (parts[1] === 'scroll') return 'background-attachment: scroll;';
        if (parts[1] === 'clip' && parts[2] === 'border') return 'background-clip: border-box;';
        if (parts[1] === 'clip' && parts[2] === 'padding') return 'background-clip: padding-box;';
        if (parts[1] === 'clip' && parts[2] === 'content') return 'background-clip: content-box;';
        if (parts[1] === 'clip' && parts[2] === 'text') return 'background-clip: text;';
        if (parts[1] === 'origin' && parts[2] === 'border') return 'background-origin: border-box;';
        if (parts[1] === 'origin' && parts[2] === 'padding') return 'background-origin: padding-box;';
        if (parts[1] === 'origin' && parts[2] === 'content') return 'background-origin: content-box;';
        if (parts[1] === 'position') {
            const pos = parts.slice(2).join('-');
            if (pos) return `background-position: ${pos};`;
        }
        if (parts[1] === 'repeat') {
            if (parts[2] === undefined) return 'background-repeat: repeat;';
            if (parts[2] === 'no') return 'background-repeat: no-repeat;';
            if (parts[2] === 'x') return 'background-repeat: repeat-x;';
            if (parts[2] === 'y') return 'background-repeat: repeat-y;';
            if (parts[2] === 'round') return 'background-repeat: round;';
            if (parts[2] === 'space') return 'background-repeat: space;';
        }
        if (parts[1] === 'size') {
            if (parts[2] === 'auto') return 'background-size: auto;';
            if (parts[2] === 'cover') return 'background-size: cover;';
            if (parts[2] === 'contain') return 'background-size: contain;';
        }
        if (parts[1] === 'center') return 'background-position: center;';
        if (parts[1] === 'top') return 'background-position: top;';
        if (parts[1] === 'bottom') return 'background-position: bottom;';
        if (parts[1] === 'left') {
            if (parts[2] === 'top') return 'background-position: left top;';
            if (parts[2] === 'bottom') return 'background-position: left bottom;';
            return 'background-position: left;';
        }
        if (parts[1] === 'right') {
            if (parts[2] === 'top') return 'background-position: right top;';
            if (parts[2] === 'bottom') return 'background-position: right bottom;';
            return 'background-position: right;';
        }
        if (parts[1] === 'none') return 'background-image: none;';
        if (parts[1] === 'gradient' && parts[2] === 'to') {
            const dir = parts[3];
            let gradientDir = '';
            if (dir === 't') gradientDir = 'to top';
            if (dir === 'tr') gradientDir = 'to top right';
            if (dir === 'r') gradientDir = 'to right';
            if (dir === 'br') gradientDir = 'to bottom right';
            if (dir === 'b') gradientDir = 'to bottom';
            if (dir === 'bl') gradientDir = 'to bottom left';
            if (dir === 'l') gradientDir = 'to left';
            if (dir === 'tl') gradientDir = 'to top left';
            return `background-image: linear-gradient(${gradientDir}, var(--tw-gradient-stops));`;
        }
    }
    if (first === 'from') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `--tw-gradient-from: ${color};\n--tw-gradient-to: ...;\n--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);`;
    }
    if (first === 'to') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `--tw-gradient-to: ${color};`;
    }
    if (first === 'via') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `--tw-gradient-stops: var(--tw-gradient-from), ${color}, var(--tw-gradient-to);`;
    }

    // Borders
    if (first === 'rounded') {
        const rest = parts.slice(1).join('-');
        if (rest === '') return `border-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        const val = BORDER_RADIUS_MAP[rest];
        if (val) return `border-radius: ${val};`;
        if (rest === 's') return `border-start-start-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-end-start-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'e') return `border-start-end-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-end-end-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 't') return `border-top-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-top-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'r') return `border-top-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-bottom-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'b') return `border-bottom-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-bottom-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'l') return `border-top-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};\nborder-bottom-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'tl') return `border-top-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'tr') return `border-top-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'br') return `border-bottom-right-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'bl') return `border-bottom-left-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'ss') return `border-start-start-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'se') return `border-start-end-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'es') return `border-end-start-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        if (rest === 'ee') return `border-end-end-radius: ${BORDER_RADIUS_MAP['DEFAULT']};`;
        // rounded-* with size
        const size = BORDER_RADIUS_MAP[rest.split('-').pop() || ''];
        if (size && rest.includes('-')) {
            const sub = rest.split('-')[0];
            if (sub === 's') return `border-start-start-radius: ${size};\nborder-end-start-radius: ${size};`;
            if (sub === 'e') return `border-start-end-radius: ${size};\nborder-end-end-radius: ${size};`;
            if (sub === 't') return `border-top-left-radius: ${size};\nborder-top-right-radius: ${size};`;
            if (sub === 'r') return `border-top-right-radius: ${size};\nborder-bottom-right-radius: ${size};`;
            if (sub === 'b') return `border-bottom-right-radius: ${size};\nborder-bottom-left-radius: ${size};`;
            if (sub === 'l') return `border-top-left-radius: ${size};\nborder-bottom-left-radius: ${size};`;
            if (sub === 'tl') return `border-top-left-radius: ${size};`;
            if (sub === 'tr') return `border-top-right-radius: ${size};`;
            if (sub === 'br') return `border-bottom-right-radius: ${size};`;
            if (sub === 'bl') return `border-bottom-left-radius: ${size};`;
        }
    }
    if (first === 'border') {
        if (parts[1] === undefined) return 'border-width: 1px;';
        // border color
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `border-color: ${color};`;
        if (parts[1] === 'solid') return 'border-style: solid;';
        if (parts[1] === 'dashed') return 'border-style: dashed;';
        if (parts[1] === 'dotted') return 'border-style: dotted;';
        if (parts[1] === 'double') return 'border-style: double;';
        if (parts[1] === 'hidden') return 'border-style: hidden;';
        if (parts[1] === 'none') return 'border-style: none;';
        if (parts[1] === 'collapse') return 'border-collapse: collapse;';
        if (parts[1] === 'separate') return 'border-collapse: separate;';
        if (parts[1] === 'spacing') {
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-spacing: ${val} ${val};`;
        }
        if (parts[1] === 'x') {
            if (parts[2] === undefined) return 'border-left-width: 1px;\nborder-right-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-left-width: ${val};\nborder-right-width: ${val};`;
        }
        if (parts[1] === 'y') {
            if (parts[2] === undefined) return 'border-top-width: 1px;\nborder-bottom-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-top-width: ${val};\nborder-bottom-width: ${val};`;
        }
        if (parts[1] === 's') {
            if (parts[2] === undefined) return 'border-inline-start-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-inline-start-width: ${val};`;
        }
        if (parts[1] === 'e') {
            if (parts[2] === undefined) return 'border-inline-end-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-inline-end-width: ${val};`;
        }
        if (parts[1] === 't') {
            if (parts[2] === undefined) return 'border-top-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-top-width: ${val};`;
        }
        if (parts[1] === 'r') {
            if (parts[2] === undefined) return 'border-right-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-right-width: ${val};`;
        }
        if (parts[1] === 'b') {
            if (parts[2] === undefined) return 'border-bottom-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-bottom-width: ${val};`;
        }
        if (parts[1] === 'l') {
            if (parts[2] === undefined) return 'border-left-width: 1px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `border-left-width: ${val};`;
        }
        if (!isNaN(Number(parts[1]))) return `border-width: ${parts[1]}px;`;
        const sp = getSpacing(parts[1]);
        if (sp) return `border-width: ${sp};`;
    }
    if (first === 'divide') {
        if (parts[1] === 'x') {
            if (parts[2] === undefined) {
                return '& > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-x-reverse: 0;\n  border-right-width: calc(1px * var(--tw-divide-x-reverse));\n  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));\n}';
            }
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) {
                return `& > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-x-reverse: 0;\n  border-right-width: calc(${val} * var(--tw-divide-x-reverse));\n  border-left-width: calc(${val} * calc(1 - var(--tw-divide-x-reverse)));\n}`;
            }
            if (parts[2] === 'reverse') return '--tw-divide-x-reverse: 1;';
        }
        if (parts[1] === 'y') {
            if (parts[2] === undefined) {
                return '& > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}';
            }
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) {
                return `& > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(${val} * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(${val} * var(--tw-divide-y-reverse));\n}`;
            }
            if (parts[2] === 'reverse') return '--tw-divide-y-reverse: 1;';
        }
        if (parts[1] === 'solid') return '& > :not([hidden]) ~ :not([hidden]) { border-style: solid; }';
        if (parts[1] === 'dashed') return '& > :not([hidden]) ~ :not([hidden]) { border-style: dashed; }';
        if (parts[1] === 'dotted') return '& > :not([hidden]) ~ :not([hidden]) { border-style: dotted; }';
        if (parts[1] === 'double') return '& > :not([hidden]) ~ :not([hidden]) { border-style: double; }';
        if (parts[1] === 'none') return '& > :not([hidden]) ~ :not([hidden]) { border-style: none; }';
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `& > :not([hidden]) ~ :not([hidden]) { border-color: ${color}; }`;
    }
    if (first === 'outline') {
        if (parts[1] === undefined) return 'outline-style: solid;';
        if (parts[1] === 'none') return 'outline: 2px solid transparent;\noutline-offset: 2px;';
        if (parts[1] === 'dashed') return 'outline-style: dashed;';
        if (parts[1] === 'dotted') return 'outline-style: dotted;';
        if (parts[1] === 'double') return 'outline-style: double;';
        if (parts[1] === 'hidden') return 'outline-style: hidden;';
        if (parts[1] === 'offset') {
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `outline-offset: ${val};`;
            if (parts[2] === undefined) return 'outline-offset: 2px;';
        }
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) return `outline-width: ${val};`;
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `outline-color: ${color};`;
    }
    if (first === 'ring') {
        if (parts[1] === undefined) {
            return `--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);\nbox-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);`;
        }
        if (parts[1] === 'inset') return '--tw-ring-inset: inset;';
        if (parts[1] === 'offset') {
            if (parts[2] === undefined) return '--tw-ring-offset-width: 2px;';
            const val = getSpacing(parts.slice(2).join('-'));
            if (val) return `--tw-ring-offset-width: ${val};`;
            const color = getColor(parts.slice(2).join('-'));
            if (color) return `--tw-ring-offset-color: ${color};`;
        }
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) return `--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(${val} + var(--tw-ring-offset-width)) var(--tw-ring-color);`;
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `--tw-ring-color: ${color};`;
    }

    // Effects
    if (first === 'shadow') {
        if (parts[1] === undefined || parts[1] === 'DEFAULT') return 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);';
        if (parts[1] === 'sm') return 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);';
        if (parts[1] === 'md') return 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);';
        if (parts[1] === 'lg') return 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);';
        if (parts[1] === 'xl') return 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);';
        if (parts[1] === '2xl') return 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);';
        if (parts[1] === 'inner') return 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);';
        if (parts[1] === 'none') return 'box-shadow: 0 0 #0000;';
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `--tw-shadow-color: ${color};`;
    }
    if (first === 'opacity') {
        const val = parts[1];
        if (!isNaN(Number(val))) {
            const num = parseInt(val, 10);
            if (num >= 0 && num <= 100) return `opacity: ${num / 100};`;
        }
        if (val && val.startsWith('[') && val.endsWith(']')) {
            return `opacity: ${val.slice(1, -1)};`;
        }
    }
    if (first === 'mix' && parts[1] === 'blend') {
        if (parts[2] === 'normal') return 'mix-blend-mode: normal;';
        if (parts[2] === 'multiply') return 'mix-blend-mode: multiply;';
        if (parts[2] === 'screen') return 'mix-blend-mode: screen;';
        if (parts[2] === 'overlay') return 'mix-blend-mode: overlay;';
        if (parts[2] === 'darken') return 'mix-blend-mode: darken;';
        if (parts[2] === 'lighten') return 'mix-blend-mode: lighten;';
        if (parts[2] === 'color' && parts[3] === 'dodge') return 'mix-blend-mode: color-dodge;';
        if (parts[2] === 'color' && parts[3] === 'burn') return 'mix-blend-mode: color-burn;';
        if (parts[2] === 'hard' && parts[3] === 'light') return 'mix-blend-mode: hard-light;';
        if (parts[2] === 'soft' && parts[3] === 'light') return 'mix-blend-mode: soft-light;';
        if (parts[2] === 'difference') return 'mix-blend-mode: difference;';
        if (parts[2] === 'exclusion') return 'mix-blend-mode: exclusion;';
        if (parts[2] === 'hue') return 'mix-blend-mode: hue;';
        if (parts[2] === 'saturation') return 'mix-blend-mode: saturation;';
        if (parts[2] === 'color') return 'mix-blend-mode: color;';
        if (parts[2] === 'luminosity') return 'mix-blend-mode: luminosity;';
        if (parts[2] === 'plus' && parts[3] === 'darker') return 'mix-blend-mode: plus-darker;';
        if (parts[2] === 'plus' && parts[3] === 'lighter') return 'mix-blend-mode: plus-lighter;';
    }
    if (first === 'bg' && parts[1] === 'blend') {
        if (parts[2] === 'normal') return 'background-blend-mode: normal;';
        if (parts[2] === 'multiply') return 'background-blend-mode: multiply;';
        if (parts[2] === 'screen') return 'background-blend-mode: screen;';
        if (parts[2] === 'overlay') return 'background-blend-mode: overlay;';
        if (parts[2] === 'darken') return 'background-blend-mode: darken;';
        if (parts[2] === 'lighten') return 'background-blend-mode: lighten;';
        if (parts[2] === 'color' && parts[3] === 'dodge') return 'background-blend-mode: color-dodge;';
        if (parts[2] === 'color' && parts[3] === 'burn') return 'background-blend-mode: color-burn;';
        if (parts[2] === 'hard' && parts[3] === 'light') return 'background-blend-mode: hard-light;';
        if (parts[2] === 'soft' && parts[3] === 'light') return 'background-blend-mode: soft-light;';
        if (parts[2] === 'difference') return 'background-blend-mode: difference;';
        if (parts[2] === 'exclusion') return 'background-blend-mode: exclusion;';
        if (parts[2] === 'hue') return 'background-blend-mode: hue;';
        if (parts[2] === 'saturation') return 'background-blend-mode: saturation;';
        if (parts[2] === 'color') return 'background-blend-mode: color;';
        if (parts[2] === 'luminosity') return 'background-blend-mode: luminosity;';
    }

    // Transforms
    if (first === 'transform') {
        if (parts[1] === undefined) return 'transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));';
        if (parts[1] === 'cpu') return 'transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));';
        if (parts[1] === 'gpu') return 'transform: translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));';
        if (parts[1] === 'none') return 'transform: none;';
    }
    if (first === 'origin') {
        if (parts[1] === 'center') return 'transform-origin: center;';
        if (parts[1] === 'top') return 'transform-origin: top;';
        if (parts[1] === 'top' && parts[2] === 'right') return 'transform-origin: top right;';
        if (parts[1] === 'right') return 'transform-origin: right;';
        if (parts[1] === 'bottom' && parts[2] === 'right') return 'transform-origin: bottom right;';
        if (parts[1] === 'bottom') return 'transform-origin: bottom;';
        if (parts[1] === 'bottom' && parts[2] === 'left') return 'transform-origin: bottom left;';
        if (parts[1] === 'left') return 'transform-origin: left;';
        if (parts[1] === 'top' && parts[2] === 'left') return 'transform-origin: top left;';
    }
    if (first === 'translate') {
        if (parts[1] === 'x') {
            const val = getSize(parts.slice(2).join('-'));
            if (val) return `--tw-translate-x: ${val};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (parts[2] === 'full') return `--tw-translate-x: 100%;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
        if (parts[1] === 'y') {
            const val = getSize(parts.slice(2).join('-'));
            if (val) return `--tw-translate-y: ${val};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (parts[2] === 'full') return `--tw-translate-y: 100%;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
    }
    if (first === 'rotate') {
        const val = parts.slice(1).join('-');
        if (!isNaN(Number(val))) return `--tw-rotate: ${val}deg;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        if (val.startsWith('[') && val.endsWith(']')) {
            return `--tw-rotate: ${val.slice(1, -1)};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
    }
    if (first === 'skew') {
        if (parts[1] === 'x') {
            const val = parts.slice(2).join('-');
            if (!isNaN(Number(val))) return `--tw-skew-x: ${val}deg;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (val.startsWith('[') && val.endsWith(']')) return `--tw-skew-x: ${val.slice(1, -1)};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
        if (parts[1] === 'y') {
            const val = parts.slice(2).join('-');
            if (!isNaN(Number(val))) return `--tw-skew-y: ${val}deg;\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (val.startsWith('[') && val.endsWith(']')) return `--tw-skew-y: ${val.slice(1, -1)};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
    }
    if (first === 'scale') {
        if (parts[1] === 'x') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `--tw-scale-x: ${Number(val) / 100};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (val.startsWith('[') && val.endsWith(']')) return `--tw-scale-x: ${val.slice(1, -1)};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
        if (parts[1] === 'y') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `--tw-scale-y: ${Number(val) / 100};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
            if (val.startsWith('[') && val.endsWith(']')) return `--tw-scale-y: ${val.slice(1, -1)};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
        if (parts[1] === undefined || (!isNaN(Number(parts[1])))) {
            const val = parts[1] || '100';
            const num = Number(val) / 100;
            return `--tw-scale-x: ${num};\n--tw-scale-y: ${num};\ntransform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`;
        }
    }

    // Transitions
    if (first === 'transition') {
        if (parts[1] === undefined || parts[1] === 'all') return 'transition-property: all;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-duration: 150ms;';
        if (parts[1] === 'none') return 'transition-property: none;';
        if (parts[1] === 'colors') return 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-duration: 150ms;';
        if (parts[1] === 'opacity') return 'transition-property: opacity;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-duration: 150ms;';
        if (parts[1] === 'shadow') return 'transition-property: box-shadow;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-duration: 150ms;';
        if (parts[1] === 'transform') return 'transition-property: transform;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-duration: 150ms;';
    }
    if (first === 'duration') {
        if (!isNaN(Number(parts[1]))) return `transition-duration: ${parts[1]}ms;`;
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) return `transition-duration: ${parts[1].slice(1, -1)};`;
    }
    if (first === 'ease') {
        if (parts[1] === 'linear') return 'transition-timing-function: linear;';
        if (parts[1] === 'in') return 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);';
        if (parts[1] === 'out') return 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);';
        if (parts[1] === 'in' && parts[2] === 'out') return 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);';
    }
    if (first === 'delay') {
        if (!isNaN(Number(parts[1]))) return `transition-delay: ${parts[1]}ms;`;
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) return `transition-delay: ${parts[1].slice(1, -1)};`;
    }
    if (first === 'animate') {
        if (parts[1] === 'none') return 'animation: none;';
        if (parts[1] === 'spin') return 'animation: spin 1s linear infinite;';
        if (parts[1] === 'ping') return 'animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;';
        if (parts[1] === 'pulse') return 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;';
        if (parts[1] === 'bounce') return 'animation: bounce 1s infinite;';
    }

    // Filters
    if (first === 'blur') {
        if (parts[1] === undefined) return 'filter: blur(8px);';
        if (parts[1] === 'sm') return 'filter: blur(4px);';
        if (parts[1] === 'md') return 'filter: blur(12px);';
        if (parts[1] === 'lg') return 'filter: blur(16px);';
        if (parts[1] === 'xl') return 'filter: blur(24px);';
        if (parts[1] === '2xl') return 'filter: blur(40px);';
        if (parts[1] === '3xl') return 'filter: blur(64px);';
        if (parts[1] === 'none') return 'filter: none;';
        if (parts[1] && parts[1].startsWith('[') && parts[1].endsWith(']')) return `filter: blur(${parts[1].slice(1, -1)});`;
    }
    if (first === 'brightness') {
        const val = parts[1];
        if (!isNaN(Number(val))) return `filter: brightness(${Number(val) / 100});`;
        if (val && val.startsWith('[') && val.endsWith(']')) return `filter: brightness(${val.slice(1, -1)});`;
    }
    if (first === 'contrast') {
        const val = parts[1];
        if (!isNaN(Number(val))) return `filter: contrast(${Number(val) / 100});`;
        if (val && val.startsWith('[') && val.endsWith(']')) return `filter: contrast(${val.slice(1, -1)});`;
    }
    if (first === 'drop' && parts[1] === 'shadow') {
        if (parts[2] === undefined || parts[2] === 'sm') return 'filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));';
        if (parts[2] === 'DEFAULT' || parts[2] === undefined) return 'filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));';
        if (parts[2] === 'md') return 'filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));';
        if (parts[2] === 'lg') return 'filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));';
        if (parts[2] === 'xl') return 'filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));';
        if (parts[2] === '2xl') return 'filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));';
        if (parts[2] === 'none') return 'filter: drop-shadow(0 0 #0000);';
    }
    if (first === 'grayscale') {
        const val = parts[1];
        if (val === undefined || val === '0') return 'filter: grayscale(0);';
        if (val === '') return 'filter: grayscale(1);';
        if (!isNaN(Number(val))) return `filter: grayscale(${Number(val) / 100});`;
    }
    if (first === 'hue' && parts[1] === 'rotate') {
        const val = parts[2];
        if (!isNaN(Number(val))) return `filter: hue-rotate(${val}deg);`;
        if (val && val.startsWith('[') && val.endsWith(']')) return `filter: hue-rotate(${val.slice(1, -1)});`;
    }
    if (first === 'invert') {
        const val = parts[1];
        if (val === undefined || val === '0') return 'filter: invert(0);';
        if (val === '') return 'filter: invert(1);';
        if (!isNaN(Number(val))) return `filter: invert(${Number(val) / 100});`;
    }
    if (first === 'saturate') {
        const val = parts[1];
        if (!isNaN(Number(val))) return `filter: saturate(${Number(val) / 100});`;
        if (val && val.startsWith('[') && val.endsWith(']')) return `filter: saturate(${val.slice(1, -1)});`;
    }
    if (first === 'sepia') {
        const val = parts[1];
        if (val === undefined || val === '0') return 'filter: sepia(0);';
        if (val === '') return 'filter: sepia(1);';
        if (!isNaN(Number(val))) return `filter: sepia(${Number(val) / 100});`;
    }
    if (first === 'backdrop') {
        if (parts[1] === 'blur') {
            if (parts[2] === undefined) return 'backdrop-filter: blur(8px);';
            if (parts[2] === 'sm') return 'backdrop-filter: blur(4px);';
            if (parts[2] === 'md') return 'backdrop-filter: blur(12px);';
            if (parts[2] === 'lg') return 'backdrop-filter: blur(16px);';
            if (parts[2] === 'xl') return 'backdrop-filter: blur(24px);';
            if (parts[2] === '2xl') return 'backdrop-filter: blur(40px);';
            if (parts[2] === '3xl') return 'backdrop-filter: blur(64px);';
            if (parts[2] === 'none') return 'backdrop-filter: none;';
            if (parts[2] && parts[2].startsWith('[') && parts[2].endsWith(']')) return `backdrop-filter: blur(${parts[2].slice(1, -1)});`;
        }
        if (parts[1] === 'brightness') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `backdrop-filter: brightness(${Number(val) / 100});`;
            if (val && val.startsWith('[') && val.endsWith(']')) return `backdrop-filter: brightness(${val.slice(1, -1)});`;
        }
        if (parts[1] === 'contrast') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `backdrop-filter: contrast(${Number(val) / 100});`;
            if (val && val.startsWith('[') && val.endsWith(']')) return `backdrop-filter: contrast(${val.slice(1, -1)});`;
        }
        if (parts[1] === 'grayscale') {
            const val = parts[2];
            if (val === undefined || val === '0') return 'backdrop-filter: grayscale(0);';
            if (val === '') return 'backdrop-filter: grayscale(1);';
            if (!isNaN(Number(val))) return `backdrop-filter: grayscale(${Number(val) / 100});`;
        }
        if (parts[1] === 'hue' && parts[2] === 'rotate') {
            const val = parts[3];
            if (!isNaN(Number(val))) return `backdrop-filter: hue-rotate(${val}deg);`;
            if (val && val.startsWith('[') && val.endsWith(']')) return `backdrop-filter: hue-rotate(${val.slice(1, -1)});`;
        }
        if (parts[1] === 'invert') {
            const val = parts[2];
            if (val === undefined || val === '0') return 'backdrop-filter: invert(0);';
            if (val === '') return 'backdrop-filter: invert(1);';
            if (!isNaN(Number(val))) return `backdrop-filter: invert(${Number(val) / 100});`;
        }
        if (parts[1] === 'opacity') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `backdrop-filter: opacity(${Number(val) / 100});`;
            if (val && val.startsWith('[') && val.endsWith(']')) return `backdrop-filter: opacity(${val.slice(1, -1)});`;
        }
        if (parts[1] === 'saturate') {
            const val = parts[2];
            if (!isNaN(Number(val))) return `backdrop-filter: saturate(${Number(val) / 100});`;
            if (val && val.startsWith('[') && val.endsWith(']')) return `backdrop-filter: saturate(${val.slice(1, -1)});`;
        }
        if (parts[1] === 'sepia') {
            const val = parts[2];
            if (val === undefined || val === '0') return 'backdrop-filter: sepia(0);';
            if (val === '') return 'backdrop-filter: sepia(1);';
            if (!isNaN(Number(val))) return `backdrop-filter: sepia(${Number(val) / 100});`;
        }
    }

    // Cursor
    if (first === 'cursor') {
        if (parts[1] === 'auto') return 'cursor: auto;';
        if (parts[1] === 'default') return 'cursor: default;';
        if (parts[1] === 'pointer') return 'cursor: pointer;';
        if (parts[1] === 'wait') return 'cursor: wait;';
        if (parts[1] === 'text') return 'cursor: text;';
        if (parts[1] === 'move') return 'cursor: move;';
        if (parts[1] === 'help') return 'cursor: help;';
        if (parts[1] === 'not' && parts[2] === 'allowed') return 'cursor: not-allowed;';
        if (parts[1] === 'none') return 'cursor: none;';
        if (parts[1] === 'context' && parts[2] === 'menu') return 'cursor: context-menu;';
        if (parts[1] === 'progress') return 'cursor: progress;';
        if (parts[1] === 'cell') return 'cursor: cell;';
        if (parts[1] === 'crosshair') return 'cursor: crosshair;';
        if (parts[1] === 'vertical' && parts[2] === 'text') return 'cursor: vertical-text;';
        if (parts[1] === 'alias') return 'cursor: alias;';
        if (parts[1] === 'copy') return 'cursor: copy;';
        if (parts[1] === 'no' && parts[2] === 'drop') return 'cursor: no-drop;';
        if (parts[1] === 'grab') return 'cursor: grab;';
        if (parts[1] === 'grabbing') return 'cursor: grabbing;';
        if (parts[1] === 'all' && parts[2] === 'scroll') return 'cursor: all-scroll;';
        if (parts[1] === 'col' && parts[2] === 'resize') return 'cursor: col-resize;';
        if (parts[1] === 'row' && parts[2] === 'resize') return 'cursor: row-resize;';
        if (parts[1] === 'nwse' && parts[2] === 'resize') return 'cursor: nwse-resize;';
        if (parts[1] === 'nesw' && parts[2] === 'resize') return 'cursor: nesw-resize;';
        if (parts[1] === 'ew' && parts[2] === 'resize') return 'cursor: ew-resize;';
        if (parts[1] === 'ns' && parts[2] === 'resize') return 'cursor: ns-resize;';
        if (parts[1] === 'ne' && parts[2] === 'resize') return 'cursor: ne-resize;';
        if (parts[1] === 'nw' && parts[2] === 'resize') return 'cursor: nw-resize;';
        if (parts[1] === 'se' && parts[2] === 'resize') return 'cursor: se-resize;';
        if (parts[1] === 'sw' && parts[2] === 'resize') return 'cursor: sw-resize;';
        if (parts[1] === 'zoom' && parts[2] === 'in') return 'cursor: zoom-in;';
        if (parts[1] === 'zoom' && parts[2] === 'out') return 'cursor: zoom-out;';
    }

    // Pointer events / user-select / resize
    if (first === 'pointer' && parts[1] === 'events') {
        if (parts[2] === 'auto') return 'pointer-events: auto;';
        if (parts[2] === 'none') return 'pointer-events: none;';
    }
    if (first === 'resize') {
        if (parts[1] === undefined) return 'resize: both;';
        if (parts[1] === 'none') return 'resize: none;';
        if (parts[1] === 'y') return 'resize: vertical;';
        if (parts[1] === 'x') return 'resize: horizontal;';
    }
    if (first === 'select') {
        if (parts[1] === 'none') return 'user-select: none;';
        if (parts[1] === 'text') return 'user-select: text;';
        if (parts[1] === 'all') return 'user-select: all;';
        if (parts[1] === 'auto') return 'user-select: auto;';
    }
    if (first === 'touch' && parts[1] === 'action') {
        if (parts[2] === 'auto') return 'touch-action: auto;';
        if (parts[2] === 'none') return 'touch-action: none;';
        if (parts[2] === 'pan' && parts[3] === 'x') return 'touch-action: pan-x;';
        if (parts[2] === 'pan' && parts[3] === 'left') return 'touch-action: pan-left;';
        if (parts[2] === 'pan' && parts[3] === 'right') return 'touch-action: pan-right;';
        if (parts[2] === 'pan' && parts[3] === 'y') return 'touch-action: pan-y;';
        if (parts[2] === 'pan' && parts[3] === 'up') return 'touch-action: pan-up;';
        if (parts[2] === 'pan' && parts[3] === 'down') return 'touch-action: pan-down;';
        if (parts[2] === 'pinch' && parts[3] === 'zoom') return 'touch-action: pinch-zoom;';
        if (parts[2] === 'manipulation') return 'touch-action: manipulation;';
    }
    if (first === 'scroll' && parts[1] === 'behavior') {
        if (parts[2] === 'auto') return 'scroll-behavior: auto;';
        if (parts[2] === 'smooth') return 'scroll-behavior: smooth;';
    }
    if (first === 'snap' && parts[1] === 'align') {
        if (parts[2] === 'none') return 'scroll-snap-align: none;';
        if (parts[2] === 'start') return 'scroll-snap-align: start;';
        if (parts[2] === 'end') return 'scroll-snap-align: end;';
        if (parts[2] === 'center') return 'scroll-snap-align: center;';
    }
    if (first === 'snap' && parts[1] === 'start') {
        if (parts[2] === 'normal') return 'scroll-snap-type: x mandatory;';
        if (parts[2] === 'always') return 'scroll-snap-type: x proximity;';
    }
    if (first === 'snap' && parts[1] === 'stop') {
        if (parts[2] === 'normal') return 'scroll-snap-stop: normal;';
        if (parts[2] === 'always') return 'scroll-snap-stop: always;';
    }

    // List style
    if (first === 'list') {
        if (parts[1] === 'none') return 'list-style-type: none;';
        if (parts[1] === 'disc') return 'list-style-type: disc;';
        if (parts[1] === 'decimal') return 'list-style-type: decimal;';
        if (parts[1] === 'image' && parts[2] === 'none') return 'list-style-image: none;';
        if (parts[1] === 'inside') return 'list-style-position: inside;';
        if (parts[1] === 'outside') return 'list-style-position: outside;';
    }

    // Fill / Stroke
    if (first === 'fill') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `fill: ${color};`;
        if (parts[1] === 'none') return 'fill: none;';
        if (parts[1] === 'current') return 'fill: currentColor;';
    }
    if (first === 'stroke') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `stroke: ${color};`;
        if (parts[1] === 'none') return 'stroke: none;';
        if (parts[1] === 'current') return 'stroke: currentColor;';
        if (!isNaN(Number(parts[1]))) return `stroke-width: ${parts[1]};`;
    }

    // Screen readers
    if (first === 'sr' && parts[1] === 'only') return 'position: absolute;\nwidth: 1px;\nheight: 1px;\npadding: 0;\nmargin: -1px;\noverflow: hidden;\nclip: rect(0, 0, 0, 0);\nwhite-space: nowrap;\nborder-width: 0;';
    if (first === 'not' && parts[1] === 'sr' && parts[2] === 'only') return 'position: static;\nwidth: auto;\nheight: auto;\npadding: 0;\nmargin: 0;\noverflow: visible;\nclip: auto;\nwhite-space: normal;';

    // Order
    if (first === 'order') {
        const val = parts[1];
        if (!isNaN(Number(val))) return `order: ${val};`;
        if (val === 'first') return 'order: -9999;';
        if (val === 'last') return 'order: 9999;';
        if (val === 'none') return 'order: 0;';
        if (val && val.startsWith('[') && val.endsWith(']')) return `order: ${val.slice(1, -1)};`;
    }

    // Grid col/row span/start/end
    if (first === 'col') {
        if (parts[1] === 'auto') return 'grid-column: auto;';
        if (parts[1] === 'span') {
            if (!isNaN(Number(parts[2]))) return `grid-column: span ${parts[2]} / span ${parts[2]};`;
            if (parts[2] === 'full') return 'grid-column: 1 / -1;';
        }
        if (parts[1] === 'start') {
            if (!isNaN(Number(parts[2]))) return `grid-column-start: ${parts[2]};`;
            if (parts[2] === 'auto') return 'grid-column-start: auto;';
        }
        if (parts[1] === 'end') {
            if (!isNaN(Number(parts[2]))) return `grid-column-end: ${parts[2]};`;
            if (parts[2] === 'auto') return 'grid-column-end: auto;';
        }
    }
    if (first === 'row') {
        if (parts[1] === 'auto') return 'grid-row: auto;';
        if (parts[1] === 'span') {
            if (!isNaN(Number(parts[2]))) return `grid-row: span ${parts[2]} / span ${parts[2]};`;
            if (parts[2] === 'full') return 'grid-row: 1 / -1;';
        }
        if (parts[1] === 'start') {
            if (!isNaN(Number(parts[2]))) return `grid-row-start: ${parts[2]};`;
            if (parts[2] === 'auto') return 'grid-row-start: auto;';
        }
        if (parts[1] === 'end') {
            if (!isNaN(Number(parts[2]))) return `grid-row-end: ${parts[2]};`;
            if (parts[2] === 'auto') return 'grid-row-end: auto;';
        }
    }

    // Isolation
    if (first === 'isolate') return 'isolation: isolate;';
    if (first === 'isolation' && parts[1] === 'auto') return 'isolation: auto;';

    // Accent color
    if (first === 'accent') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `accent-color: ${color};`;
        if (parts[1] === 'auto') return 'accent-color: auto;';
    }

    // Appearance
    if (first === 'appearance') {
        if (parts[1] === 'none') return 'appearance: none;';
        if (parts[1] === 'auto') return 'appearance: auto;';
    }

    // Caret color
    if (first === 'caret') {
        const color = getColor(parts.slice(1).join('-'));
        if (color) return `caret-color: ${color};`;
        if (parts[1] === 'auto') return 'caret-color: auto;';
    }

    // Scroll margin / padding
    const SCROLL_MARGIN_PROPS: Record<string, string> = {
        'scroll-m': 'scroll-margin',
        'scroll-mx': 'scroll-margin-left,scroll-margin-right',
        'scroll-my': 'scroll-margin-top,scroll-margin-bottom',
        'scroll-mt': 'scroll-margin-top',
        'scroll-mr': 'scroll-margin-right',
        'scroll-mb': 'scroll-margin-bottom',
        'scroll-ml': 'scroll-margin-left',
        'scroll-ms': 'scroll-margin-inline-start',
        'scroll-me': 'scroll-margin-inline-end',
    };
    if (SCROLL_MARGIN_PROPS[first] !== undefined) {
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) {
            const props = SCROLL_MARGIN_PROPS[first].split(',');
            return props.map(p => `${p}: ${val};`).join('\n');
        }
    }
    const SCROLL_PADDING_PROPS: Record<string, string> = {
        'scroll-p': 'scroll-padding',
        'scroll-px': 'scroll-padding-left,scroll-padding-right',
        'scroll-py': 'scroll-padding-top,scroll-padding-bottom',
        'scroll-pt': 'scroll-padding-top',
        'scroll-pr': 'scroll-padding-right',
        'scroll-pb': 'scroll-padding-bottom',
        'scroll-pl': 'scroll-padding-left',
        'scroll-ps': 'scroll-padding-inline-start',
        'scroll-pe': 'scroll-padding-inline-end',
    };
    if (SCROLL_PADDING_PROPS[first] !== undefined) {
        const val = getSpacing(parts.slice(1).join('-'));
        if (val) {
            const props = SCROLL_PADDING_PROPS[first].split(',');
            return props.map(p => `${p}: ${val};`).join('\n');
        }
    }

    // Stroke dash / linecap / linejoin
    if (first === 'stroke' && parts[1] === 'dash') {
        if (parts[2] === undefined) return 'stroke-dasharray: 1 3;';
        if (!isNaN(Number(parts[2]))) return `stroke-dasharray: ${parts[2]} ${Number(parts[2]) * 2};`;
    }
    if (first === 'stroke' && parts[1] === 'linecap') {
        if (parts[2] === 'butt') return 'stroke-linecap: butt;';
        if (parts[2] === 'round') return 'stroke-linecap: round;';
        if (parts[2] === 'square') return 'stroke-linecap: square;';
    }
    if (first === 'stroke' && parts[1] === 'linejoin') {
        if (parts[2] === 'miter') return 'stroke-linejoin: miter;';
        if (parts[2] === 'round') return 'stroke-linejoin: round;';
        if (parts[2] === 'bevel') return 'stroke-linejoin: bevel;';
    }
    if (first === 'stroke' && parts[1] === 'opacity') {
        const val = parts[2];
        if (!isNaN(Number(val))) return `stroke-opacity: ${Number(val) / 100};`;
    }

    // Fill opacity
    if (first === 'fill' && parts[1] === 'opacity') {
        const val = parts[2];
        if (!isNaN(Number(val))) return `fill-opacity: ${Number(val) / 100};`;
    }

    // Stroke offset
    if (first === 'stroke' && parts[1] === 'offset') {
        const val = parts[2];
        if (!isNaN(Number(val))) return `stroke-dashoffset: ${val};`;
    }

    // Table layout
    if (first === 'table' && parts[1] === 'auto') return 'table-layout: auto;';
    if (first === 'table' && parts[1] === 'fixed') return 'table-layout: fixed;';

    // Caption side
    if (first === 'caption') {
        if (parts[1] === 'top') return 'caption-side: top;';
        if (parts[1] === 'bottom') return 'caption-side: bottom;';
    }

    // Empty cells
    if (first === 'empty' && parts[1] === 'cells') {
        if (parts[2] === 'show') return 'empty-cells: show;';
        if (parts[2] === 'hide') return 'empty-cells: hide;';
    }

    // Visibility / display extras
    if (first === 'contents') return 'display: contents;';
    if (first === 'flow' && parts[1] === 'root') return 'display: flow-root;';
    if (first === 'list' && parts[1] === 'item') return 'display: list-item;';

    // Print
    if (first === 'print') {
        if (parts[1] === 'visible') return 'print-color-adjust: economy;';
        if (parts[1] === 'exact') return 'print-color-adjust: exact;';
    }

    return undefined;
}
