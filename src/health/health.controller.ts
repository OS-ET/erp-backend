import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        //TODO: add database health checker once configured!!
        return this.health.check([
            () => this.http.pingCheck('sample required service', 'https://docs.nestjs.com'),
            () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
        ]);
    }
}
