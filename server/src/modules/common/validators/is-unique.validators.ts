import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

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
