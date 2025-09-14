export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      constructor(
        public name: string,
        public email: string,
        public isSuperAdmin: boolean = false
      ) {}

      toggleSuperAdmin(): void {
        this.isSuperAdmin = !this.isSuperAdmin;
      }

      getInfo(): string {
        return `${this.name} (${this.email}) - SuperAdmin: ${this.isSuperAdmin}`;
      }
    }
  }
}
