export interface Hierarchy<T = unknown> {
    label?: string;
    children?: T[] | Hierarchy[];
}
