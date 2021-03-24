import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { BaseEntity } from '../../database/entities/base.entity';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const [entity, column] = args.constraints;

        const repository = getRepository(entity);
        const result = await repository.findOne({ where: { [column]: value } });

        if (result) return false;

        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return `The ${args.constraints[1]} field should be unique.`;
    }
}

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
