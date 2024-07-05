import { EventType } from 'mitt';
import { default as elementResizeDetectorMaker } from 'element-resize-detector';
import { Layout } from '../../helpers/utils';
export interface Placeholder {
    x: number;
    y: number;
    w: number;
    h: number;
    i: number | string;
}
export interface Props {
    autoSize?: boolean;
    colNum?: number;
    rowHeight?: number;
    maxRows?: number;
    margin?: Array<number>;
    isDraggable?: boolean;
    isResizable?: boolean;
    isMirrored?: boolean;
    isBounded?: boolean;
    useCssTransforms?: boolean;
    verticalCompact?: boolean;
    restoreOnDrag?: boolean;
    layout: Layout;
    responsive?: boolean;
    responsiveLayouts?: {
        [key: string]: any;
    };
    transformScale?: number;
    breakpoints?: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    cols?: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    preventCollision?: boolean;
    useStyleCursor?: boolean;
}
export interface LayoutData {
    width: number | null;
    mergeStyle: {
        [key: string]: string;
    };
    lastLayoutLength: number;
    isDragging: boolean;
    placeholder: Placeholder;
    layouts: {
        [key: string]: Layout | any;
    };
    lastBreakpoint: string | null;
    originalLayout: Layout | null;
    erd: elementResizeDetectorMaker.Erd | null;
    positionsBeforeDrag: {
        [key: string]: string;
    };
    this$refsLayout: HTMLElement;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    autoSize: boolean;
    colNum: number;
    rowHeight: number;
    maxRows: number;
    margin: () => number[];
    isDraggable: boolean;
    isResizable: boolean;
    isMirrored: boolean;
    isBounded: boolean;
    useCssTransforms: boolean;
    verticalCompact: boolean;
    restoreOnDrag: boolean;
    responsive: boolean;
    responsiveLayouts: () => {};
    transformScale: number;
    breakpoints: () => {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    cols: () => {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    preventCollision: boolean;
    useStyleCursor: boolean;
}>, {
    width: import('vue').Ref<number | null>;
    mergeStyle: import('vue').Ref<{
        [key: string]: string;
    }>;
    lastLayoutLength: import('vue').Ref<number>;
    isDragging: import('vue').Ref<boolean>;
    placeholder: import('vue').Ref<{
        x: number;
        y: number;
        w: number;
        h: number;
        i: string | number;
    }>;
    layouts: import('vue').Ref<{
        [key: string]: any;
    }>;
    lastBreakpoint: import('vue').Ref<string | null>;
    originalLayout: import('vue').Ref<{
        w: number;
        h: number;
        x: number;
        y: number;
        i: string;
        minW?: number | undefined;
        minH?: number | undefined;
        maxW?: number | undefined;
        maxH?: number | undefined;
        moved?: boolean | undefined;
        static?: boolean | undefined;
        isDraggable?: boolean | undefined;
        isResizable?: boolean | undefined;
    }[] | null>;
    erd: import('vue').Ref<{
        listenTo: (element: HTMLElement, callback: (elem: HTMLElement) => void) => void;
        removeListener: (element: HTMLElement, callback: (elem: HTMLElement) => void) => void;
        removeAllListeners: (element: HTMLElement) => void;
        uninstall: (element: HTMLElement) => void;
    } | null>;
    defaultGridItem: import('vue').Ref<any>;
    dragEvent: (eventName?: EventType, id?: string | number, x?: number, y?: number, h?: number, w?: number) => void;
    layout: Layout;
    autoSize: boolean;
    colNum: number;
    rowHeight: number;
    maxRows: number;
    margin: number[];
    isDraggable: boolean;
    isResizable: boolean;
    isMirrored: boolean;
    isBounded: boolean;
    useCssTransforms: boolean;
    verticalCompact: boolean;
    restoreOnDrag: boolean;
    responsive: boolean;
    responsiveLayouts: {
        [key: string]: any;
    };
    transformScale: number;
    breakpoints: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    cols: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    preventCollision: boolean;
    useStyleCursor: boolean;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "layout-created": (layout: Layout) => void;
    "layout-before-mount": (layout: Layout) => void;
    "layout-mounted": (layout: Layout) => void;
    "layout-updated": (layout: Layout) => void;
    "layout-ready": (layout: Layout) => void;
    "update:layout": (layout: Layout) => void;
    "breakpoint-changed": (newBreakpoint: string, layout: Layout) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    autoSize: boolean;
    colNum: number;
    rowHeight: number;
    maxRows: number;
    margin: () => number[];
    isDraggable: boolean;
    isResizable: boolean;
    isMirrored: boolean;
    isBounded: boolean;
    useCssTransforms: boolean;
    verticalCompact: boolean;
    restoreOnDrag: boolean;
    responsive: boolean;
    responsiveLayouts: () => {};
    transformScale: number;
    breakpoints: () => {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    cols: () => {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    preventCollision: boolean;
    useStyleCursor: boolean;
}>>> & {
    "onLayout-created"?: ((layout: Layout) => any) | undefined;
    "onLayout-before-mount"?: ((layout: Layout) => any) | undefined;
    "onLayout-mounted"?: ((layout: Layout) => any) | undefined;
    "onLayout-updated"?: ((layout: Layout) => any) | undefined;
    "onLayout-ready"?: ((layout: Layout) => any) | undefined;
    "onUpdate:layout"?: ((layout: Layout) => any) | undefined;
    "onBreakpoint-changed"?: ((newBreakpoint: string, layout: Layout) => any) | undefined;
}, {
    isDraggable: boolean;
    isResizable: boolean;
    isBounded: boolean;
    autoSize: boolean;
    margin: number[];
    responsive: boolean;
    cols: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    colNum: number;
    rowHeight: number;
    maxRows: number;
    transformScale: number;
    useCssTransforms: boolean;
    isMirrored: boolean;
    verticalCompact: boolean;
    restoreOnDrag: boolean;
    responsiveLayouts: {
        [key: string]: any;
    };
    breakpoints: {
        lg: number;
        md: number;
        sm: number;
        xs: number;
        xxs: number;
    };
    preventCollision: boolean;
    useStyleCursor: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
