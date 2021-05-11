import { BaseEntity } from '../../../entities/base.entity';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../validators/is-unique.validators';

export function IsUniqueValidators(
    entity: BaseEntity,
    column: string,
    validationOptions?: ValidationOptions,
) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function(object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, column],
            validator: IsUniqueConstraint,
        });
    };
};
