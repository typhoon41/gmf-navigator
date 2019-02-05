declare module Gmf {
    export const IoC: {
        Injectable: Function;
        Injector: Injector;
    }

    export interface Injector {
        resolve<T>(target: Type<T>): T;
    }

    export interface Type<T> {
        new(...args: object[]): T;
    }
}