export function Table <T extends { new(...args: any[]): {} }> (constructor: T) {
    return class extends constructor {
        getTable = () => constructor.name.toLocaleLowerCase()
    }
}


export function Validate(isRequired: boolean) {
    return (target: any, propertyKey: string) => {
        let value = target[propertyKey];
        const getter = function () {
            if ((!value || value == "") && isRequired) {
                throw new Error(`Lib_Error: ${propertyKey} is required`);
            }

            return value;
        };

        const setter = function (next: any) {
            value = next;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
            configurable: true,
        });
    };
}






