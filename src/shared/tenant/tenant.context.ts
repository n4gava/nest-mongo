export abstract class TenantContext {

    private _tenantId: string = "";

    public get tenantId(): string {
        return this._tenantId;
    }

    public setTenant(tenant: string) {
        this._tenantId = tenant;
    }
}