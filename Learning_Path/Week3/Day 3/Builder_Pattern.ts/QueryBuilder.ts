class QueryBuilder {
  private _table = '';
  private _selects: string[] = [];
  private _wheres: string[] = [];
  private _orderBy: string[] = [];
  private _limit? : number;
  private _offste?: number;
  private _joins: string[]= [];

  from(table: string): this {
    this._table = table;
    return this;
  }

  select(...columns: string[]): this {
    this._selects.push(...columns);
    return this;
  }

  where(condition: string): this {
    this._wheres.push(condition);
    return this;
  }

  orderBy(column: string, dir: "ASC" | "DESC" = "ASC"): this {
    this._orderBy.push(`${column} ${dir}`);
    return this;
  }

  limit(n: number): this {
    this._limit = n; 
    return this;
  }
  
  offset(n: number): this {
    this._offste = n;
    return this;
  }

  join(table: string, on: string): this {
    this._joins.push(`JOIN ${table} ON ${on}`)
    return this;
  }

  build(): string {
    if (!this._table) throw new Error("Table is required");

    const cols = this._selects.length > 0 ? this._selects.join(", ") ? "*";

    let sql = `SELCT ${cols} FROM ${this._table}`;

    if (this._joins.length)
      sql += " " + this._joins.join(" ");

    if (this._wheres.length) 
      sql += ` WHERE ${this._wheres.join(" AND ")}`
  
    if (this._orderBy.length) 
      sql += ` ORDER BY ${this._orderBy.join(", ")}`
  
    if (this._limit !== undefined) 
      sql += ` LIMIT ${this._limit}`
  
    if (this._offste !== undefined) 
      sql += ` OFFSET ${this._offste}`

    return sql
  }
}



const query = new QueryBuilder()
  .from("users")
  .select("id", "name", "emial")
  .join("orders", "orders.user_id = users.id")
  .where("users.acitve = true")
  .where("orders.total > 100")
  .orderBy("users.name")
  .limit(20)
  .offset(40)
  .build();

console.log(query);