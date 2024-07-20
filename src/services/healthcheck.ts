import { DataSource, MigrationExecutor } from 'typeorm';

export class HealthcheckService {
    private dataSource: DataSource;

    private migrationExecutor: MigrationExecutor;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.migrationExecutor = new MigrationExecutor(dataSource, dataSource.createQueryRunner('master'));
    }

    async isDBReady(): Promise<boolean> {
        if (!this.dataSource.isInitialized) {
            return false;
        }

        const pendingMigrations = await this.migrationExecutor.getPendingMigrations();
        return pendingMigrations.length === 0;
    }
}
