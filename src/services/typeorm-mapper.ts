import { EntityMetadata } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

// Maps a raw object to a TypeORM entity. No idea why TypeORM doesn't provide such a basic feature but here we go...
export class TypeORMMapper<T> {
    readonly columnFromDbName: Map<string, ColumnMetadata>;

    constructor(entityMetadata: EntityMetadata) {
        this.columnFromDbName = new Map();
        entityMetadata.columns.forEach((column) => {
            this.columnFromDbName.set(column.databaseName, column);
        });
    }

    /**
     * Map a raw entity to a TypeORM entity. Basically converts field names from DB
     * names to JS property names using the entity metadata.
     * Unknown fields are ignored.
     * @param rawEntity the raw entity to convert.
     * @param aliasPrefix the alias prefix, if any, that is used as a prefix to all field in the raw entity.
     * @returns the mapped JS entity object.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public mapRawEntity(rawEntity: any, aliasPrefix = ''): T {
        const target: Record<string, unknown> = {};

        Object.entries(rawEntity).forEach(([k, v]) => {
            let key = k;
            if (aliasPrefix.length > 0) {
                const prefix = aliasPrefix + '_';
                if (!key.startsWith(prefix)) {
                    return;
                }
                key = key.substring(prefix.length);
            }
            const column = this.columnFromDbName.get(key);
            if (column !== undefined) {
                target[column.propertyName] = v;
            }
        });

        return target as T;
    }
}
