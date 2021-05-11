export class BaseEntity {
    constructor(partial: Partial<BaseEntity>) {
        Object.assign(this, partial);
    }
}
